import { ValidatorFn, AbstractControl } from '@angular/forms';

export function timeRangeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const validRange = control.value && !control.value[1] ? false : true;
        return validRange ? null : { missingEndTime: { value: control.value } };
    };
}
