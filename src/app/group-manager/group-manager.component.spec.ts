import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GroupManagerComponent } from './group-manager.component';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('GroupManagerComponent', () => {
  let component: GroupManagerComponent;
  let fixture: ComponentFixture<GroupManagerComponent>;
  let apiService: ApiService;
  let router: Router;
  let http: HttpClient;

  beforeEach(() => {
    apiService = new ApiService(http);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [GroupManagerComponent],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: Router, useValue: router }
      ],
    });

    fixture = TestBed.createComponent(GroupManagerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should redirect user back home if not a group or super admin", fakeAsync(() => {
    localStorage.setItem("highestRole", "US");
    localStorage.setItem("groups", "[1]");

    const mockResponse = {
      groups: [{name: "test", id: 1}]
    }

    spyOn(apiService, "apiPost").and.returnValue(of(mockResponse));

    component.ngOnInit();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(["/"]);
  }));

  it("should fetch and populate groups", fakeAsync(() => {
    localStorage.setItem("highestRole", "GA");
    localStorage.setItem("groups", "[1, 2]");

    const mockResponse = {
      groups: [{name: "Open Group", id: 1}, {name: "Bob's Private Group", id: 2}]
    }

    spyOn(apiService, "apiPost").and.returnValue(of(mockResponse));
    component.ngOnInit();
    tick();

    expect(component.groups.length).toBe(mockResponse.groups.length);
  }))

  it("should successfully create a group", fakeAsync(() => {
    localStorage.setItem("highestRole", "SA");
    localStorage.setItem("groups", "[1, 2, 3, 4]");

    const mockResponse = {successful: true};
    const mockUserData = {
      valid: true,
      username: 'super',
      email: 'admin@chatlink.com',
      id: 1,
      groups: [1, 2, 3, 4],
      roles: ['SA']
    }

    spyOn(apiService, "apiPost").and.returnValues(of(mockResponse), of(mockUserData));
    spyOn(window, "alert"); 
    const reload = spyOn(component, 'reloadPage');

    component.name = "New Group Testing";
    component.userId = 1;

    component.createGroup();
    tick();

    expect(window.alert).toHaveBeenCalledWith("Group Created Successfully.")
    expect(reload).toHaveBeenCalled();
  }))

});


