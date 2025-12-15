"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import type { InitialLoginProps } from "@/app/lib/states/context/AuthContext";

export default function AuthClientInitializer({
  initialLogin,
}: {
  initialLogin: InitialLoginProps;
}) {
  const { updateAuth } = useAuth();
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current && updateAuth) {
      console.log("[AuthClientInitializer] applying initial login");
      updateAuth(initialLogin);
      initialized.current = true;
    }
  }, [updateAuth, initialLogin]);

  return null;
}
