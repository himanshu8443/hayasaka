"use client";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguages } from "@/redux/features/languagesSlice";

const Languages = () => {
  const dispatch = useDispatch();
  const { languages } = useSelector((state) => state.languages);
  const [selectedLanguages, setSelectedLanguages] = useState([...languages]);

  const languageList = [
    { id: "english", label: "English" },
    { id: "haryanvi", label: "Haryanvi" },
    { id: "punjabi", label: "Punjabi" },
    { id: "hindi", label: "Hindi" },
    { id: "rajasthani", label: "Rajasthani" },
    { id: "tamil", label: "Tamil" },
    { id: "telugu", label: "Telugu" },
    { id: "odia", label: "Odia" },
    // Add more languages as needed
  ];

  const handleLanguageChange = (event) => {
    const { value, checked } = event.target;
    let updatedLanguages;

    if (checked) {
      updatedLanguages = [...selectedLanguages, value];
    } else {
      updatedLanguages = selectedLanguages.filter((lang) => lang !== value);
    }

    setSelectedLanguages(updatedLanguages);
    dispatch(setLanguages(updatedLanguages));
  };

  return (
    <div className=" text-white pt-5 m-2 rounded-md w-[95%] hover:bg-white/5">
      <details className="text-white detailanimatation">
        <summary className=" flex cursor-pointer gap-3 items-baseline mx-2">
          <FaChevronDown className="arrow " />
          <div>
            <p className=" font-semibold text-lg">Languages</p>
            <p className=" text-[9px] mb-7">Pick which you like to listen</p>
          </div>
        </summary>
        <form className=" grid grid-cols-2 mb-1 h-28 overflow-y-scroll overflow-x-hidden hideScrollBar">
          {languageList.map((language) => (
            <div key={language.id} className="flex items-center mb-3 mx-2 ml-5">
              <input
                type="checkbox"
                id={language.id}
                name="language"
                value={language.id}
                checked={selectedLanguages.includes(language.id)}
                onChange={handleLanguageChange}
                className="hidden"
              />
              <label
                htmlFor={language.id}
                className={`${
                  selectedLanguages.includes(language.id)
                    ? "border-[#00e6e6] text-[#00e6e6]"
                    : "border-white text-white"
                } cursor-pointer transition-colors text-sm min-w-[86px] text-center  border rounded-md p-2 font-semibold`}
              >
                {language.label}
              </label>
            </div>
          ))}
        </form>
      </details>
    </div>
  );
};

export default Languages;
