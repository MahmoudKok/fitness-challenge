import type { FieldValue, Timestamp } from "firebase/firestore";

import { DEFAULT_GROUP_ID } from "./firestore-paths";

export type FirestoreTimestamp = Timestamp | Date | FieldValue | string;
export type DefaultGroupId = typeof DEFAULT_GROUP_ID;

export type AuthProvider = string;
export type UserStatus = "active";

export type UserProfileDetails = {
  heightCm: number | null;
  weightKg: number | null;
  goalWeightKg: number | null;
  fitnessGoal: string | null;
  activityLevel: string | null;
};

export type UserPreferences = {
  measurementSystem: "metric";
  notificationsEnabled: boolean;
  dailyReminderTime: string | null;
};

export type UserOnboarding = {
  completed: boolean;
  completedAt: FirestoreTimestamp | null;
  currentStep: string | null;
};

export type UserProfile = {
  uid: string;
  name: string;
  displayName: string;
  email: string | null;
  photoUrl: string | null;
  authProvider: AuthProvider;
  authProviders: AuthProvider[];
  defaultGroupId: DefaultGroupId;
  profile: UserProfileDetails;
  preferences: UserPreferences;
  onboarding: UserOnboarding;
  status: UserStatus;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
  lastLoginAt: FirestoreTimestamp;
};

export type GroupPenaltySettings = {
  sugaryDrink: number;
  sweets: number;
  untrackedOutsideMeal: number;
  caloriesOverLimit: number;
  noLog: number;
};

export type GroupScoringSettings = {
  workoutMaxPoints: number;
  noSugarPoints: number;
  noBreadPoints: number;
  waterMaxPoints: number;
  sleepMaxPoints: number;
  logPoints: number;
  penalties: GroupPenaltySettings;
};

export type GroupTargetSettings = {
  defaultWaterLiters: number;
  defaultSleepHours: number;
};

export type GroupSettings = {
  dailyMaxPoints: number;
  scoring: GroupScoringSettings;
  targets: GroupTargetSettings;
};

export type GroupStatus = "active";

export type Group = {
  id: DefaultGroupId;
  name: string;
  description: string;
  ownerId: string | null;
  settings: GroupSettings;
  status: GroupStatus;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
};

export type GroupMemberStats = {
  workoutsCompleted: number;
  totalWorkoutMinutes: number;
  currentStreakDays: number;
  longestStreakDays: number;
  lastWorkoutAt: FirestoreTimestamp | null;
  updatedAt: FirestoreTimestamp;
};

export type GroupMember = {
  userId: string;
  groupId: DefaultGroupId;
  name: string;
  displayName: string;
  email: string | null;
  photoUrl: string | null;
  joinedAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
  stats: GroupMemberStats;
};
