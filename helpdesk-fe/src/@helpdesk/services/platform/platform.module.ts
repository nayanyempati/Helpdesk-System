import { NgModule } from '@angular/core';
import { HelpdeskPlatformService } from '@helpdesk/services/platform/platform.service';

@NgModule({
    providers: [
        HelpdeskPlatformService
    ]
})
export class HelpdeskPlatformModule
{
    /**
     * Constructor
     */
    constructor(private _helpdeskPlatformService: HelpdeskPlatformService)
    {
    }
}
