import React from 'react';
import { Link } from 'react-router-dom';
import { SunMoon } from 'lucide-react';
const Header = () => {

    const handleDarkLightMode = () => {
        document.body.classList.toggle('dark');
    }

  return (
    <header className="w-full py-4 px-4 md:px-8 border-b border-journal-100 dark:border-journal-900 bg-white dark:bg-black flex items-center justify-between">
      <Link to="/home" className="flex items-center space-x-2">
        <h1 className="text-xl md:text-2xl font-serif font-medium text-journal-800 dark:text-white">AI-OOTD</h1>
      </Link>
        <div className={"flex"}>
            <SunMoon size={24} className="text-journal-800 dark:text-white" onClick={handleDarkLightMode} />
        </div>
    </header>
  );
};

export default Header;
