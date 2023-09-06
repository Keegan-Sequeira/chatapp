import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';

import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { GroupManagerComponent } from './group-manager/group-manager.component';
import { GroupComponent } from './group/group.component';
import { ChatComponent } from './chat/chat.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { ChannelsComponent } from './chat/channels/channels.component';
import { TalkComponent } from './chat/talk/talk.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    GroupManagerComponent,
    GroupComponent,
    ChatComponent,
    UserManagerComponent,
    ChannelsComponent,
    TalkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
