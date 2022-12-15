import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpdeskHighlightComponent } from '@helpdesk/components/highlight/highlight.component';

@NgModule({
    declarations: [
        HelpdeskHighlightComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        HelpdeskHighlightComponent
    ]
})
export class HelpdeskHighlightModule
{
}
