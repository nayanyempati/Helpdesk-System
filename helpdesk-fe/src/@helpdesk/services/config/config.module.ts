import { ModuleWithProviders, NgModule } from '@angular/core';
import { HelpdeskConfigService } from '@helpdesk/services/config/config.service';
import { HELPDESK_APP_CONFIG } from '@helpdesk/services/config/config.constants';

@NgModule()
export class HelpdeskConfigModule
{
    /**
     * Constructor
     */
    constructor(private _helpdeskConfigService: HelpdeskConfigService)
    {
    }

    /**
     * forRoot method for setting user configuration
     *
     * @param config
     */
    static forRoot(config: any): ModuleWithProviders<HelpdeskConfigModule>
    {
        return {
            ngModule : HelpdeskConfigModule,
            providers: [
                {
                    provide : HELPDESK_APP_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
