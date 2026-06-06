import type { UserCredential } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { auth } from "./client";
import { syncUserAfterAuth } from "./auth-sync";

type EmailSignUpOptions = {
  displayName?: string;
  photoUrl?: string;
};

export async function signInWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider);

  await syncUserAfterAuth(credential.user, "google");

  return credential;
}

export async function signUpWithEmailAndPassword(
  email: string,
  password: string,
  options: EmailSignUpOptions = {},
): Promise<UserCredential> {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const profileUpdates: Parameters<typeof updateProfile>[1] = {};

  if (options.displayName) {
    profileUpdates.displayName = options.displayName;
  }

  if (options.photoUrl) {
    profileUpdates.photoURL = options.photoUrl;
  }

  if (Object.keys(profileUpdates).length > 0) {
    await updateProfile(credential.user, profileUpdates);
  }

  await syncUserAfterAuth(credential.user, "password");

  return credential;
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string,
): Promise<UserCredential> {
  const credential = await firebaseSignInWithEmailAndPassword(auth, email, password);

  await syncUserAfterAuth(credential.user, "password");

  return credential;
}
