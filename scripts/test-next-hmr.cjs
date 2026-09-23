const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const file = require.resolve('next/dist/client/dev/hot-reloader/app/web-socket.js', { paths: [process.cwd()] });
const source = fs.readFileSync(file, 'utf8');
const fn = source.slice(source.indexOf('function createWebSocket('), source.indexOf('function createProcessTurbopackMessage('));
for (const event of ['visibilitychange', 'online']) {
  const sockets = [], events = {}, timers = new Map(), tasks = [];
  let timerId = 0;
  class Socket {
    static OPEN = 1; static CLOSED = 3;
    readyState = 0;
    constructor() { sockets.push(this); }
    close() { this.readyState = 3; tasks.push(() => this.onclose?.()); }
    open() { this.readyState = 1; this.onopen?.(); }
  }
  const context = {
    self: { __next_r: 'test' }, WebSocket: Socket,
    document: { visibilityState: 'visible', addEventListener: (name, cb) => events[name] = cb },
    window: { WebSocket: Socket, console: { log() {} }, addEventListener: (name, cb) => events[name] = cb },
    createProcessTurbopackMessage() {},
    _getsocketurl: { getSocketUrl: () => 'ws://localhost' },
    _forwardlogs: { logQueue: { onSocketReady() {} } },
    _constants: { WEB_SOCKET_MAX_RECONNECTIONS: 25 },
    setTimeout: cb => { timers.set(++timerId, cb); return timerId; },
    clearTimeout: id => timers.delete(id),
    reconnections: 0,
  };
  vm.runInNewContext(fn + ';createWebSocket("", {});', context);
  events[event]();
  while (tasks.length) tasks.shift()();
  sockets.at(-1).open();
  for (let i = 0; i < 5 && timers.size; i++) {
    const [id, cb] = timers.entries().next().value;
    timers.delete(id); cb();
    while (tasks.length) tasks.shift()();
    sockets.at(-1).open();
  }
  console.log(event, { sockets: sockets.length, pendingRetries: timers.size });
  assert.equal(sockets.length, 1, 'Activation must preserve the connecting socket');
  assert.equal(timers.size, 0);
  // A genuine disconnect must still reconnect immediately on wake/online.
  sockets.at(-1).close();
  while (tasks.length) tasks.shift()();
  assert.equal(timers.size, 1);
  events[event]();
  while (tasks.length) tasks.shift()();
  sockets.at(-1).open();
  assert.equal(sockets.length, 2);
  assert.equal(timers.size, 0);
}
