import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarITemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem: React.FC<SidebarITemProps> = ({
  icon: Icon,
  label,
  href,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname.startsWith(`${href}/`);
  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex my-1 items-center gap-x-3 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-sky-700 bg-sky-400/20 hover:bg-sky-600/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-3 py-4">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-sky-700")}
        />
        {label}
      </div>
      <div className={cn("absolute w-[0.18rem] h-[3.4rem] right-0 rounded-xs", isActive && "bg-sky-700")} />
    </button>
  );
};

export default SidebarItem;
