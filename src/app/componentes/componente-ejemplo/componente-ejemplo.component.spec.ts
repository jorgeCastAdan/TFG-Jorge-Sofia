import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteEjemploComponent } from './componente-ejemplo.component';

describe('ComponenteEjemploComponent', () => {
  let component: ComponenteEjemploComponent;
  let fixture: ComponentFixture<ComponenteEjemploComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteEjemploComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteEjemploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
