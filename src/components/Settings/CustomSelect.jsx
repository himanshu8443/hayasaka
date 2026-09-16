"use client";
import React, { useState, useRef, useEffect } from "react";
import { HiChevronDown, HiCheck } from "react-icons/hi2";

const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption =
    options.find((opt) => String(opt.value) === String(value)) || options[0];

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left w-full sm:w-auto" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between gap-3 w-full sm:min-w-[170px] px-4 py-2.5 bg-[#061221] hover:bg-[#091a2e] border border-white/20 hover:border-[#00e6e6]/60 rounded-xl text-sm font-medium text-white shadow-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00e6e6]/30"
      >
        <span>{selectedOption?.label}</span>
        <HiChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#00e6e6]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 sm:right-0 mt-2 w-full sm:w-52 bg-[#0a1829]/95 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          {options.map((option) => {
            const isSelected = String(option.value) === String(value);
            return (
              <button
                key={String(option.value)}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors text-left cursor-pointer ${
                  isSelected
                    ? "text-[#00e6e6] bg-[#00e6e6]/10 font-semibold"
                    : "text-gray-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <HiCheck size={16} className="text-[#00e6e6] flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
