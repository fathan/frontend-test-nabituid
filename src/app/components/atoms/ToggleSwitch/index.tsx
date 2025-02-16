"use client";

import { useState, useEffect } from "react";
import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import { setTheme, isDarkModeEnabled } from "@/app/utils/themeStorage";

export default function ToggleSwitch() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(isDarkModeEnabled());

  useEffect(() => {
    setTheme(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={() => setIsDarkMode(!isDarkMode)}
        className="sr-only peer"
      />
      <div
        className="w-16 h-8 flex items-center bg-gray-200 dark:bg-gray-700 rounded-full 
                   peer-focus:outline-none peer-checked:bg-blue-500"
      />
      <div
        className="absolute w-7 h-7 bg-white dark:bg-gray-900 rounded-full border border-gray-300 
                   left-[4px] top-0.5 transition-transform duration-300 
                   peer-checked:translate-x-7 flex justify-center items-center"
      >
        {isDarkMode ? (
          <IoMdMoon className="text-gray-400 text-lg transition-transform duration-300" />
        ) : (
          <MdSunny className="text-yellow-500 text-lg transition-transform duration-300" />
        )}
      </div>
    </label>
  );
}
