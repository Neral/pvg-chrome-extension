import { Location } from './location';

export interface ResultsData {
    score: number;
    lat: number;
    lon: number;
    from: number;
    to: number;
}

export interface ResultsCalculationData {
    locations: Location[];
}
// TODO: extend Locations
