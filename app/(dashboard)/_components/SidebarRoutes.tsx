"use client";

import { BarChart3Icon, Compass, Layout, ListIcon } from "lucide-react";
import React from "react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: ListIcon,
    label: "Courses",
    href: "/teacher/courses"
  },
  {
    icon: BarChart3Icon,
    label: "Analytics",
    href: "/teacher/analytics"
  }
]

const SidebarRoutes = () => {
  const pathname = usePathname()

  const teacher = pathname?.includes("/teacher")
  const routes = teacher ? teacherRoutes : guestRoutes

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
