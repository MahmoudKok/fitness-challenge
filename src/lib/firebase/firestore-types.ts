import type { FieldValue, Timestamp } from "firebase/firestore";

import { DEFAULT_GROUP_ID } from "./firestore-paths";

export type FirestoreTimestamp = Timestamp | Date | FieldValue | string;
export type DefaultGroupId = typeof DEFAULT_GROUP_ID;

export type UserProfile = {
  userId: string;
  displayName: string;
  email: string | null;
  photoURL: string | null;
  defaultGroupId: DefaultGroupId;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
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
  displayName: string;
  photoURL: string | null;
  joinedAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
  stats: GroupMemberStats;
};
