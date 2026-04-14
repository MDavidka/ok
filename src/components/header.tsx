import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Navbar isBordered className="backdrop-blur supports-[backdrop-filter]:bg-white/10 supports-[backdrop-filter]:dark:bg-black/10">
      <NavbarContent>
        <NavbarBrand as={Link} to="/" className="text-lg font-semibold">
          🍪 Cookie Clicker
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent position="end">
        <NavbarItem>
          <Link to="/about" className="hover:underline text-default-500 dark:text-default-300">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}