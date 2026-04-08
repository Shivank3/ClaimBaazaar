import { Routes } from '@angular/router';
import { Insurer } from './insurer/insurer';
import { InsuranceCompany } from './insurance-company/insurance-company';
import { Irda } from './irda/irda';
import { Surveyor } from './surveyor/surveyor';

export const routes: Routes = [
  { path: 'insurer', component: Insurer },
  { path: 'insurance-company', component: InsuranceCompany },
  { path: 'irda', component: Irda },
  
  // INTERVIEW CONCEPT: Route Parameters
  // We use the :policyNumber syntax to tell Angular this route expects a dynamic parameter
  { path: 'surveyor/:policyNumber', component: Surveyor },
  { path: 'surveyor', component: Surveyor }, // Fallback if navigated without a policy
  { path: '', redirectTo: '/insurer', pathMatch: 'full' }
];
