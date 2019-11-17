import { TabsNavLink } from 'src/app/shared/interfaces/tabsNavLink';

export const tabNavWorkoutOptions: TabsNavLink[] = [
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
