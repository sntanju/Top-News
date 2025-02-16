"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Function to check if the link is active
 // const isActive = (path) => (pathname === path ? "underline" : "");
  const isActive = (path) => pathname === path ? 'underline' : '';

  return (
    <nav className="bg-orange-600 text-white py-3 px-5 flex justify-between items-center">
      {/* Logo / Title */}
      <div className={`text-xl font-bold ${isActive("/")}`}>
        <Link href="/">HackerNews</Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="sm:hidden block text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          // Close (X) Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>

      {/* Desktop Menu */}
      <div className="hidden sm:flex space-x-6">
        <Link href="/new" className={`hover:font-semibold transition ${isActive("/new")}`}>
          New
        </Link>
        <Link href="/best" className={`hover:font-semibold transition ${isActive("/best")}`}>
          Best
        </Link>
        <Link href="/show" className={`hover:font-semibold transition ${isActive("/show")}`}>
          Show
        </Link>
        <Link href="/ask" className={`hover:font-semibold transition ${isActive("/ask")}`}>
          Ask
        </Link>
        <Link href="/jobs" className={`hover:font-semibold transition ${isActive("/jobs")}`}>
          Jobs
        </Link>
      </div>

      {/* Mobile Menu (Shows when isOpen is true) */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-orange-600 flex flex-col space-y-4 py-4 items-center sm:hidden">
          <Link href="/new" className={`hover:font-semibold transition ${isActive("/new")}`}>
            New
          </Link>
          <Link href="/best" className={`hover:font-semibold transition ${isActive("/best")}`}>
            Best
          </Link>
          <Link href="/show" className={`hover:font-semibold transition ${isActive("/show")}`}>
            Show
          </Link>
          <Link href="/ask" className={`hover:font-semibold transition ${isActive("/ask")}`}>
            Ask
          </Link>
          <Link href="/jobs" className={`hover:font-semibold transition ${isActive("/jobs")}`}>
            Jobs
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
