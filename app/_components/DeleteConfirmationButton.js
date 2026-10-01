"use client";

import { useRef, useTransition } from "react";

export default function DeleteConfirmationButton({
  action,
  actionArgs,
  title,
  description,
  confirmText,
  dialogId,
}) {
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const [isPending, startTransition] = useTransition();

  const closeDialog = () => dialogRef.current?.close();

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="cursor-pointer rounded-lg bg-[#eb4d4b] px-5 py-3 font-semibold text-white hover:bg-[#d63e3c]"
      >
        Delete
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={`${dialogId}-title`}
        aria-describedby={`${dialogId}-description`}
        onCancel={(event) => {
          if (isPending) event.preventDefault();
        }}
        onClose={() => triggerRef.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget && !isPending) closeDialog();
        }}
        className="m-auto w-[min(92vw,48rem)] rounded-2xl border-0 bg-white p-0 text-left shadow-2xl backdrop:bg-black/50"
      >
        <div className="p-8 sm:p-10">
          <h2 id={`${dialogId}-title`} className="text-[2rem] font-bold text-gray-900">
            {title}
          </h2>
          <p id={`${dialogId}-description`} className="mt-4 text-[1.5rem] leading-relaxed text-gray-600">
            {description}
          </p>
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              autoFocus
              disabled={isPending}
              onClick={closeDialog}
              className="cursor-pointer rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={() => startTransition(() => action(actionArgs))}
              className="cursor-pointer rounded-lg bg-[#eb4d4b] px-6 py-3 font-semibold text-white hover:bg-[#d63e3c] disabled:cursor-wait disabled:opacity-60"
            >
              {isPending ? "Deleting..." : confirmText}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
