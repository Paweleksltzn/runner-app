import { Workout } from '../../interfaces/workout/workout';

export const testWorkout: Workout = {
    title: 'Trening testowy',
    excercises: [
        {
            name: 'Rozpiętki na płaskiej ławce',
            breakTime: 20,
            series: [
                {
                    repeats: 10,
                    weight: 20,
                },
                {
                    repeats: 12,
                    weight: 21
                },
                {
                    repeats: 10,
                    weight: 25
                }
            ]
        },
        {
            name: 'Pompki na poręczach',
            breakTime: 20,
            series: [
                {
                    repeats: 10,
                    weight: 21
                },
                {
                    repeats: 15,
                    weight: 21
                },
                {
                    repeats: 12,
                    weight: 21
                }
            ]
        },
        {
            name: 'Wyciskanie na klate leżąc',
            breakTime: 20,
            series: [
                {
                    repeats: 12,
                    weight: 50
                },
                {
                    repeats: 12,
                    weight: 79
                },
                {
                    repeats: 12,
                    weight: 95
                }
            ]
        }
    ]
};
