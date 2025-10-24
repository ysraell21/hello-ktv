export const RouteKey = {
  dashboard: "dashboard",
  login: "login",
  register: "register",
  logout: "logout"
} as const;

export type RouteKey = typeof RouteKey[keyof typeof RouteKey];