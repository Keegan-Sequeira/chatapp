import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from "@angular/router";
import { ApiService } from '../services/api.service';
import { of } from "rxjs";
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';
import { HttpClient } from '@angular/common/http';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let apiService: ApiService;
  let router: Router;
  let http: HttpClient;

  beforeEach(() => {
    apiService = new ApiService(http);
    router = jasmine.createSpyObj("Router", ["navigate"]);

    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: Router, useValue: router }
      ],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(SignupComponent);
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

  it("should show password error", () => {
    component.password = "123";
    component.signup();

    expect(component.error?.nativeElement.getAttribute("class")).toBe("error");
  })

  it("should show email error", () => {
    component.email = "billy";
    component.signup();

    expect(component.emailError?.nativeElement.getAttribute("class")).toBe("error");
  })

  it("should alert the user that username already exists", fakeAsync(() => {
    component.email = "admin@chatlink.com";
    component.username = "super";
    component.password = "Password1";

    const mockResponse = {
      valid: false
    }

    spyOn(apiService, 'apiPost').and.returnValue(of(mockResponse));
    spyOn(window, 'alert');

    component.signup();
    tick();

    expect(window.alert).toHaveBeenCalledWith('Username already exists.');
  }))

  it("should create new user, and redirect to the home page", fakeAsync(() => {
    const mockResponse = {
      valid: true,
      username: "billy",
      email: "billy@gmail.com",
      id: 10,
      groups: [1],
      roles: ["US"]
    }

    component.email = "billy@gmail.com";
    component.username = "billy";
    component.password = "Password1";

    spyOn(apiService, "apiPost").and.returnValue(of(mockResponse));

    component.signup();
    tick();

    expect(localStorage.getItem("valid")).toBe("true");
    expect(localStorage.getItem("username")).toBe("billy");
    expect(localStorage.getItem("email")).toBe("billy@gmail.com");
    expect(localStorage.getItem("id")).toBe("10");
    expect(localStorage.getItem("highestRole")).toBe("US");
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }))
});

