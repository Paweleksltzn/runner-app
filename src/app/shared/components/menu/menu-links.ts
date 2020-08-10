import { TabsNavLink } from 'src/app/shared/interfaces/tabsNavLink';

export const menuLinks: TabsNavLink[] = [
    {
        label: 'Profil',
        iconName: 'person',
        link: 'user/profile'
    },
    {
        label: 'Nowy Trening',
        iconName: 'flash',
        link: 'workout'
    },
    {
        label: 'Moje treningi',
        iconName: 'today',
        link: 'my-workouts'
    },
    {
        label: 'Historia treningow',
        iconName: 'menu',
        link: 'workouts-history'
    }
];
