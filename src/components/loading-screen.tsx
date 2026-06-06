"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type LoadingScreenProps = {
  className?: string;
  isLeaving?: boolean;
};

export function LoadingScreen({ className, isLeaving = false }: LoadingScreenProps) {
  return (
    <div
      aria-live="polite"
      aria-busy={!isLeaving}
      className={cn(
        "loading-screen fixed inset-0 z-50 grid min-h-screen place-items-center overflow-hidden bg-bg text-text",
        isLeaving && "loading-screen--leaving pointer-events-none",
        className,
      )}
      role="status"
    >
      <div className="loading-screen__aura" />
      <div className="loading-screen__grid" />
      <div className="loading-screen__orb loading-screen__orb--lime" />
      <div className="loading-screen__orb loading-screen__orb--orange" />

      <section className="loading-screen__content" aria-label="Loading Fitness Challenge">
        <div className="loading-screen__mark-wrap" aria-hidden="true">
          <span className="loading-screen__ring loading-screen__ring--outer" />
          <span className="loading-screen__ring loading-screen__ring--inner" />
          <Image
            alt=""
            className="loading-screen__theme-asset loading-screen__theme-asset--light loading-screen__mark"
            height={156}
            priority
            src="/icons/icon-logo.png"
            unoptimized
            width={156}
          />
          <Image
            alt=""
            className="loading-screen__theme-asset loading-screen__theme-asset--dark loading-screen__mark"
            height={169}
            priority
            src="/icons/icon-logo-dark.png?v=20260606-2"
            unoptimized
            width={153}
          />
        </div>

        <Image
          alt=""
          aria-hidden="true"
          className="loading-screen__theme-asset loading-screen__theme-asset--light loading-screen__logo"
          height={118}
          priority
          src="/images/full-logo.png"
          unoptimized
          width={472}
        />
        <Image
          alt=""
          aria-hidden="true"
          className="loading-screen__theme-asset loading-screen__theme-asset--dark loading-screen__logo loading-screen__logo--dark"
          height={236}
          priority
          src="/images/full-logo-dark.png?v=20260606-2"
          unoptimized
          width={472}
        />

        <div className="loading-screen__meter" aria-hidden="true">
          <span className="loading-screen__meter-fill" />
        </div>

        <p className="loading-screen__text">Warming up your challenge</p>
      </section>
    </div>
  );
}
