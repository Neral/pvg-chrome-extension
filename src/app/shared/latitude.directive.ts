import { ValidatorFn, AbstractControl } from '@angular/forms';

export function latitudeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const validLatitude = control.value > 90 || control.value < -90 ? false : true;
        return validLatitude ? null : { invalidValue: { value: control.value } };
    };
}
