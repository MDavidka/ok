import React, { useState } from 'react';
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Link, 
  Chip, 
  Tooltip,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from '@heroui/react';
import { Cookie, CloudOff, Cloud } from 'lucide-react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { IS_DB_CONNECTED } from '../db';
import { NavItem } from '../types';

const NAV_ITEMS: NavItem[] = [
  { label: 'Bakery', href: '/' },
  { label: 'Upgrades', href: '/shop' },
  { label: 'Stats', href: '/stats' },
];

export function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <Navbar 
      isBordered 
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-background/80 backdrop-blur-md border-b border-divider"
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand as={RouterLink} to="/" className="gap-2 transition-transform hover:scale-105 active:scale-95">
          <Cookie className="w-8 h-8 text-primary" />
          <p className="font-heading font-bold text-inherit text-xl tracking-tight hidden sm:block">
            Cookie<span className="text-primary">Clicker</span>
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavbarItem key={item.href} isActive={isActive}>
              <Link 
                as={RouterLink} 
                to={item.href} 
                color={isActive ? "primary" : "foreground"}
                className={`font-medium transition-colors ${isActive ? 'text-primary' : 'hover:text-primary/80'}`}
              >
                {item.label}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Tooltip 
            content={
              IS_DB_CONNECTED 
                ? "Your progress is being saved to the cloud." 
                : "Connect a database in the Integrations tab to enable cloud saving."
            }
            placement="bottom-end"
            color={IS_DB_CONNECTED ? "success" : "warning"}
          >
            <Chip
              startContent={IS_DB_CONNECTED ? <Cloud className="w-4 h-4" /> : <CloudOff className="w-4 h-4" />}
              color={IS_DB_CONNECTED ? "success" : "warning"}
              variant="flat"
              size="sm"
              className="cursor-help font-medium"
            >
              {IS_DB_CONNECTED ? "Cloud Sync On" : "Local Save Only"}
            </Chip>
          </Tooltip>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-background/90 backdrop-blur-lg pt-6">
        {NAV_ITEMS.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link
                as={RouterLink}
                className="w-full font-heading font-semibold"
                color={isActive ? "primary" : "foreground"}
                to={item.href}
                size="lg"
                onPress={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
}