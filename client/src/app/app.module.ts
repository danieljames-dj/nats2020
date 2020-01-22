import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule
  } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { HomeComponent } from './pages/home/home.component';
import { TeamComponent } from './pages/team/team.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { CompetitorsComponent } from './pages/competitors/competitors.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { EventsComponent } from './pages/events/events.component';
import { MerchandiseComponent } from './pages/merchandise/merchandise.component';
import { AccommodationComponent } from './pages/accommodation/accommodation.component';
import { TravelComponent } from './pages/travel/travel.component';
import { FaqsComponent } from './pages/faqs/faqs.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TeamComponent,
    RegistrationComponent,
    CompetitorsComponent,

    ScheduleComponent,
    EventsComponent,
    MerchandiseComponent,
    AccommodationComponent,
    TravelComponent,
    FaqsComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatListModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
