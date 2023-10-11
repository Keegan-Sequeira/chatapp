import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let apiService: ApiService;
  let router: Router;
  let http: HttpClient;

  beforeEach(() => {
    apiService = new ApiService(http);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: Router, useValue: router }
      ],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it("should redirect user back home if not logged in", fakeAsync(() => {
    localStorage.setItem("groups", "[1]");
    const mockResponse = {
      groups: [{name: "test", id: 1}]
    }

    spyOn(apiService, "apiPost").and.returnValue(of(mockResponse));

    component.ngOnInit();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(["/"]);
  }));

  it("should update profile image", fakeAsync(() => {
    const mockFile = new File(['file contents'], "test.jpeg", { type: "image/jpeg" })
    const mockResponse = { result: "OK", data: { filename: "test.jpeg" } };
    spyOn(window, "alert");
    spyOn(apiService, "imgUpload").and.returnValue(of(mockResponse));

    component.onFileSelected({ target: { files: [mockFile] } });
    component.updateProfile();
    tick();

    expect(component.imgpath).toBe("test.jpeg");
    expect(window.alert).not.toHaveBeenCalled();
  }))
});
