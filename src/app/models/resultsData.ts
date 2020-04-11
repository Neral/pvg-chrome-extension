import { Location } from './location';

export interface ResultsData {
    score: number;
    latitude: number;
    longitude: number;
    timeFrom: Date;
    timeTo: Date;
}

export interface ResultsCalculationData {
    locations: Location[];
}
// TODO: extend Locations
