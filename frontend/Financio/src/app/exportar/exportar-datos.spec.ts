import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportarDatos } from './exportar-datos';

describe('ExportarDatos', () => {
  let component: ExportarDatos;
  let fixture: ComponentFixture<ExportarDatos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportarDatos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportarDatos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
