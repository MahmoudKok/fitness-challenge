export const DEFAULT_GROUP_ID = "default_fitbuddies_group" as const;

export type UserPath = `users/${string}`;
export type DefaultGroupPath = `groups/${typeof DEFAULT_GROUP_ID}`;
export type DefaultGroupMemberPath =
  `groups/${typeof DEFAULT_GROUP_ID}/members/${string}`;

export const firestorePaths = {
  user: (userId: string): UserPath => `users/${userId}`,
  defaultGroup: (): DefaultGroupPath => `groups/${DEFAULT_GROUP_ID}`,
  defaultGroupMember: (userId: string): DefaultGroupMemberPath =>
    `groups/${DEFAULT_GROUP_ID}/members/${userId}`,
} as const;
