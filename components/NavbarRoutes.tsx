"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import SearchInput from "./SearchInput";
import isTeacher from "@/lib/teachers";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const {userId} = useAuth()


  const teacher = pathname?.startsWith("/teacher");
  const isPlayer = pathname?.includes("/chapter");
  const isSearchPage = pathname === "/search";

  return (
    <>
      <div className="flex items-center justify-between gap-x-8 ml-auto">
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
        {teacher || isPlayer ? (
          <Link href="/">
            <Button
              className=" border-[1px] border-slate-700/10"
              variant="ghost"
              size="sm"
            >
              <LogOutIcon className="w-4 h-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button
              className=" border-[1px] border-slate-700/10"
              variant="ghost"
              size="sm"
            >
              Teacher Mode
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;
