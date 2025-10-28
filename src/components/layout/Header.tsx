"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-4 bg-white shadow flex justify-between items-center">
      <div>
        <h1 className="text-xl font-semibold">Kairo Dashboard</h1>
      </div>

      {user && (
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <button
            onClick={logout}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
