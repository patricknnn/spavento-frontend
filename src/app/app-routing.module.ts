import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './_components/home/home.component';
import {LoginComponent} from './_components/login/login.component';
import {RegisterComponent} from './_components/register/register.component';
import {ProfileComponent} from './_components/profile/profile.component';
import {BoardUserComponent} from './_components/board-user/board-user.component';
import {BoardModeratorComponent} from './_components/board-moderator/board-moderator.component';
import {BoardAdminComponent} from './_components/board-admin/board-admin.component';
import {ListPaintingComponent} from './_components/list-painting/list-painting.component';
import {CreatePaintingComponent} from './_components/create-painting/create-painting.component';
import {UpdatePaintingComponent} from './_components/update-painting/update-painting.component';
import {DetailsPaintingComponent} from './_components/details-painting/details-painting.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'user', component: BoardUserComponent},
  {path: 'mod', component: BoardModeratorComponent},
  {path: 'admin', component: BoardAdminComponent},
  {path: 'admin/paintings', component: ListPaintingComponent},
  {path: 'admin/paintings/add', component: CreatePaintingComponent},
  {path: 'admin/paintings/update/:id', component: UpdatePaintingComponent},
  {path: 'admin/paintings/details/:id', component: DetailsPaintingComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
