import { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Chip,
  useDisclosure
} from '@heroui/react';
import { Home, Gift, Settings, Puzzle } from 'lucide-react';
import { TabKey } from '../types';

interface HeaderProps {
  currentTab: TabKey;
  setCurrentTab: (tab: TabKey) => void;
  cookies: number;
}

export default function Header({ currentTab, setCurrentTab, cookies }: HeaderProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Navbar isBordered onScroll={false}>
      <NavbarBrand>
        <Gift className="h-6 w-6 text-primary" />
        <p className="font-bold text-lg hidden sm:block">Cookie Clicker</p>
      </NavbarBrand>
      <NavbarContent justify="center" className="hidden sm:flex">
        <NavbarItem>
          <Link
            className={`cursor-pointer ${currentTab === 'home' ? 'text-primary font-semibold' : 'text-default-500'}`}
            onClick={() => setCurrentTab('home')}
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className={`cursor-pointer ${currentTab === 'upgrades' ? 'text-primary font-semibold' : 'text-default-500'}`}
            onClick={() => setCurrentTab('upgrades')}
          >
            Upgrades
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className={`cursor-pointer ${currentTab === 'prestige' ? 'text-primary font-semibold' : 'text-default-500'}`}
            onClick={() => setCurrentTab('prestige')}
          >
            Prestige
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className={`cursor-pointer ${currentTab === 'settings' ? 'text-primary font-semibold' : 'text-default-500'}`}
            onClick={() => setCurrentTab('settings')}
          >
            Settings
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Chip color="primary" variant="flat">
            {Math.floor(cookies).toLocaleString()} Cookies
          </Chip>
        </NavbarItem>
        <NavbarItem>
          <button
            onClick={onOpen}
            className="p-2 hover:bg-default-100 dark:hover:bg-default-600 rounded"
            aria-label="menu"
          >
            <Puzzle className="h-5 w-5" />
          </button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}