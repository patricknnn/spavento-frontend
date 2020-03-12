import { NavbarComponent } from './_components/navbar/navbar.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './_components/login/login.component';
import {RegisterComponent} from './_components/register/register.component';
import {HomeComponent} from './_components/home/home.component';
import {ProfileComponent} from './_components/profile/profile.component';
import {BoardAdminComponent} from './_components/board-admin/board-admin.component';
import {BoardModeratorComponent} from './_components/board-moderator/board-moderator.component';
import {BoardUserComponent} from './_components/board-user/board-user.component';

import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {CreatePaintingComponent} from './_components/create-painting/create-painting.component';
import {DetailsPaintingComponent} from './_components/details-painting/details-painting.component';
import {ListPaintingComponent} from './_components/list-painting/list-painting.component';
import {UpdatePaintingComponent} from './_components/update-painting/update-painting.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownModule, EditorModule, FileUploadModule, InputTextModule, MultiSelectModule, TableModule} from 'primeng';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    CreatePaintingComponent,
    DetailsPaintingComponent,
    ListPaintingComponent,
    UpdatePaintingComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    EditorModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule,
    TableModule,
    MultiSelectModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
