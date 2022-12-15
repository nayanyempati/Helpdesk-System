import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HelpdeskVerticalNavigationComponent } from '@helpdesk/components/navigation/vertical/vertical.component';
import { HelpdeskNavigationService } from '@helpdesk/components/navigation/navigation.service';
import { HelpdeskNavigationItem } from '@helpdesk/components/navigation/navigation.types';

@Component({
    selector       : 'helpdesk-vertical-navigation-spacer-item',
    templateUrl    : './spacer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpdeskVerticalNavigationSpacerItemComponent implements OnInit, OnDestroy
{
    @Input() item: HelpdeskNavigationItem;
    @Input() name: string;

    private _helpdeskVerticalNavigationComponent: HelpdeskVerticalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _helpdeskNavigationService: HelpdeskNavigationService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the parent navigation component
        this._helpdeskVerticalNavigationComponent = this._helpdeskNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._helpdeskVerticalNavigationComponent.onRefreshed.pipe(
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
