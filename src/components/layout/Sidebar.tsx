"use client";

import React from "react";

import Image from "next/image";
import { SettingsIcon } from "lucide-react";

import logoKairo from "@/assets/images/logo-no-bg.png";
import { showSettingsModal } from "@/helpers/common";

import SettingModal from "../SettingModal";

import Navigation from "./Navigation";

const Sidebar = () => {
  const handleSettingClick = () => {
    showSettingsModal();
  };

  return (
    <div className="w-[250px] shadow flex flex-col align-center justify-between h-screen sticky top-0 left-0">
      <div className="flex flex-col items-center justify-center">
        <Image src={logoKairo} alt="logo" width={150} height={150} />
        <Navigation />
      </div>

      <div
        className="w-full h-10 bg-primary text-white flex items-center justify-center"
        onClick={handleSettingClick}
      >
        <SettingsIcon className="w-4 h-4" />
      </div>
      <SettingModal />
    </div>
  );
};

export default Sidebar;
