import type { Timestamp } from "firebase/firestore";

import { DEFAULT_GROUP_ID } from "./firestore-paths";

export type FirestoreTimestamp = Timestamp | Date | string;
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

export type Group = {
  groupId: DefaultGroupId;
  name: string;
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
