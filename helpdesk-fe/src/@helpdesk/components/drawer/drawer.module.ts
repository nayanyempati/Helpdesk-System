import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpdeskDrawerComponent } from '@helpdesk/components/drawer/drawer.component';

@NgModule({
    declarations: [
        HelpdeskDrawerComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        HelpdeskDrawerComponent
    ]
})
export class HelpdeskDrawerModule
{
}
