import { NgForm } from '@angular/forms'
import { Injectable } from "@angular/core";
@Injectable()
export class FormHelper {

    check(fc: any, form: any): boolean {
        return fc.invalid && (fc.touched || fc.dirty || form.submitted)
    }

}
