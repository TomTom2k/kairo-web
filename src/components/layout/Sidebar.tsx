"use client";

import React from "react";

import Image from "next/image";

import logoKairo from "@/assets/images/logo-no-bg.png";
import { Button } from "@/components/ui";
import { showSettingsModal } from "@/helpers/common";

import SettingModal from "../SettingModal";

import Navigation from "./Navigation";

const Sidebar = () => {
  const handleSettingClick = () => {
    showSettingsModal();
  };

  return (
    <div className="w-[250px] shadow flex flex-col align-center">
      <div className="flex flex-col items-center justify-center">
        <Image src={logoKairo} alt="logo" width={150} height={150} />
        <Navigation />
      </div>

      <Button variant="outline" size="icon" onClick={handleSettingClick}>
        setting
      </Button>
      <SettingModal />
    </div>
  );
};

export default Sidebar;
