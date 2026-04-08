import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InsuranceService, ActivePolicy } from '../services/insurance.service';

@Component({
  selector: 'app-surveyor',
  imports: [CommonModule],
  templateUrl: './surveyor.html',
  styleUrl: './surveyor.css',
})
export class Surveyor implements OnInit {
  
  // INTERVIEW CONCEPT: Reading Route Parameters
  // We use ActivatedRoute to see what parameters were passed in the URL
  private route = inject(ActivatedRoute);
  private insuranceService = inject(InsuranceService);

  // The policy we are currently surveying
  surveyingPolicy: ActivePolicy | undefined = undefined;
  
  claimSubmitted = false;

  ngOnInit() {
    // We subscribe to the paramMap to get the 'policyNumber' we defined in app.routes.ts
    // This is asynchronous because route parameters can change without reloading the component
    this.route.paramMap.subscribe(params => {
      const pNo = params.get('policyNumber');
      if (pNo) {
        // Look up the policy in our global state
        this.surveyingPolicy = this.insuranceService.getPolicyByNumber(pNo);
      }
    });
  }

  submitSurveyReport(estimatedDamage: string) {
    if (!estimatedDamage) {
      alert("Please enter an estimated damage amount.");
      return;
    }
    
    // In a real app, this would POST to a backend or update a centralized "ClaimsService"
    console.log(`Survey Report Submitted for ${this.surveyingPolicy?.policyNumber}: ₹${estimatedDamage}`);
    this.claimSubmitted = true;
  }
}
