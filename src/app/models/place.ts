export class Place {
    constructor(
        public timeFrom: number,
        public timeTo: number,
        public latitude: number,
        public longitude: number,
    ) { }
}

export class UserFormPlace {
    constructor(
        public timeRange: number[],
        public latitude: number,
        public longitude: number,
    ) { }
}

