import { Routes } from '@angular/router';
import { Insurer } from './insurer/insurer';
import { InsuranceCompany } from './insurance-company/insurance-company';
import { Irda } from './irda/irda';
import { Surveyor } from './surveyor/surveyor';

export const routes: Routes = [
  { path: 'insurer', component: Insurer },
  { path: 'insurance-company', component: InsuranceCompany },
  { path: 'irda', component: Irda },
  { path: 'surveyor', component: Surveyor },
  { path: '', redirectTo: '/insurer', pathMatch: 'full' }
];
