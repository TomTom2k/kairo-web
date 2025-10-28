"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please login to view profile</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Phone:</strong> {user?.phone || "Not provided"}
        </p>
        <p>
          <strong>User ID:</strong> {user?._id}
        </p>
        <p>
          <strong>Created:</strong>{" "}
          {user?.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
