import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HelpdeskLoadingBarComponent } from '@helpdesk/components/loading-bar/loading-bar.component';

@NgModule({
    declarations: [
        HelpdeskLoadingBarComponent
    ],
    imports     : [
        CommonModule,
        MatProgressBarModule
    ],
    exports     : [
        HelpdeskLoadingBarComponent
    ]
})
export class HelpdeskLoadingBarModule
{
}
