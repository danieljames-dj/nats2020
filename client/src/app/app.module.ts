import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule
  } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';

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
import {MatTableModule} from '@angular/material/table';
import { FooterComponent } from './pages/footer/footer.component';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import { CountDownComponent } from './pages/count-down/count-down.component';
import {MatGridListModule} from '@angular/material/grid-list';

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
    FaqsComponent,
    FooterComponent,
    CountDownComponent
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
    MatListModule,
    MatTableModule,
    MatTabsModule,
    CountdownTimerModule.forRoot(),
    MatGridListModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
