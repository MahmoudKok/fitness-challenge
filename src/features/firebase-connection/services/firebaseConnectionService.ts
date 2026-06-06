import { doc, getDocFromServer } from "firebase/firestore";
import { db, firebaseApp } from "@/lib/firebase/client";

type FirestoreConnectionStatus = "readable" | "unavailable";

export type FirebaseConnectionResult = {
  appName: string;
  displayName: string;
  firestoreMessage?: string;
  firestoreStatus: FirestoreConnectionStatus;
  projectId: string;
  checkedAt: string;
};

const FIRESTORE_TIMEOUT_MS = 8000;

function getMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown Firestore error.";
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number) {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      window.setTimeout(() => {
        reject(new Error(`Firestore did not respond within ${timeoutMs / 1000} seconds.`));
      }, timeoutMs);
    }),
  ]);
}

export async function testFirebaseConnection(): Promise<FirebaseConnectionResult> {
  let firestoreMessage: string | undefined;
  let firestoreStatus: FirestoreConnectionStatus = "readable";

  try {
    await withTimeout(getDocFromServer(doc(db, "__connection_checks", "status")), FIRESTORE_TIMEOUT_MS);
  } catch (error) {
    firestoreStatus = "unavailable";
    firestoreMessage = getMessage(error);
  }

  return {
    appName: firebaseApp.name,
    displayName:
      process.env.NEXT_PUBLIC_FIREBASE_APP_NICKNAME ??
      firebaseApp.options.projectId ??
      firebaseApp.name,
    firestoreMessage,
    firestoreStatus,
    projectId: firebaseApp.options.projectId ?? "unknown project",
    checkedAt: new Date().toISOString(),
  };
}
