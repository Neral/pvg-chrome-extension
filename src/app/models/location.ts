export class LocationForm {
    constructor(
        public timeRange: Date[],
        public latitude: number,
        public longitude: number,
    ) { }
}

export interface Location {
    latitude: number;
    longitude: number;
    timeFrom: Date;
    timeTo: Date;
}
