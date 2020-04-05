export class LocationForm {
    constructor(
        public timeRange: Date[],
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
