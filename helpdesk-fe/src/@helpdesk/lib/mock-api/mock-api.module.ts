import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HELPDESK_MOCK_API_DEFAULT_DELAY } from '@helpdesk/lib/mock-api/mock-api.constants';
import { HelpdeskMockApiInterceptor } from '@helpdesk/lib/mock-api/mock-api.interceptor';

@NgModule({
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: HelpdeskMockApiInterceptor,
            multi   : true
        }
    ]
})
export class HelpdeskMockApiModule
{
    /**
     * HelpdeskMockApi module default configuration.
     *
     * @param mockApiServices - Array of services that register mock API handlers
     * @param config - Configuration options
     * @param config.delay - Default delay value in milliseconds to apply all responses
     */
    static forRoot(mockApiServices: any[], config?: { delay?: number }): ModuleWithProviders<HelpdeskMockApiModule>
    {
        return {
            ngModule : HelpdeskMockApiModule,
            providers: [
                {
                    provide   : APP_INITIALIZER,
                    deps      : [...mockApiServices],
                    useFactory: () => (): any => null,
                    multi     : true
                },
                {
                    provide : HELPDESK_MOCK_API_DEFAULT_DELAY,
                    useValue: config?.delay ?? 0
                }
            ]
        };
    }
}
