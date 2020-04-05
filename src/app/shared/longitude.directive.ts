import { ValidatorFn, AbstractControl } from '@angular/forms';

export function longitudeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const validLongitude = control.value > 180 || control.value < -180 ? false : true;
        return validLongitude ? null : { invalidValue: { value: control.value } };
    };
}
