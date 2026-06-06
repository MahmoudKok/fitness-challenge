"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import type { FirebaseConnectionResult } from "../services/firebaseConnectionService";

type ConnectionStatus =
  | { type: "idle" }
  | { type: "checking" }
  | { type: "success"; result: FirebaseConnectionResult }
  | { type: "error"; message: string };

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Firebase connection failed.";
}

export function FirebaseConnectionButton() {
  const [status, setStatus] = useState<ConnectionStatus>({ type: "idle" });

  const handleConnectionTest = async () => {
    setStatus({ type: "checking" });

    try {
      const { testFirebaseConnection } = await import(
        "../services/firebaseConnectionService"
      );
      const result = await testFirebaseConnection();
      setStatus({ type: "success", result });
    } catch (error) {
      setStatus({ type: "error", message: getErrorMessage(error) });
    }
  };

  return (
    <div className="grid gap-3">
      <Button
        data-testid="firebase-connection-button"
        disabled={status.type === "checking"}
        onClick={handleConnectionTest}
      >
        {status.type === "checking" ? "Checking Firebase..." : "Test Firebase connection"}
      </Button>

      <div
        className="min-h-11 rounded-card border border-border bg-bg px-4 py-3 text-sm text-text-muted"
        data-testid="firebase-connection-status"
      >
        {status.type === "idle" &&
          "Click the button to confirm the configured Firebase project responds."}
        {status.type === "checking" && "Click received. Checking Firebase now..."}
        {status.type === "success" && (
          <div className="grid gap-1">
            <span className="font-bold text-text">
              Firebase config loaded for {status.result.displayName} ({status.result.projectId}).
            </span>
            {status.result.firestoreStatus === "readable" ? (
              <span className="text-text">
                Firestore read test passed at{" "}
                {new Date(status.result.checkedAt).toLocaleTimeString()}.
              </span>
            ) : (
              <span className="text-danger">
                Firestore read test failed: {status.result.firestoreMessage}
              </span>
            )}
          </div>
        )}
        {status.type === "error" && (
          <span className="text-danger">Could not connect: {status.message}</span>
        )}
      </div>
    </div>
  );
}
