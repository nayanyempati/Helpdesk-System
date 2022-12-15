import { NgModule } from '@angular/core';
import { HelpdeskMediaWatcherService } from '@helpdesk/services/media-watcher/media-watcher.service';

@NgModule({
    providers: [
        HelpdeskMediaWatcherService
    ]
})
export class HelpdeskMediaWatcherModule
{
    /**
     * Constructor
     */
    constructor(private _helpdeskMediaWatcherService: HelpdeskMediaWatcherService)
    {
    }
}
