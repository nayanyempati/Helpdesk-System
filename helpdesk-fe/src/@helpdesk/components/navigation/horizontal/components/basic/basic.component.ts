import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HelpdeskHorizontalNavigationComponent } from '@helpdesk/components/navigation/horizontal/horizontal.component';
import { HelpdeskNavigationService } from '@helpdesk/components/navigation/navigation.service';
import { HelpdeskNavigationItem } from '@helpdesk/components/navigation/navigation.types';
import { HelpdeskUtilsService } from '@helpdesk/services/utils/utils.service';

@Component({
    selector       : 'helpdesk-horizontal-navigation-basic-item',
    templateUrl    : './basic.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpdeskHorizontalNavigationBasicItemComponent implements OnInit, OnDestroy
{
    @Input() item: HelpdeskNavigationItem;
    @Input() name: string;

    isActiveMatchOptions: IsActiveMatchOptions;
    private _helpdeskHorizontalNavigationComponent: HelpdeskHorizontalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _helpdeskNavigationService: HelpdeskNavigationService,
        private _helpdeskUtilsService: HelpdeskUtilsService
    )
    {
        // Set the equivalent of {exact: false} as default for active match options.
        // We are not assigning the item.isActiveMatchOptions directly to the
        // [routerLinkActiveOptions] because if it's "undefined" initially, the router
        // will throw an error and stop working.
        this.isActiveMatchOptions = this._helpdeskUtilsService.subsetMatchOptions;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Set the "isActiveMatchOptions" either from item's
        // "isActiveMatchOptions" or the equivalent form of
        // item's "exactMatch" option
        this.isActiveMatchOptions =
            this.item.isActiveMatchOptions ?? this.item.exactMatch
                ? this._helpdeskUtilsService.exactMatchOptions
                : this._helpdeskUtilsService.subsetMatchOptions;

        // Get the parent navigation component
        this._helpdeskHorizontalNavigationComponent = this._helpdeskNavigationService.getComponent(this.name);

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Subscribe to onRefreshed on the navigation component
        this._helpdeskHorizontalNavigationComponent.onRefreshed.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
