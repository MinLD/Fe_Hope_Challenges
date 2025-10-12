"use client";

import { usePathname } from "next/navigation";
import { createContext, useState, useEffect, ReactNode } from "react";

interface NavState {
  isOpenMenuHamsburg: boolean;
  setIsOpenMenuHamsburg: (isOpen: boolean) => void;
  openHamsburg: () => void;
  closeHamsburg: () => void;
}

export const NavContext = createContext<NavState | undefined>(undefined);

export function NavProvider({ children }: { children: ReactNode }) {
  const [isOpenMenuHamsburg, setIsOpenMenuHamsburg] = useState(false);
  const openHamsburg = () => setIsOpenMenuHamsburg(true);
  const closeHamsburg = () => setIsOpenMenuHamsburg(false);

  return (
    <NavContext.Provider
      value={{
        isOpenMenuHamsburg,
        setIsOpenMenuHamsburg,
        openHamsburg,
        closeHamsburg,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}
