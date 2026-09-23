// Next 16.3.4 replaces CONNECTING sockets on tab activation, causing a
// reconnect loop that can lose React's development stream and stall navigation.
// Remove this patch once upgrading to a release containing the upstream fix:
// https://github.com/vercel/next.js/pull/98229
const fs = require('node:fs');
const path = require('node:path');
const root = path.dirname(require.resolve('next/package.json'));
const { version } = require('next/package.json');
if (version !== '16.3.4') {
  throw new Error(`Review/remove the Next HMR patch before using Next ${version}.`);
}
const before = 'webSocket.readyState !== WebSocket.OPEN';
const after = 'webSocket.readyState === WebSocket.CLOSED';
const files = ['dist/client', 'dist/esm/client'].map(prefix =>
  path.join(root, prefix, 'dev/hot-reloader/app/web-socket.js')
);
// Validate both distributions before writing either one. Re-running is safe.
const changes = files.map(file => {
  const source = fs.readFileSync(file, 'utf8');
  if (source.split(after).length - 1 === 2 && !source.includes(before)) return null;
  if (source.split(before).length - 1 !== 2) {
    throw new Error(`Unexpected Next HMR source: ${file}`);
  }
  return { file, source: source.replaceAll(before, after) };
});
for (const change of changes) {
  if (change) fs.writeFileSync(change.file, change.source);
}
console.log('Next 16.3.4 HMR reconnect correction applied.');
