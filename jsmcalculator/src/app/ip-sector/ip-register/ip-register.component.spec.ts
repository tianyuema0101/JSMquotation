import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpRegisterComponent } from './ip-register.component';

describe('IpRegisterComponent', () => {
  let component: IpRegisterComponent;
  let fixture: ComponentFixture<IpRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
