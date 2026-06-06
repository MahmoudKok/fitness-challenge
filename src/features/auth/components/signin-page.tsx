"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import {
  readLocalRegisteredUser,
  saveLocalRegisteredUser,
} from "@/features/auth/lib/local-registration";

function MailIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M4.75 6.75h14.5v10.5H4.75V6.75Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="m5.25 7.25 6.75 5 6.75-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M7.5 10V7.75a4.5 4.5 0 0 1 9 0V10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M6 10h12v9H6v-9Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M12 14.5v1.75" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M3.75 12s3-5.25 8.25-5.25S20.25 12 20.25 12s-3 5.25-8.25 5.25S3.75 12 3.75 12Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M12 14.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      {hidden && (
        <path
          d="m4.75 19.25 14.5-14.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      )}
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" className="size-8" fill="none" viewBox="0 0 32 32">
      <path d="M5 16h20" stroke="currentColor" strokeLinecap="round" strokeWidth="2.6" />
      <path
        d="m17 8 8 8-8 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.6"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24">
      <path
        d="M21.6 12.23c0-.74-.07-1.45-.19-2.13H12v4.03h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.89-1.74 2.98-4.3 2.98-7.43Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.7 0 4.96-.9 6.62-2.44l-3.24-2.51c-.9.6-2.04.95-3.38.95-2.6 0-4.8-1.76-5.59-4.12H3.07v2.59A10 10 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.41 13.88A6 6 0 0 1 6.1 12c0-.65.11-1.29.31-1.88V7.53H3.07A10 10 0 0 0 2 12c0 1.61.39 3.13 1.07 4.47l3.34-2.59Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6c1.47 0 2.79.51 3.83 1.5l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.93 5.53l3.34 2.59C7.2 7.76 9.4 6 12 6Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function getAuthErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Could not sign in. Please try again.";
}

function getDisplayName(displayName: string | null, email: string | null) {
  return displayName ?? email?.split("@")[0] ?? "FitBuddies Member";
}

export function SigninPage() {
  const router = useRouter();
  const emailId = useId();
  const passwordId = useId();
  const redirectTimer = useRef<number | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (readLocalRegisteredUser()) {
      router.replace("/home");
    }

    return () => {
      if (redirectTimer.current) {
        window.clearTimeout(redirectTimer.current);
      }
    };
  }, [router]);

  const completeSignin = (
    uid: string,
    displayName: string | null,
    userEmail: string | null,
    authProvider: "google" | "password",
  ) => {
    const localDisplayName = getDisplayName(displayName, userEmail);

    saveLocalRegisteredUser({
      uid,
      name: localDisplayName,
      displayName: localDisplayName,
      email: userEmail,
      authProvider,
      registeredAt: new Date().toISOString(),
    });

    setStatus("success");
    setMessage("Signed in. Taking you home...");
    redirectTimer.current = window.setTimeout(() => {
      router.push("/home");
    }, 1100);
  };

  const handleEmailSignin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");

    try {
      const { signInWithEmailAndPassword } = await import("@/lib/firebase/auth-flows");
      const credential = await signInWithEmailAndPassword(email, password);

      completeSignin(
        credential.user.uid,
        credential.user.displayName,
        credential.user.email,
        "password",
      );
    } catch (error) {
      setStatus("error");
      setMessage(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignin = async () => {
    setIsGoogleSubmitting(true);
    setStatus("idle");
    setMessage("");

    try {
      const { signInWithGoogle } = await import("@/lib/firebase/auth-flows");
      const credential = await signInWithGoogle();

      completeSignin(
        credential.user.uid,
        credential.user.displayName,
        credential.user.email,
        "google",
      );
    } catch (error) {
      setStatus("error");
      setMessage(getAuthErrorMessage(error));
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <main className="signup-screen">
      <section className="signup-shell signin-shell" aria-labelledby="signin-title">
        <div className="signup-orb signup-orb--green" />
        <div className="signup-orb signup-orb--orange" />

        <Image
          alt="FitBuddies"
          className="signup-logo signin-logo"
          height={170}
          priority
          src="/images/full-logo-dark.png"
          width={620}
        />

        <div className="signup-heading signin-heading">
          <h1 id="signin-title">
            <span>Welcome</span> back
          </h1>
          <p>Sign in to continue your fitness journey</p>
        </div>

        <form className="signup-form signin-form" onSubmit={handleEmailSignin}>
          <label className="signup-field" htmlFor={emailId}>
            <span>Email</span>
            <div className="signup-input-wrap">
              <MailIcon />
              <input
                autoComplete="email"
                id={emailId}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                required
                type="email"
                value={email}
              />
            </div>
          </label>

          <label className="signup-field" htmlFor={passwordId}>
            <span>Password</span>
            <div className="signup-input-wrap signup-input-wrap--password">
              <LockIcon />
              <input
                autoComplete="current-password"
                id={passwordId}
                minLength={6}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                type={isPasswordVisible ? "text" : "password"}
                value={password}
              />
              <button
                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                className="signup-password-toggle"
                onClick={() => setIsPasswordVisible((current) => !current)}
                type="button"
              >
                <EyeIcon hidden={isPasswordVisible} />
              </button>
            </div>
          </label>

          <button className="signup-submit" disabled={isSubmitting || isGoogleSubmitting} type="submit">
            <span>{isSubmitting ? "Signing in..." : "Sign In"}</span>
            <ArrowRightIcon />
          </button>

          <div className="signin-divider">
            <span>or</span>
          </div>

          <button
            className="signin-google"
            disabled={isSubmitting || isGoogleSubmitting}
            onClick={handleGoogleSignin}
            type="button"
          >
            <span className="signin-google__mark">
              <GoogleIcon />
            </span>
            <span>{isGoogleSubmitting ? "Connecting..." : "Continue with Google"}</span>
          </button>

          <div aria-live="polite" className="signup-status">
            {status === "error" && <p className="signup-status--error">{message}</p>}
          </div>
        </form>

        <p className="signup-signin">
          Don&rsquo;t have an account? <Link href="/">Sign up</Link>
        </p>
      </section>

      {status === "success" && (
        <div className="signup-snackbar" role="status">
          <span className="signup-snackbar__icon" aria-hidden="true">
            <svg fill="none" viewBox="0 0 20 20">
              <path
                d="m4.5 10.4 3.5 3.5 7.5-8.2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.4"
              />
            </svg>
          </span>
          <span>{message}</span>
        </div>
      )}
    </main>
  );
}
