import { Role } from "@prisma/client";

export const ROLES = {
  GUEST: "GUEST",
  USER: "USER",
  PREMIUM: "PREMIUM",
  ACADEMIC_PREMIUM: "ACADEMIC_PREMIUM",
  RESEARCHER: "RESEARCHER",
  ADMIN: "ADMIN",
} as const;

export type UserRole = keyof typeof ROLES;

export const PERMISSIONS: Record<string, readonly UserRole[]> = {
  ADMIN_ACCESS: [ROLES.ADMIN],
  RESEARCHER_ACCESS: [ROLES.RESEARCHER, ROLES.ADMIN],
  PREMIUM_CONTENT: [ROLES.PREMIUM, ROLES.ACADEMIC_PREMIUM, ROLES.ADMIN],
  PUBLIC_CONTENT: Object.values(ROLES),
};

export function hasPermission(userRole: UserRole, permission: keyof typeof PERMISSIONS) {
  return (PERMISSIONS[permission] as readonly UserRole[]).includes(userRole);
}

export function isAdmin(role: UserRole) {
  return role === ROLES.ADMIN;
}

export function isResearcher(role: UserRole) {
  return role === ROLES.RESEARCHER || role === ROLES.ADMIN;
}
