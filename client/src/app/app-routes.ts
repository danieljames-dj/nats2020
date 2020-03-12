import { HomeComponent } from './pages/home/home.component';
import { TeamComponent } from './pages/team/team.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { CompetitorsComponent } from './pages/competitors/competitors.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { EventsComponent } from './pages/events/events.component';
import { MerchandiseComponent } from './pages/merchandise/merchandise.component';
import { AccommodationComponent } from './pages/accommodation/accommodation.component';
import { TravelComponent } from './pages/travel/travel.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { SponsorsComponent } from './pages/sponsors/sponsors.component';

export const AppRoutes = [
    {
        path: "home",
        component: HomeComponent,
        title: "HOME"
    },{
        path: "team",
        component: TeamComponent,
        title: "THE TEAM"
    },{
        path: "registration",
        component: RegistrationComponent,
        title: "REGISTRATION"
    },{
        path: "competitors",
        component: CompetitorsComponent,
        title: "COMPETITORS"
    },{
        path: "schedule",
        component: ScheduleComponent,
        title: "SCHEDULE"
    },{
        path: "events",
        component: EventsComponent,
        title: "EVENTS"
    },{
        path: "merchandise",
        component: MerchandiseComponent,
        title: "MERCHANDISE"
    },{
        path: "accommodation",
        component: AccommodationComponent,
        title: "ACCOMMODATION"
    },{
        path: "travel",
        component: TravelComponent,
        title: "TRAVEL"
    },{
        path: "faq",
        component: FaqsComponent,
        title: "FAQs"
    },{
        path: "sponsors",
        component: SponsorsComponent,
        title: "Sponsors"
    }
];