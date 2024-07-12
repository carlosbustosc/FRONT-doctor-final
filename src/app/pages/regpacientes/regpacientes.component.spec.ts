import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegpacientesComponent } from './regpacientes.component';

describe('RegpacientesComponent', () => {
  let component: RegpacientesComponent;
  let fixture: ComponentFixture<RegpacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegpacientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegpacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
