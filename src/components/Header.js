import React from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <i className="fas fa-file-pdf text-red-500 text-2xl"></i>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white ml-3">
              PDF Q&A Assistant
            </h1>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

export default Header;
