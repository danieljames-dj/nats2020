import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { TeamComponent } from "./pages/team/team.component";
import { RegistrationComponent } from "./pages/registration/registration.component";
import { CompetitorsComponent } from "./pages/competitors/competitors.component";
import { ScheduleComponent } from "./pages/schedule/schedule.component";
import { EventsComponent } from "./pages/events/events.component";
import { MerchandiseComponent } from "./pages/merchandise/merchandise.component";
import { AccommodationComponent } from "./pages/accommodation/accommodation.component";
import { TravelComponent } from "./pages/travel/travel.component";
import { FaqsComponent } from "./pages/faqs/faqs.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "team",
    component: TeamComponent
  },
  {
    path: "registration",
    component: RegistrationComponent
  },
  {
    path: "competitors",
    component: CompetitorsComponent
  },
  {
    path: "schedule",
    component: ScheduleComponent
  },
  {
    path: "events",
    component: EventsComponent
  },
  {
    path: "merchandise",
    component: MerchandiseComponent
  },
  {
    path: "accommodation",
    component: AccommodationComponent
  },
  {
    path: "travel",
    component: TravelComponent
  },
  {
    path: "faq",
    component: FaqsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
