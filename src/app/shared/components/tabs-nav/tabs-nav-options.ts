import { TabsNavLink } from '../../interfaces/tabsNavLink';
import { tabNavWorkoutOptions } from 'src/app/features/workouts/workouts-tab-options';

export const tabNavOptions: TabsNavLink[] = [
    {
        label: 'Treningi',
        iconName: 'flash',
        link: 'my-workouts',
        children: tabNavWorkoutOptions
    },
    {
        label: 'Profil',
        iconName: 'person',
        link: 'user/profile'
    }
];
