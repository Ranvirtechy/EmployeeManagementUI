import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressPropertiesRequiredComponent } from './address-properties-required.component';
describe('AddressPropertiesComponent', () => {
  let component: AddressPropertiesRequiredComponent;
  let fixture: ComponentFixture<AddressPropertiesRequiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddressPropertiesRequiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressPropertiesRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
