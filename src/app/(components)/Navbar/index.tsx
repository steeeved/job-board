"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sun, Moon, Menu } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode } from "@/state";

const NavItems = ({ className }: { className?: string }) => {
  return (
    <ul className={`flex ${className}`}>
      <li>
        <Link href="/">
          <p className="text-black dark:text-gray-1 hover:underline px-3 py-2 rounded-md">
            Home
          </p>
        </Link>
      </li>
      <li>
        <Link href="/newjob">
          <p className="text-black dark:text-gray-1 hover:underline px-3 py-2 rounded-md">
            Create New Job
          </p>
        </Link>
      </li>
      <li>
        <Link href="/settings">
          <p className="text-black dark:text-gray-1 hover:underline px-3 py-2 rounded-md">
            Settings
          </p>
        </Link>
      </li>
    </ul>
  );
};

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className="max-w-screen-xl mx-auto flex justify-between items-center w-full py-[15px] px-[38px] bg-gray-1 dark:bg-black">
      <Link
        href="/"
        className="flex gap-[26px] dark:text-gray-1 text-black justify-center items-center text-xl font-bold"
      >
        <p className="flex items-center p-2 dark:bg-gray-1 bg-black rounded-[9px] font-bold text-gray-1 dark:text-black">
          JO
        </p>
        Jobbers
      </Link>
      <nav className="hidden md:flex">
        <NavItems />
      </nav>
      <div className="flex gap-2">
        <button onClick={() => dispatch(setIsDarkMode(!isDarkMode))}>
          {isDarkMode ? (
            <Sun className="cursor-pointer dark:text-gray-1 text-black w-6 h-6" />
          ) : (
            <Moon className="cursor-pointer dark:text-gray-1 text-black w-6 h-6" />
          )}
        </button>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <button
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              aria-label="Open settings"
              className="focus:outline-none flex md:hidden "
            >
              <span className="sr-only">Open settings</span>
              <Menu className="h-6 w-6 dark:text-gray-1 text-black" />
            </button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="end" className="rounded">
            {/* <div>
              <Link href="/settings">
                <p className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded">
                  Settings
                </p>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded">
                Profile
              </p>
            </div> */}
            <NavItems className="flex md:hidden flex-col" />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
