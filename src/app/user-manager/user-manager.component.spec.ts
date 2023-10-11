import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { UserManagerComponent } from './user-manager.component';

describe('UserManagerComponent', () => {
  let component: UserManagerComponent;
  let fixture: ComponentFixture<UserManagerComponent>;
  let apiService: ApiService;
  let router: Router;
  let http: HttpClient;

  beforeEach(() => {
    apiService = new ApiService(http);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [UserManagerComponent],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: Router, useValue: router }
      ]
    });
    fixture = TestBed.createComponent(UserManagerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should redirect user back home if not a super admin", fakeAsync(() => {
    localStorage.setItem("highestRole", "US");

    const mockResponse = {
      GA: [{id: 2, username: "bob_smith", email: "bob_smith@gmail.com"}],
      US: [{id: 4, username: "user2", email: "user@gmail.com"}]
    }

    spyOn(apiService, "apiGet").and.returnValue(of(mockResponse));

    component.ngOnInit();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(["/"]);
  }));

  it("should promote user to group admin", fakeAsync(() => {
    const mockResponse = {successful: true};

    spyOn(apiService, "apiPost").and.returnValue(of(mockResponse));
    spyOn(window, "alert");
    const reload = spyOn(component, "reloadPage");

    component.promote("user2", "GA");
    tick();

    expect(window.alert).toHaveBeenCalledWith("User Modified");
    expect(reload).toHaveBeenCalled;
  }))

  it("should demote group admin to user", fakeAsync(() => {
    const mockResponse = {successful: true};

    spyOn(apiService, "apiPost").and.returnValue(of(mockResponse));
    spyOn(window, "alert");
    const reload = spyOn(component, "reloadPage");

    component.demote("user2");
    tick();

    expect(window.alert).toHaveBeenCalledWith("User Modified");
    expect(reload).toHaveBeenCalled;
  }))
});
