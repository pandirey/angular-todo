import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { AnotherLinkComponent } from './another-link/another-link.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'to-do-list', component: ToDoListComponent },
    { path: 'another-link', component: AnotherLinkComponent },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    // must be last in the route path!!!
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }