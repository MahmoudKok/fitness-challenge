import type { User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { db } from "./client";
import { ensureDefaultGroupExists } from "./default-group";
import { DEFAULT_GROUP_ID, firestorePaths } from "./firestore-paths";
import type { AuthProvider, GroupMember, UserProfile } from "./firestore-types";

function getDisplayName(user: User) {
  return user.displayName ?? user.email?.split("@")[0] ?? "FitBuddies Member";
}

function getAuthProviders(user: User, authProvider: AuthProvider) {
  return Array.from(
    new Set([
      authProvider,
      ...user.providerData.map((provider) => provider.providerId),
    ]),
  );
}

export async function ensureUserProfile(
  user: User,
  authProvider: AuthProvider,
): Promise<void> {
  const userRef = doc(db, firestorePaths.user(user.uid));
  const userSnapshot = await getDoc(userRef);
  const timestamp = serverTimestamp();
  const displayName = getDisplayName(user);
  const basicUserData = {
    name: displayName,
    displayName,
    email: user.email,
    photoUrl: user.photoURL,
    authProvider,
    authProviders: getAuthProviders(user, authProvider),
    updatedAt: timestamp,
    lastLoginAt: timestamp,
  } satisfies Pick<
    UserProfile,
    | "name"
    | "displayName"
    | "email"
    | "photoUrl"
    | "authProvider"
    | "authProviders"
    | "updatedAt"
    | "lastLoginAt"
  >;

  if (userSnapshot.exists()) {
    await setDoc(userRef, basicUserData, { merge: true });
    return;
  }

  const userProfile = {
    uid: user.uid,
    ...basicUserData,
    defaultGroupId: DEFAULT_GROUP_ID,
    profile: {
      heightCm: null,
      weightKg: null,
      goalWeightKg: null,
      fitnessGoal: null,
      activityLevel: null,
    },
    preferences: {
      measurementSystem: "metric",
      notificationsEnabled: true,
      dailyReminderTime: null,
    },
    onboarding: {
      completed: false,
      completedAt: null,
      currentStep: null,
    },
    status: "active",
    createdAt: timestamp,
  } satisfies UserProfile;

  await setDoc(userRef, userProfile, { merge: true });
}

export async function ensureDefaultGroupMember(user: User): Promise<void> {
  const memberRef = doc(db, firestorePaths.defaultGroupMember(user.uid));
  const memberSnapshot = await getDoc(memberRef);
  const timestamp = serverTimestamp();
  const displayName = getDisplayName(user);
  const basicMemberData = {
    name: displayName,
    displayName,
    email: user.email,
    photoUrl: user.photoURL,
    updatedAt: timestamp,
  } satisfies Pick<
    GroupMember,
    "name" | "displayName" | "email" | "photoUrl" | "updatedAt"
  >;

  if (memberSnapshot.exists()) {
    await setDoc(memberRef, basicMemberData, { merge: true });
    return;
  }

  const groupMember = {
    userId: user.uid,
    groupId: DEFAULT_GROUP_ID,
    ...basicMemberData,
    joinedAt: timestamp,
    stats: {
      workoutsCompleted: 0,
      totalWorkoutMinutes: 0,
      currentStreakDays: 0,
      longestStreakDays: 0,
      lastWorkoutAt: null,
      updatedAt: timestamp,
    },
  } satisfies GroupMember;

  await setDoc(memberRef, groupMember, { merge: true });
}

export async function syncUserAfterAuth(
  user: User,
  authProvider: AuthProvider,
): Promise<void> {
  await ensureDefaultGroupExists();
  await ensureUserProfile(user, authProvider);
  await ensureDefaultGroupMember(user);
}
