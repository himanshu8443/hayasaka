"use client";
import React, { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/services/dataAPI";
import { MdLogout } from "react-icons/md";

const Profile = ({ setShowNav }) => {
  const router = useRouter();
  const { status, data } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserInfo();
        setUser(res);
      } catch (err) {
        setUser(null);
      }
    };
    if (status === "authenticated") {
      fetchUser();
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3 animate-pulse">
        <div className="w-8 h-8 rounded-full bg-white/10" />
        <div className="h-3 bg-white/10 rounded w-24" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setShowNav(false);
            router.push("/login");
          }}
          className="flex-1 py-2 px-4 text-sm font-semibold rounded-xl bg-[#00e6e6] text-black hover:bg-[#00cccc] transition-colors text-center cursor-pointer shadow-sm"
        >
          Log In
        </button>
        <button
          type="button"
          onClick={() => {
            setShowNav(false);
            router.push("/signup");
          }}
          className="flex-1 py-2 px-4 text-sm font-medium rounded-xl border border-white/20 hover:border-white/40 text-white hover:bg-white/5 transition-colors text-center cursor-pointer"
        >
          Sign Up
        </button>
      </div>
    );
  }

  const avatarUrl = data?.imageUrl || user?.imageUrl;
  const displayName = data?.userName || user?.userName || data?.user?.name || "User";
  const displayEmail = data?.user?.email || user?.email || "";

  return (
    <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-1 ring-[#00e6e6]/40"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-cyan-700 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold text-white truncate">{displayName}</p>
          {displayEmail && (
            <p className="text-xs text-gray-400 truncate mt-0.5">{displayEmail}</p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setShowNav(false);
          signOut();
        }}
        title="Log Out"
        className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer flex-shrink-0"
      >
        <MdLogout size={20} />
      </button>
    </div>
  );
};

export default Profile;