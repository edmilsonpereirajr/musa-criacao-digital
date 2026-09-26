"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full bg-[#151515] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2a2a2a]"
    >
      Sair
    </button>
  );
}