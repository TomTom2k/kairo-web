"use client";

import React, { useEffect, useState } from "react";

import { isSettingsModalOpen, hideSettingsModal } from "@/helpers/common";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

const SettingModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if URL hash is #showSettingModal
    const checkHash = () => {
      if (isSettingsModalOpen()) {
        setOpen(true);
      }
    };

    // Check on mount
    checkHash();

    // Listen to hash changes
    window.addEventListener("hashchange", checkHash);

    return () => {
      window.removeEventListener("hashchange", checkHash);
    };
  }, []);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    // Remove hash when closing modal
    if (!isOpen) {
      hideSettingsModal();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Cài đặt
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Quản lý cài đặt ứng dụng của bạn
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Chủ đề
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="light">Sáng</option>
              <option value="dark">Tối</option>
              <option value="system">Hệ thống</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Ngôn ngữ
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Thông báo
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Nhận thông báo từ ứng dụng
              </p>
            </div>
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingModal;
