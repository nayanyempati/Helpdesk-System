import { NgModule } from '@angular/core';
import { HelpdeskSplashScreenService } from '@helpdesk/services/splash-screen/splash-screen.service';

@NgModule({
    providers: [
        HelpdeskSplashScreenService
    ]
})
export class HelpdeskSplashScreenModule
{
    /**
     * Constructor
     */
    constructor(private _helpdeskSplashScreenService: HelpdeskSplashScreenService)
    {
    }
}
