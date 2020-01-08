import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './template/not-found/not-found.component';
/* import { AuthGuard } from './guards/auth.guard' */ // No use as this is not an authentication based app
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, //Routing empty route to home 
  { path: 'home', component: HomeComponent },  //Calling home component when route is home 
  { path: 'events', component: EventsComponent },
  { path: '**', component: NotFoundComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
