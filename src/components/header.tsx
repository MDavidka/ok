import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Link
} from '@heroui/react';
import { Cookie, Info, RotateCcw, Github } from 'lucide-react';

export function Header(): JSX.Element {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your progress? This cannot be undone.")) {
      sessionStorage.clear();
      window.location.reload();
    }
  };

  return (
    <>
      <Navbar isBordered className="bg-background/70 backdrop-blur-md border-b border-divider">
        <NavbarBrand>
          <Cookie className="text-primary mr-2" size={28} />
          <p className="font-bold text-xl tracking-tight font-heading text-primary">
            Cookie Clicker
          </p>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex">
            <Button 
              variant="light" 
              color="default" 
              onPress={onOpen} 
              startContent={<Info size={18} />}
              className="font-medium"
            >
              About
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button 
              variant="flat" 
              color="danger" 
              onPress={handleReset} 
              startContent={<RotateCcw size={18} />}
              className="font-medium"
            >
              Reset
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-heading text-2xl text-primary">
                About Cookie Clicker
              </ModalHeader>
              <ModalBody>
                <p className="text-default-600">
                  Welcome to the ultimate Cookie Clicker experience! This is a lightweight, 
                  high-performance incremental game built with modern web technologies.
                </p>
                <div className="flex flex-col gap-2 mt-4">
                  <h3 className="font-bold text-default-800">How to play:</h3>
                  <ul className="list-disc list-inside text-default-600 space-y-1">
                    <li>Click the giant cookie to earn cookies.</li>
                    <li>Spend your cookies in the shop to buy upgrades.</li>
                    <li>Upgrades increase your Cookies Per Second (CPS).</li>
                    <li>Your progress is automatically saved to your browser's session.</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <h3 className="font-bold text-default-800">Tech Stack:</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-default-100 rounded-md text-xs font-medium">React</span>
                    <span className="px-2 py-1 bg-default-100 rounded-md text-xs font-medium">TypeScript</span>
                    <span className="px-2 py-1 bg-default-100 rounded-md text-xs font-medium">Vite</span>
                    <span className="px-2 py-1 bg-default-100 rounded-md text-xs font-medium">Hero UI</span>
                    <span className="px-2 py-1 bg-default-100 rounded-md text-xs font-medium">Tailwind CSS</span>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button 
                  color="primary" 
                  as={Link} 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  startContent={<Github size={18} />}
                >
                  Source Code
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}