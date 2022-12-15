import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HelpdeskScrollbarModule } from '@helpdesk/directives/scrollbar/public-api';
import { HelpdeskHorizontalNavigationBasicItemComponent } from '@helpdesk/components/navigation/horizontal/components/basic/basic.component';
import { HelpdeskHorizontalNavigationBranchItemComponent } from '@helpdesk/components/navigation/horizontal/components/branch/branch.component';
import { HelpdeskHorizontalNavigationDividerItemComponent } from '@helpdesk/components/navigation/horizontal/components/divider/divider.component';
import { HelpdeskHorizontalNavigationSpacerItemComponent } from '@helpdesk/components/navigation/horizontal/components/spacer/spacer.component';
import { HelpdeskHorizontalNavigationComponent } from '@helpdesk/components/navigation/horizontal/horizontal.component';
import { HelpdeskVerticalNavigationAsideItemComponent } from '@helpdesk/components/navigation/vertical/components/aside/aside.component';
import { HelpdeskVerticalNavigationBasicItemComponent } from '@helpdesk/components/navigation/vertical/components/basic/basic.component';
import { HelpdeskVerticalNavigationCollapsableItemComponent } from '@helpdesk/components/navigation/vertical/components/collapsable/collapsable.component';
import { HelpdeskVerticalNavigationDividerItemComponent } from '@helpdesk/components/navigation/vertical/components/divider/divider.component';
import { HelpdeskVerticalNavigationGroupItemComponent } from '@helpdesk/components/navigation/vertical/components/group/group.component';
import { HelpdeskVerticalNavigationSpacerItemComponent } from '@helpdesk/components/navigation/vertical/components/spacer/spacer.component';
import { HelpdeskVerticalNavigationComponent } from '@helpdesk/components/navigation/vertical/vertical.component';

@NgModule({
    declarations: [
        HelpdeskHorizontalNavigationBasicItemComponent,
        HelpdeskHorizontalNavigationBranchItemComponent,
        HelpdeskHorizontalNavigationDividerItemComponent,
        HelpdeskHorizontalNavigationSpacerItemComponent,
        HelpdeskHorizontalNavigationComponent,
        HelpdeskVerticalNavigationAsideItemComponent,
        HelpdeskVerticalNavigationBasicItemComponent,
        HelpdeskVerticalNavigationCollapsableItemComponent,
        HelpdeskVerticalNavigationDividerItemComponent,
        HelpdeskVerticalNavigationGroupItemComponent,
        HelpdeskVerticalNavigationSpacerItemComponent,
        HelpdeskVerticalNavigationComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        HelpdeskScrollbarModule
    ],
    exports     : [
        HelpdeskHorizontalNavigationComponent,
        HelpdeskVerticalNavigationComponent
    ]
})
export class HelpdeskNavigationModule
{
}
