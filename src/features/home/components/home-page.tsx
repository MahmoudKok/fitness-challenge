"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useSyncExternalStore } from "react";
import {
  clearLocalRegisteredUser,
  parseLocalRegisteredUserSnapshot,
  readLocalRegisteredUserSnapshot,
} from "@/features/auth/lib/local-registration";

function subscribeToLocalRegistration(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
  };
}

export function HomePage() {
  const router = useRouter();
  const registeredUserSnapshot = useSyncExternalStore(
    subscribeToLocalRegistration,
    readLocalRegisteredUserSnapshot,
    () => null,
  );
  const registeredUser = useMemo(
    () => parseLocalRegisteredUserSnapshot(registeredUserSnapshot),
    [registeredUserSnapshot],
  );

  useEffect(() => {
    if (!registeredUser) {
      router.replace("/");
    }
  }, [registeredUser, router]);

  const initials = useMemo(() => {
    const name = registeredUser?.displayName ?? "FitBuddies";
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }, [registeredUser]);

  if (!registeredUser) {
    return null;
  }

  return (
    <main className="home-screen">
      <section className="home-shell" aria-labelledby="home-title">
        <Image
          alt="FitBuddies"
          className="home-logo"
          height={170}
          priority
          src="/images/full-logo-dark.png"
          width={620}
        />

        <div className="home-profile">
          <div className="home-avatar" aria-hidden="true">
            {initials || "FB"}
          </div>
          <p>Welcome back</p>
          <h1 id="home-title">{registeredUser.displayName}</h1>
          {registeredUser.email && <span>{registeredUser.email}</span>}
        </div>

        <div className="home-panel">
          <p>Your FitBuddies account is ready.</p>
          <span>Registered locally so you return here after loading.</span>
        </div>

        <button
          className="home-secondary-action"
          onClick={() => {
            clearLocalRegisteredUser();
            router.replace("/");
          }}
          type="button"
        >
          Back to signup
        </button>
      </section>
    </main>
  );
}
