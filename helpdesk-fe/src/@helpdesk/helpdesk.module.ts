import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HelpdeskConfirmationModule } from '@helpdesk/services/confirmation';
import { HelpdeskLoadingModule } from '@helpdesk/services/loading';
import { HelpdeskMediaWatcherModule } from '@helpdesk/services/media-watcher/media-watcher.module';
import { HelpdeskPlatformModule } from '@helpdesk/services/platform/platform.module';
import { HelpdeskSplashScreenModule } from '@helpdesk/services/splash-screen/splash-screen.module';
import { HelpdeskUtilsModule } from '@helpdesk/services/utils/utils.module';

@NgModule({
    imports  : [
        HelpdeskConfirmationModule,
        HelpdeskLoadingModule,
        HelpdeskMediaWatcherModule,
        HelpdeskPlatformModule,
        HelpdeskSplashScreenModule,
        HelpdeskUtilsModule
    ],
    providers: [
        {
            // Disable 'theme' sanity check
            provide : MATERIAL_SANITY_CHECKS,
            useValue: {
                doctype: true,
                theme  : false,
                version: true
            }
        },
        {
            // Use the 'fill' appearance on Angular Material form fields by default
            provide : MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill'
            }
        }
    ]
})
export class HelpdeskModule
{
    /**
     * Constructor
     */
    constructor(@Optional() @SkipSelf() parentModule?: HelpdeskModule)
    {
        if ( parentModule )
        {
            throw new Error('HelpdeskModule has already been loaded. Import this module in the AppModule only!');
        }
    }
}
