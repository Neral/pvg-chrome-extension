export class LocationForm {
    constructor(
        public timeRange: number[],
        public latitude: number,
        public longitude: number,
    ) { }
}

export interface Location {
    lat: number;
    lon: number;
    from: number;
    to: number;
}
