"use client";
import { usePathname } from "next/navigation";
import HeaderClient from "./HeaderClient";

export default function ClientOnlyHeader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Ẩn header trên các trang login, signup, register
  const hideHeader = ["/login", "/signup", "/register"].some((p) => pathname.startsWith(p) || pathname === p || pathname === `/auth${p}`);
  return (
    <>
      {!hideHeader && <HeaderClient />}
      <main className="flex-1">{children}</main>
    </>
  );
}