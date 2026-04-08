import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsuranceService, InsurancePlan } from '../services/insurance.service';

@Component({
  selector: 'app-insurance-company',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './insurance-company.html',
  styleUrl: './insurance-company.css'
})
export class InsuranceCompany {
  plans: InsurancePlan[] = [
    { id: 1, name: 'Family Health Plus', type: 'Health', coverageAmount: 500000, premium: 12000 },
    { id: 2, name: 'Term Life Shield', type: 'Life', coverageAmount: 10000000, premium: 8500 },
    { id: 3, name: 'Auto Secure', type: 'Vehicle', coverageAmount: 300000, premium: 4500 }
  ];

  selectedPlan = signal<InsurancePlan | null>(null);
  purchaseComplete = signal(false);

  purchaseForm: FormGroup;

  // INTERVIEW CONCEPT: Dependency Injection
  // We inject our singleton InsuranceService into the constructor
  constructor(private fb: FormBuilder, private insuranceService: InsuranceService) {
    this.purchaseForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  selectPlan(plan: InsurancePlan) {
    this.selectedPlan.set(plan);
    this.purchaseComplete.set(false);
    this.purchaseForm.reset();
  }

  onSubmit() {
    if (this.purchaseForm.valid && this.selectedPlan()) {
      
      // Instead of managing local state, we delegate to our Service!
      this.insuranceService.purchaseNewPolicy(
        this.selectedPlan()!, 
        this.purchaseForm.value.fullName
      );
      
      this.purchaseComplete.set(true);
      this.selectedPlan.set(null);
    } else {
      this.purchaseForm.markAllAsTouched();
    }
  }
}
