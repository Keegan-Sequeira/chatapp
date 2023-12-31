import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { GroupManagerComponent } from './group-manager/group-manager.component';
import { GroupComponent } from './group/group.component';
import { ChatComponent } from './chat/chat.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "logout", component: LogoutComponent},
  {path: "manage/groups", component: GroupManagerComponent},
  {path: "manage/group/:id", component: GroupComponent},
  {path: "chat", component: ChatComponent},
  {path: "manage/users", component: UserManagerComponent},
  {path: "account", component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
