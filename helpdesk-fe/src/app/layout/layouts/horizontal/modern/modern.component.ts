import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HelpdeskMediaWatcherService } from '@helpdesk/services/media-watcher';
import { HelpdeskNavigationItem, HelpdeskNavigationService, HelpdeskVerticalNavigationComponent } from '@helpdesk/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { DashboardService } from 'app/backend-api/dashboard/dashboard.service';

@Component({
    selector: 'modern-layout',
    templateUrl: './modern.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ModernLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: Navigation;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    menuData: HelpdeskNavigationItem[];
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _dashbaordService: DashboardService,
        private _navigationService: NavigationService,
        private _helpdeskMediaWatcherService: HelpdeskMediaWatcherService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._dashbaordService.userDetails().subscribe({
            next: (response) => {
                if (response.Role == "admin") {
                    this.menuData = [
                        {
                            id: 'dashboards',
                            title: 'Dashboards',
                            type: 'basic',
                            icon: 'heroicons_outline:chart-pie',
                            link: '/dashboard/overview'
                        },
                        {
                            id: 'employees',
                            title: 'Employees',
                            type: 'basic',
                            icon: 'heroicons_outline:users',
                            link: '/dashboard/employees'
                        },
                        {
                            id: 'clients',
                            title: 'Clients',
                            type: 'basic',
                            icon: 'heroicons_outline:office-building',
                            link: '/dashboard/clients'
                        },
                        {
                            id: 'tickets',
                            title: 'Tickets',
                            type: 'basic',
                            icon: 'heroicons_outline:ticket',
                            link: '/dashboard/ticketslist'
                        }
                    ];

                }
                else if (response.Role == "employee") {
                    this.menuData = [
                        {
                            id: 'dashboards',
                            title: 'Dashboards',
                            type: 'basic',
                            icon: 'heroicons_outline:chart-pie',
                            link: '/dashboard/overview'
                        },
                        {
                            id: 'tickets',
                            title: 'Tickets',
                            type: 'basic',
                            icon: 'heroicons_outline:ticket',
                            link: '/dashboard/tickets'
                        }
                    ];

                }
                else if (response.Role == "client") {
                    this.menuData = [
                        {
                            id: 'dashboards',
                            title: 'Dashboards',
                            type: 'basic',
                            icon: 'heroicons_outline:chart-pie',
                            link: '/dashboard/overview'
                        },
                        {
                            id: 'tickets',
                            title: 'Tickets',
                            type: 'basic',
                            icon: 'heroicons_outline:ticket',
                            link: '/dashboard/tickets'
                        }
                    ];

                }
            }
        })



        // Subscribe to media changes
        this._helpdeskMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
       
    }
}
