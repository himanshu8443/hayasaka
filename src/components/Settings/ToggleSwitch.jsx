"use client";
import React from "react";

const ToggleSwitch = ({ checked, onChange, id, label }) => {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e6e6] ${
        checked
          ? "bg-[#00e6e6] shadow-[0_0_14px_rgba(0,230,230,0.5)]"
          : "bg-white/20 hover:bg-white/30"
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
          checked ? "translate-x-5 bg-slate-950" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
