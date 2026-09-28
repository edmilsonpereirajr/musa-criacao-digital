"use client";

import Link from "next/link";
import { useState } from "react";

const COOKIE_CONSENT_KEY = "musa-cookie-consent";

type Consent = "all" | "necessary";

export function CookieBanner() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return !window.localStorage.getItem(COOKIE_CONSENT_KEY);
  });

  function saveConsent(consent: Consent) {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, consent);
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-5">
      <div className="mx-auto max-w-5xl rounded-3xl border border-[#d8d0c4] bg-[#fffdf9] p-5 shadow-[0_20px_60px_rgba(21,21,21,0.16)] sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-lg font-bold tracking-[-0.02em] text-[#151515]">
              Sua privacidade importa
            </p>

            <p className="mt-2 text-sm leading-6 text-[#6f6a63]">
              Usamos cookies necessários para manter o site funcionando,
              proteger sua conta e manter sua sessão. Cookies opcionais podem
              ser usados para melhorar sua experiência.
            </p>

            <Link
              href="/politica-de-cookies"
              className="mt-2 inline-block text-sm font-semibold text-[#d42367] transition-colors hover:text-[#b91d58]"
            >
              Saiba mais sobre cookies
            </Link>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row lg:shrink-0">
            <button
              type="button"
              onClick={() => saveConsent("necessary")}
              className="rounded-full border border-[#d8d0c4] px-5 py-2.5 text-sm font-semibold text-[#151515] transition-colors hover:bg-[#f0ebe1]"
            >
              Recusar opcionais
            </button>

            <button
              type="button"
              onClick={() => saveConsent("all")}
              className="rounded-full bg-[#d42367] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#b91d58]"
            >
              Aceitar todos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}