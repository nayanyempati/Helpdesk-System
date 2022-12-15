import { NgModule } from '@angular/core';
import { HelpdeskScrollResetDirective } from '@helpdesk/directives/scroll-reset/scroll-reset.directive';

@NgModule({
    declarations: [
        HelpdeskScrollResetDirective
    ],
    exports     : [
        HelpdeskScrollResetDirective
    ]
})
export class HelpdeskScrollResetModule
{
}
