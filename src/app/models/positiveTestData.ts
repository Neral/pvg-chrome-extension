import { Location } from './location';

export const OFICIAL_TEST_TYPE = 'COVID1';

export class PositiveTestData {
    testType;
    constructor(
        public email: string,
        public testDate: number,
        public locations: Location[],
    ) {
        this.testType = OFICIAL_TEST_TYPE;
     }
}
