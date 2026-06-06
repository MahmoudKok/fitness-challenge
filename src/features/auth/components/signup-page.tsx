"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import {
  readLocalRegisteredUser,
  saveLocalRegisteredUser,
} from "@/features/auth/lib/local-registration";

function UserIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 12.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4.5 21a7.5 7.5 0 0 1 15 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

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

function getAuthErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Could not create account. Please try again.";
}

export function SignupPage() {
  const router = useRouter();
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const redirectTimer = useRef<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");

    try {
      const { signUpWithEmailAndPassword } = await import("@/lib/firebase/auth-flows");

      const credential = await signUpWithEmailAndPassword(email, password, {
        displayName: name.trim(),
      });
      const displayName = credential.user.displayName ?? name.trim();

      saveLocalRegisteredUser({
        uid: credential.user.uid,
        name: displayName,
        displayName,
        email: credential.user.email,
        authProvider: "password",
        registeredAt: new Date().toISOString(),
      });

      setStatus("success");
      setMessage("Account created. Taking you home...");
      redirectTimer.current = window.setTimeout(() => {
        router.push("/home");
      }, 1300);
    } catch (error) {
      setStatus("error");
      setMessage(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="signup-screen">
      <section className="signup-shell" aria-labelledby="signup-title">
        <div className="signup-orb signup-orb--green" />
        <div className="signup-orb signup-orb--orange" />

        <Image
          alt="FitBuddies"
          className="signup-logo"
          height={170}
          priority
          src="/images/full-logo-dark.png"
          width={620}
        />

        <div className="signup-heading">
          <h1 id="signup-title">
            <span>Create</span> new account
          </h1>
          <p>Let&apos;s get you started on your fitness journey</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label className="signup-field" htmlFor={nameId}>
            <span>Name</span>
            <div className="signup-input-wrap">
              <UserIcon />
              <input
                autoComplete="name"
                id={nameId}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your full name"
                required
                type="text"
                value={name}
              />
            </div>
          </label>

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
                autoComplete="new-password"
                id={passwordId}
                minLength={6}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a strong password"
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

          <button className="signup-submit" disabled={isSubmitting} type="submit">
            <span>{isSubmitting ? "Creating..." : "Create Account"}</span>
            <ArrowRightIcon />
          </button>

          <div aria-live="polite" className="signup-status">
            {status === "error" && (
              <p className="signup-status--error">
                {message}
              </p>
            )}
          </div>
        </form>

        <p className="signup-signin">
          Already have an account? <a href="#signin">Sign in</a>
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
