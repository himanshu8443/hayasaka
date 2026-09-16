"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguages } from "@/redux/features/languagesSlice";
import { HiChevronDown } from "react-icons/hi2";

const Languages = () => {
  const dispatch = useDispatch();
  const { languages } = useSelector((state) => state.languages);
  const [selectedLanguages, setSelectedLanguages] = useState([...languages]);
  const [isOpen, setIsOpen] = useState(false);

  const languageList = [
    { id: "english", label: "English" },
    { id: "hindi", label: "Hindi" },
    { id: "punjabi", label: "Punjabi" },
    { id: "haryanvi", label: "Haryanvi" },
    { id: "rajasthani", label: "Rajasthani" },
    { id: "tamil", label: "Tamil" },
    { id: "telugu", label: "Telugu" },
    { id: "odia", label: "Odia" },
  ];

  const handleLanguageToggle = (id) => {
    let updatedLanguages;
    if (selectedLanguages.includes(id)) {
      updatedLanguages = selectedLanguages.filter((lang) => lang !== id);
    } else {
      updatedLanguages = [...selectedLanguages, id];
    }
    setSelectedLanguages(updatedLanguages);
    dispatch(setLanguages(updatedLanguages));
  };

  return (
    <div className="py-3 border-t border-white/10">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between px-5 py-2 cursor-pointer text-gray-300 hover:text-white transition-colors select-none"
      >
        <span className="text-xs font-bold uppercase tracking-wider">
          Languages ({selectedLanguages.length})
        </span>
        <HiChevronDown
          className={`text-sm transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="px-5 py-2 flex flex-wrap gap-2 animate-in fade-in duration-150">
          {languageList.map((lang) => {
            const isSelected = selectedLanguages.includes(lang.id);
            return (
              <button
                type="button"
                key={lang.id}
                onClick={() => handleLanguageToggle(lang.id)}
                className={`text-sm px-3.5 py-1.5 rounded-full border transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#00e6e6]/15 border-[#00e6e6] text-[#00e6e6] font-semibold"
                    : "border-white/10 text-gray-300 hover:text-white hover:border-white/25 hover:bg-white/5"
                }`}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Languages;
