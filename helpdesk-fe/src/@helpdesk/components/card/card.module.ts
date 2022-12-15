import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpdeskCardComponent } from '@helpdesk/components/card/card.component';

@NgModule({
    declarations: [
        HelpdeskCardComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        HelpdeskCardComponent
    ]
})
export class HelpdeskCardModule
{
}
