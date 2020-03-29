export class UserFormPlace {
    constructor(
        public timeRange: number[],
        public latitude: number,
        public longitude: number,
    ) { }
}

export interface IPlace { // TODO: rename I when data model will be clarified
    coords: PlaceCoords;
    time: PlaceTime;
}

export interface PlaceCoords {
    lat: number;
    lon: number;
}

export interface PlaceTime {
    from: number;
    to: number;
}
