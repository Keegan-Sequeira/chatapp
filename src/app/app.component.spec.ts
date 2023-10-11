import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(component).toBeTruthy();
  });

  it('should initialize validUser as false', () => {
    expect(component.validUser).toBeFalse();
  });

  it('should initialize username as an empty string', () => {
    expect(component.username).toBe('');
  });

  it('should initialize highestRole as an empty string', () => {
    expect(component.highestRole).toBe('');
  });

  it('should update validUser, username, and highestRole in ngDoCheck', () => {
    localStorage.setItem('valid', 'true');
    localStorage.setItem('username', 'super');
    localStorage.setItem('highestRole', 'SA');

    component.ngDoCheck();

    expect(component.validUser).toBeTrue();
    expect(component.username).toBe('super');
    expect(component.highestRole).toBe('SA');
  });

  it('should reset properties in ngDoCheck if localStorage values are not available', () => {
    localStorage.removeItem('valid');
    localStorage.removeItem('username');
    localStorage.removeItem('highestRole');

    component.ngDoCheck();

    expect(component.validUser).toBeFalse();
    expect(component.username).toBe('');
    expect(component.highestRole).toBe('');
  });

});
