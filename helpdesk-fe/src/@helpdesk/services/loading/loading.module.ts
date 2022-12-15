import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HelpdeskLoadingInterceptor } from '@helpdesk/services/loading/loading.interceptor';

@NgModule({
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: HelpdeskLoadingInterceptor,
            multi   : true
        }
    ]
})
export class HelpdeskLoadingModule
{
}
