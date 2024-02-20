export const navLinks = ["Today","This Week","This Month"] as const
export type NavLink = typeof navLinks[number]
