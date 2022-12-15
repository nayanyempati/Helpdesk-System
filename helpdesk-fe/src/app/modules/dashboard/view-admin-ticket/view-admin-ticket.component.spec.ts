import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminTicketComponent } from './view-admin-ticket.component';

describe('ViewAdminTicketComponent', () => {
  let component: ViewAdminTicketComponent;
  let fixture: ComponentFixture<ViewAdminTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdminTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAdminTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
