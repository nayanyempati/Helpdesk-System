import { NgModule } from '@angular/core';
import { HelpdeskUtilsService } from '@helpdesk/services/utils/utils.service';

@NgModule({
    providers: [
        HelpdeskUtilsService
    ]
})
export class HelpdeskUtilsModule
{
    /**
     * Constructor
     */
    constructor(private _helpdeskUtilsService: HelpdeskUtilsService)
    {
    }
}
