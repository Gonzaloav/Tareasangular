import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponetComponent } from './heroes-componet.component';

describe('HeroesComponetComponent', () => {
  let component: HeroesComponetComponent;
  let fixture: ComponentFixture<HeroesComponetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroesComponetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesComponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
