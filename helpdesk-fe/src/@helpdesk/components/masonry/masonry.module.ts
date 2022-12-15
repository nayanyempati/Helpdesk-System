import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpdeskMasonryComponent } from '@helpdesk/components/masonry/masonry.component';

@NgModule({
    declarations: [
        HelpdeskMasonryComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        HelpdeskMasonryComponent
    ]
})
export class HelpdeskMasonryModule
{
}
