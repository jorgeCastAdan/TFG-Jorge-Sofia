import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociadosComponent } from './asociados.component';

describe('AsociadosComponent', () => {
  let component: AsociadosComponent;
  let fixture: ComponentFixture<AsociadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsociadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
