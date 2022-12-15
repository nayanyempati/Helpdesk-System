import { NgModule } from '@angular/core';
import { HelpdeskFindByKeyPipe } from '@helpdesk/pipes/find-by-key/find-by-key.pipe';

@NgModule({
    declarations: [
        HelpdeskFindByKeyPipe
    ],
    exports     : [
        HelpdeskFindByKeyPipe
    ]
})
export class HelpdeskFindByKeyPipeModule
{
}
