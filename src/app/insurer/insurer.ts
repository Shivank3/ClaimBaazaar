import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InsuranceService, ActivePolicy } from '../services/insurance.service';

@Component({
  selector: 'app-insurer',
  imports: [CommonModule],
  templateUrl: './insurer.html',
  styleUrl: './insurer.css',
})
export class Insurer {
  
  private insuranceService = inject(InsuranceService);
  private router = inject(Router);

  policies = this.insuranceService.activePolicies;

  totalCoverage = computed(() => {
    return this.policies().reduce((total: number, policy: ActivePolicy) => total + policy.planDetails.coverageAmount, 0);
  });

  fileClaim(policyNumber: string) {
    // INTERVIEW CONCEPT: Programmatic Navigation
    // We use the Router service to navigate in code, passing the dynamic parameter
    this.router.navigate(['/surveyor', policyNumber]);
  }
}
