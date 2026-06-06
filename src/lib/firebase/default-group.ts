import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { db } from "./client";
import { DEFAULT_GROUP_ID, firestorePaths } from "./firestore-paths";
import type { Group } from "./firestore-types";

export async function ensureDefaultGroupExists(): Promise<void> {
  const timestamp = serverTimestamp();
  const defaultGroup = {
    id: DEFAULT_GROUP_ID,
    name: "FitBuddies Main Group",
    description: "Default group for the MVP version",
    ownerId: null,
    settings: {
      dailyMaxPoints: 100,
      scoring: {
        workoutMaxPoints: 40,
        noSugarPoints: 15,
        noBreadPoints: 10,
        waterMaxPoints: 15,
        sleepMaxPoints: 10,
        logPoints: 10,
        penalties: {
          sugaryDrink: 5,
          sweets: 5,
          untrackedOutsideMeal: 10,
          caloriesOverLimit: 10,
          noLog: 10,
        },
      },
      targets: {
        defaultWaterLiters: 2.5,
        defaultSleepHours: 7,
      },
    },
    status: "active",
    createdAt: timestamp,
    updatedAt: timestamp,
  } satisfies Group;

  await setDoc(doc(db, firestorePaths.defaultGroup()), defaultGroup, { merge: true });
}
