import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimosVotosComponent } from './ultimos-votos.component';

describe('UltimosVotosComponent', () => {
  let component: UltimosVotosComponent;
  let fixture: ComponentFixture<UltimosVotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UltimosVotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UltimosVotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
