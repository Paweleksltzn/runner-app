import { Series } from './series';

export interface Excersise {
    name: string;
    breakTime: number;
    series: Array<Series>;
}
