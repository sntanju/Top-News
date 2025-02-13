import Link from 'next/link';

const Navbar = () => {
  return (

    <nav className="bg-orange-600 text-white py-3 px-5 flex justify-between items-center">

      {/* left side */}

      <div className="text-xl font-bold mx-40">
        <Link href="/">HackerNews</Link>
      </div>

      {/* right side */}
      
      <div className="space-x-6 mx-40">
        <Link href="/new" className="hover:font-semibold transition"> New </Link>
        <Link href="/best" className="hover:font-semibold transition"> Best </Link>
        <Link href="/show" className="hover:font-semibold transition"> Show </Link>
        <Link href="/ask" className="hover:font-semibold transition"> Ask </Link>
        <Link href="/jobs" className="hover:font-semibold transition"> Jobs </Link>
      </div>
    </nav>
    
  );
};

export default Navbar;
