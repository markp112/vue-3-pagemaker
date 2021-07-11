import { NavMenuItemInterface } from '@/classes/base/navbar/nav-menu/model/nav-menu-item';

export const menuWhenLoggedIn: NavMenuItemInterface[] = [
  {
    id: 0,
    navText: 'Profile',
    navLink: '/profile',
    isVisible: true,
  },
  {
    id: 1,
    navText: 'Settings',
    navLink: '/settings',
    isVisible: true,
  },
  {
    id: 2,
    navText: 'Admin',
    navLink: '/iconEditor',
    isVisible: true,
  },
  {
    id: 3,
    navText: 'Image Library',
    navLink: '/imageLibrary',
    isVisible: true,
  },
];

export const menuWhenLoggedOut: NavMenuItemInterface[] = [
  {
    id: 0,
    navText: 'Login',
    navLink: '/login',
    isVisible: true,
  },
  {
    id: 1,
    navText: 'Register',
    navLink: '/register',
    isVisible: true,
  },
];
