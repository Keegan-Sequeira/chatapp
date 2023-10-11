import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { GroupComponent } from './group.component';

describe('GroupComponent', () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;
  let apiService: ApiService;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let http: HttpClient;

  beforeEach(() => {
    apiService = new ApiService(http);
    router = jasmine.createSpyObj("Router", ["navigate"]);
    activatedRoute = jasmine.createSpyObj("ActivatedRoute", [], { params: of({id: 1})});

    TestBed.configureTestingModule({
      declarations: [GroupComponent],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute}
      ]
    });
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should redirect user back home if not a group or super admin", fakeAsync(() => {
    localStorage.setItem("highestRole", "US");

    const mockResponse = {
      name: "Open Group",
      channels: ["Channel 1", "Channel 2"]
    }
    const mockUsers = {
      in: [1, 2, 3],
      out: [4, 5]
    }

    spyOn(apiService, "apiPost").and.returnValues(of(mockResponse), of(mockUsers));

    component.ngOnInit();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(["/"]);
  }));

  it("should populate users and group data", fakeAsync(() => {
    localStorage.setItem("highestRole", "GA");

    const mockResponse = {
      name: "Open Group",
      channels: ["Channel 1", "Channel 2"]
    }
    const mockUsers = {
      in: [1, 2, 3],
      out: [4, 5]
    }

    spyOn(apiService, "apiPost").and.returnValues(of(mockResponse), of(mockUsers));

    component.ngOnInit();
    tick();
    
    expect(component.users.in.length).toBe(mockUsers.in.length);
    expect(component.users.out.length).toBe(mockUsers.out.length);
  }))

  it('should create a new channel and show an alert', fakeAsync(() => {
    const mockResponse = { successful: true };

    spyOn(window, 'alert');
    spyOn(apiService, "apiPost").and.returnValue(of(mockResponse));
    const reload = spyOn(component, "reloadPage");

    component.name = "New Test Channel";
    component.newChannel();
    tick();

    expect(window.alert).toHaveBeenCalledWith('Channel Created Successfully.');
    expect(reload).toHaveBeenCalled();
  }));
  
  it("should delete a channel and show alert", fakeAsync(() => {
    const mockResponse = { successful: true };

    spyOn(window, "alert");
    spyOn(apiService, "apiPost").and.returnValue(of(mockResponse));
    const reload = spyOn(component, "reloadPage");

    component.deleteChannel("Test Channel");
    tick();

    expect(window.alert).toHaveBeenCalledWith("Channel Deleted Successfully.")
    expect(reload).toHaveBeenCalled();
  }))

  it("should remove user's access from group", fakeAsync(() => {
    const mockResponse = { successful: true };

    spyOn(window, "alert");
    spyOn(apiService, "apiPost").and.returnValue(of(mockResponse));
    const reload = spyOn(component, "reloadPage");

    component.removeUser("test_user");
    tick();

    expect(window.alert).toHaveBeenCalledWith("User Removed from Group.");
    expect(reload).toHaveBeenCalled();
  }))

  it("should add a user to a group", fakeAsync(() => {
    const mockResponse = { successful: true };

    spyOn(window, "alert");
    spyOn(apiService, "apiPost").and.returnValue(of(mockResponse));
    const reload = spyOn(component, "reloadPage");

    component.addUser("test_user");
    tick();

    expect(window.alert).toHaveBeenCalledWith("User Added to Group.");
    expect(reload).toHaveBeenCalled();
  }))

});
