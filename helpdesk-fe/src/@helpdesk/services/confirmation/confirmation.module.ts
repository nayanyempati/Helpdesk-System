import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HelpdeskConfirmationService } from '@helpdesk/services/confirmation/confirmation.service';
import { HelpdeskConfirmationDialogComponent } from '@helpdesk/services/confirmation/dialog/dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        HelpdeskConfirmationDialogComponent
    ],
    imports     : [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        CommonModule
    ],
    providers   : [
        HelpdeskConfirmationService
    ]
})
export class HelpdeskConfirmationModule
{
    /**
     * Constructor
     */
    constructor(private _helpdeskConfirmationService: HelpdeskConfirmationService)
    {
    }
}
