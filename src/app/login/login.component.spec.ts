import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Router } from "@angular/router";
import { LoginComponent } from './login.component';
import { ApiService } from '../services/api.service';
import { of } from "rxjs";
import { FormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let apiService: ApiService;
  let router: Router;
  let http: HttpClient;

  beforeEach(() => {
    apiService = new ApiService(http);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: Router, useValue: router }
      ],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show/hide the password', () => {
    const passwordField = document.createElement('input');
    component.field = {
      nativeElement: passwordField,
    };
    component.showPassword();
    expect(passwordField.type).toBe('password');

    component.showPassword();
    expect(passwordField.type).toBe('text');
  });

  it('should login and navigate to home page on success', fakeAsync(() => {
    const mockResponse = {
      valid: true,
      username: 'super',
      email: 'admin@chatlink.com',
      id: 1,
      groups: [1, 2, 3, 4],
      roles: ['SA', 'GA', 'US']
    };

    spyOn(apiService, 'apiPost').and.returnValue(of(mockResponse));


    component.username = 'super';
    component.password = '123';
    component.login();

    tick();

    expect(localStorage.getItem('valid')).toBe('true');
    expect(localStorage.getItem('username')).toBe('super');
    expect(localStorage.getItem('picture')).toBe('undefined');
    expect(localStorage.getItem('highestRole')).toBe('SA');
    expect(localStorage.getItem('id')).toBe('1');

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }));

  it("should show alert for login error", fakeAsync(() => {
    const mockResponse = {valid: false};

    spyOn(apiService, 'apiPost').and.returnValue(of(mockResponse));
    spyOn(window, 'alert');

    component.login();
    tick();

    expect(localStorage.getItem("valid")).toBe("false");
    expect(window.alert).toHaveBeenCalledWith('Incorrect username or password');

  }))
  
});
