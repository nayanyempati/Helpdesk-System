import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HelpdeskAlertComponent } from '@helpdesk/components/alert/alert.component';

@NgModule({
    declarations: [
        HelpdeskAlertComponent
    ],
    imports     : [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        HelpdeskAlertComponent
    ]
})
export class HelpdeskAlertModule
{
}
