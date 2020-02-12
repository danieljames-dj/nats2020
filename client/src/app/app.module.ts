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
import * as moment from 'moment';
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
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TempRegsComponent } from './pages/temp-regs/temp-regs.component';
import { AppRoutingModule } from './app-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatNativeDateModule} from '@angular/material';
import { MatMomentDateModule } from "@angular/material-moment-adapter";





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
    CountDownComponent,
    TempRegsComponent
    
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
    MatGridListModule,
    MatCheckboxModule,
    MatTooltipModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatNativeDateModule,
    MatMomentDateModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
