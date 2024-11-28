import type { NavbarItem } from './types/base/navbar/NavbarItem'
import { mdiHome } from '@mdi/js'

export const navbarItems: NavbarItem[] = [
  {
    label: 'Home',
    icon: mdiHome,
    to: '/',
  },
  {
    label: 'About',
    icon: mdiHome,
    to: '/about',
  },
]
