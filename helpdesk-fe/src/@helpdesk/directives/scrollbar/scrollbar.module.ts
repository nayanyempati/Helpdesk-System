import { NgModule } from '@angular/core';
import { HelpdeskScrollbarDirective } from '@helpdesk/directives/scrollbar/scrollbar.directive';

@NgModule({
    declarations: [
        HelpdeskScrollbarDirective
    ],
    exports     : [
        HelpdeskScrollbarDirective
    ]
})
export class HelpdeskScrollbarModule
{
}
