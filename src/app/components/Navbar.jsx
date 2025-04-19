
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { FaCartArrowDown } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { GoSun } from "react-icons/go";
export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null; 
  }

  return (
    <nav className="p-4 flex justify-between items-center text-black  bg-white shadow dark:bg-gray-900 dark:text-white transition-colors duration-200">
      <Link href="/"><span className='text-2xl font-bold  text-black bg-white dark:bg-gray-900 dark:text-white'>Shopy's</span></Link>
      <div className="flex items-center gap-4">
        <Link href="/cart"><FaCartArrowDown className="icon-animation hover:scale-110 transition-transform duration-200" />

</Link>
        <Link href="/order"><FaHistory className="icon-animation hover:scale-110 transition-transform duration-200" /></Link>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded"
        >
          {theme === 'dark' ? <GoSun /> : <IoMoon />}
        </button>
      </div>
    </nav>
  );
}