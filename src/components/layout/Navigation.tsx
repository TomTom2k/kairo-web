"use client";

import React from "react";

import { usePathname } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/routing";

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { href: ROUTES.DASHBOARD, label: "Dashboard" },
    { href: ROUTES.HABIT_TRACKER, label: "Habit Tracker" },
    { href: ROUTES.STUDY_PATH, label: "Study Path" },
  ];

  return (
    <ul className="w-full flex flex-col items-center justify-center ">
      {navItems.map(item => {
        const isActive = pathname.split("/")[2] === item.href.split("/")[1];
        const navItemClasses = `w-full text-left font-medium transition-all duration-300 ${
          isActive
            ? "border-l-4 border-primary bg-secondary-background text-primary shadow-md"
            : "text-gray-600 hover:text-primary hover:bg-gray-100"
        }`;

        return (
          <li key={item.href} className={navItemClasses}>
            <Link href={item.href} className="w-full h-full p-4 block">
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navigation;
