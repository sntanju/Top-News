import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-orange-500 p-4">
      <ul className="flex space-x-6 text-white">
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
