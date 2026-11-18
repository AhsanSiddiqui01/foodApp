import { themedPills } from '../theme';
// userProfiles.apcontrol values
export const ROLES = {
  USER: 0, // "Customer": orders lunch
  HANDLER: 1, // "Admin": sees orders, updates their status, picks them up
  ADMIN: 2, // "Owner": everything the admin does, plus managing the menu and users
};

// Roles the owner can assign when creating a user
export const ROLE_OPTIONS = themedPills([
  { value: ROLES.USER, label: 'Customer', color: '#2E9E5B', background: '#E7F6EC' },
  { value: ROLES.HANDLER, label: 'Admin', color: '#B26A00', background: '#FFF4E0' },
  { value: ROLES.ADMIN, label: 'Owner', color: '#1458C4', background: '#E8F0FD' },
]);

// Admin or owner: can see all orders and update their status
export const isStaff = (apcontrol) => Number(apcontrol) === ROLES.HANDLER || Number(apcontrol) === ROLES.ADMIN;

// Owner: also manages the menu and users
export const isAdmin = (apcontrol) => Number(apcontrol) === ROLES.ADMIN;

export const roleOption = (apcontrol) =>
  ROLE_OPTIONS.find((option) => option.value === Number(apcontrol)) || ROLE_OPTIONS[0];

export const roleLabel = (apcontrol) => roleOption(apcontrol).label;
