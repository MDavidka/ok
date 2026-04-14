import { Footer } from '@heroui/react';

export default function AppFooter() {
  return (
    <Footer className="backdrop-blur supports-[backdrop-filter]:bg-white/10 supports-[backdrop-filter]:dark:bg-black/10">
      <p className="text-xs text-default-400">
        Cookie Clicker — No database, session-only storage. Built with Vite, React, TypeScript & Hero UI.
      </p>
    </Footer>
  );
}