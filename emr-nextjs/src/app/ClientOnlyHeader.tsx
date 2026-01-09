"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HeaderClient from "./HeaderClient";

export default function ClientOnlyHeader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ẩn header trên các trang login, signup, register
  const hideHeader = ["/login", "/signup", "/register"].some((p) => pathname.startsWith(p) || pathname === p || pathname === `/auth${p}`);
  
  return (
    <>
      {mounted && !hideHeader && <HeaderClient />}
      <div>{children}</div>
    </>
  );
}