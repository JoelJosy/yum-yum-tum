"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") router.back();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [router]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) router.back();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-[#ff6f18]/80 bg-[#1b1b1b] shadow-[6px_6px_0_#ff6f18] outline-none sm:max-h-[85vh]"
      >
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Close restaurant details"
          className="sticky top-3 right-3 z-10 float-right mr-3 flex size-8 items-center justify-center border border-[#ff6f18] bg-[#1b1b1b] text-[#ff6f18] hover:bg-[#ff6f18] hover:text-[#1b1b1b]"
        >
          <X className="size-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
