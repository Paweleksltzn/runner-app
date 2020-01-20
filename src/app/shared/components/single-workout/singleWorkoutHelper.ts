export const emptySingleSet = {
    weight: undefined,
    repeats: undefined,
    breakTime: 45
};

export const singleWorkoutModes = {
    training: 'training',
    history: 'history',
    trainingList: 'onTrainingList'
};

export const emptyWorkoutTemplate = {
    excercises: [{
        name: 'Cwiczenie 1',
        series: [{
            ...emptySingleSet
        }]
    }]
};
