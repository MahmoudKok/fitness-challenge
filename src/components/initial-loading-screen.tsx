"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";

const DISPLAY_MS = 1700;
const EXIT_MS = 460;

export function InitialLoadingScreen() {
  const [phase, setPhase] = useState<"active" | "leaving" | "done">("active");

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => {
      setPhase("leaving");
    }, DISPLAY_MS);

    const doneTimer = window.setTimeout(() => {
      setPhase("done");
    }, DISPLAY_MS + EXIT_MS);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") {
    return null;
  }

  return <LoadingScreen isLeaving={phase === "leaving"} />;
}
