import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpProfileComponent } from './ip-profile.component';

describe('IpProfileComponent', () => {
  let component: IpProfileComponent;
  let fixture: ComponentFixture<IpProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
