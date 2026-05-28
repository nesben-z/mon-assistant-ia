"use client";

import type { ReactNode } from "react";

type ErrorOverlayProps = {
  error: string | null;
  fallbackMessage?: ReactNode;
  onRetry?: (() => void) | null;
  retryLabel?: string;
};

export function ErrorOverlay({
  error,
  fallbackMessage,
  onRetry,
  retryLabel,
}: ErrorOverlayProps) {
  if (!error && !fallbackMessage) {
    return null;
  }

  const content = error ?? fallbackMessage;

  if (!content) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex h-full w-full flex-col justify-center rounded-[inherit] bg-[#fbfcfa]/88 p-6 text-center backdrop-blur-xl">
      <div className="pointer-events-auto mx-auto w-full max-w-md rounded-lg border border-[#dfe7e2] bg-white px-6 py-5 text-base font-medium text-[#263c37] shadow-[0_18px_44px_rgba(21,35,33,0.10)]">
        <div className="mb-2">{content}</div>
        {error && (
          <p className="mt-2 text-sm leading-6 text-[#6a7973]">
            Vérifiez la console du navigateur (F12) pour plus de détails.
          </p>
        )}
        {error && onRetry ? (
          <button
            type="button"
            className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-[#123d37] px-4 text-sm font-semibold text-white shadow-none transition hover:bg-[#0f302c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7669] focus-visible:ring-offset-2"
            onClick={onRetry}
          >
            {retryLabel ?? "Réessayer"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
