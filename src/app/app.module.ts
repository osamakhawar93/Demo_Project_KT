import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

//Components imports
import { AppComponent } from './app.component';
import { NotFoundComponent } from './template/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';


//Shared Service Import 
import { SharedService } from './services/shared.service';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    EventsComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'},SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
