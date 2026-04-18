import React from 'react';
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Button
} from "@heroui/react";
import { Cookie, Save, Trophy, Store } from "lucide-react";

export interface HeaderProps {
  /** Callback fired when the save button is clicked */
  onSave?: () => void;
  /** Indicates if a save operation is currently in progress */
  isSaving?: boolean;
  /** The currently active navigation tab */
  activeTab?: 'play' | 'shop' | 'leaderboard';
  /** Callback fired when a navigation tab is clicked */
  onTabChange?: (tab: 'play' | 'shop' | 'leaderboard') => void;
}

export function Header({ 
  onSave, 
  isSaving = false, 
  activeTab = 'play',
  onTabChange 
}: HeaderProps): JSX.Element {
  return (
    <Navbar 
      maxWidth="xl" 
      isBordered 
      className="border-b border-white/10" 
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <NavbarBrand className="gap-2">
        <Cookie style={{ color: 'var(--color-accent)' }} className="w-8 h-8" />
        <p className="font-heading font-bold text-inherit text-xl tracking-tight">
          Cookie<span style={{ color: 'var(--color-accent)' }}>Clicker</span>
        </p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-2" justify="center">
        <NavbarItem isActive={activeTab === 'play'}>
          <Button 
            variant={activeTab === 'play' ? "flat" : "light"} 
            color={activeTab === 'play' ? "primary" : "default"}
            onPress={() => onTabChange?.('play')}
            startContent={<Cookie size={18} />}
            className="font-medium"
          >
            Play
          </Button>
        </NavbarItem>
        <NavbarItem isActive={activeTab === 'shop'}>
          <Button 
            variant={activeTab === 'shop' ? "flat" : "light"} 
            color={activeTab === 'shop' ? "secondary" : "default"}
            onPress={() => onTabChange?.('shop')}
            startContent={<Store size={18} />}
            className="font-medium"
          >
            Shop
          </Button>
        </NavbarItem>
        <NavbarItem isActive={activeTab === 'leaderboard'}>
          <Button 
            variant={activeTab === 'leaderboard' ? "flat" : "light"} 
            color={activeTab === 'leaderboard' ? "warning" : "default"}
            onPress={() => onTabChange?.('leaderboard')}
            startContent={<Trophy size={18} />}
            className="font-medium"
          >
            Leaderboard
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button 
            color="primary" 
            variant="shadow" 
            onPress={onSave} 
            isLoading={isSaving}
            startContent={!isSaving && <Save size={18} />}
            className="font-bold"
          >
            {isSaving ? "Saving..." : "Save Game"}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}