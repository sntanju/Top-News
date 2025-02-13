"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 

const Navbar = () => {
  const pathname = usePathname(); 

  // Function to check if the link is active
  const isActive = (path) => pathname === path ? 'underline' : '';

  return (
    <nav className="bg-orange-600 text-white py-3 px-5 flex justify-between items-center flex-wrap sm:flex-nowrap">
      
      {/* left side */}
      <div className={`text-xl font-bold mx-5 sm:mx-20 ${isActive('/')}`}>
        <Link href="/">HackerNews</Link>
      </div>
      
      {/* right side */}
      <div className="space-x-6 mx-5 sm:mx-20 flex flex-wrap gap-4 sm:gap-6">
        <Link href="/new" className={`hover:font-semibold transition ${isActive('/new')}`}>New</Link>
        <Link href="/best" className={`hover:font-semibold transition ${isActive('/best')}`}>Best</Link>
        <Link href="/show" className={`hover:font-semibold transition ${isActive('/show')}`}>Show</Link>
        <Link href="/ask" className={`hover:font-semibold transition ${isActive('/ask')}`}>Ask</Link>
        <Link href="/jobs" className={`hover:font-semibold transition ${isActive('/jobs')}`}>Jobs</Link>
      </div>
    </nav>
  );
};

export default Navbar;
