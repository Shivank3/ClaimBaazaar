import { Injectable, signal } from '@angular/core';

// We move these core interfaces here so they can be shared globally
export interface InsurancePlan {
  id: number;
  name: string;
  type: 'Health' | 'Life' | 'Vehicle';
  coverageAmount: number;
  premium: number;
}

export interface ActivePolicy {
  policyNumber: string;
  planDetails: InsurancePlan;
  policyHolderName: string;
  issueDate: Date;
  expiryDate: Date; // Added Expiry Date
  status: 'Active' | 'Underwriting' | 'Expired';
}

// INTERVIEW CONCEPT: Dependency Injection & Singleton Services
// providedIn: 'root' makes this a Singleton, meaning there is only one instance 
// acting as a centralized "Central State" across the entire application.
@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  
  // State Management: Centralized array using Angular Signals
  private portfolioSignal = signal<ActivePolicy[]>([
    {
      policyNumber: 'POL-893241',
      planDetails: { id: 3, name: 'Auto Secure', type: 'Vehicle', coverageAmount: 300000, premium: 4500 },
      policyHolderName: 'Shivank',
      issueDate: new Date('2024-05-12T00:00:00'),
      expiryDate: new Date('2025-05-12T00:00:00'), // Expires in 1 year
      status: 'Active'
    }
  ]);

  // We expose it as read-only to prevent components from mutating it directly 
  // (Good architecture practice)
  public readonly activePolicies = this.portfolioSignal.asReadonly();

  // The only way to modify the state is through this explicit method
  purchaseNewPolicy(plan: InsurancePlan, holderName: string) {
    const mockPolicyNo = 'POL-' + Math.floor(Math.random() * 900000 + 100000);
    
    const issue = new Date();
    const expiry = new Date();
    expiry.setFullYear(issue.getFullYear() + 1); // Sets expiry to 1 year from now

    const newPolicy: ActivePolicy = {
      policyNumber: mockPolicyNo,
      planDetails: plan,
      policyHolderName: holderName,
      issueDate: issue,
      expiryDate: expiry,
      status: 'Active'
    };

    // Immutable update
    this.portfolioSignal.update(policies => [...policies, newPolicy]);
  }

  // Helper method to look up a specific policy (Useful for the Surveyor module)
  getPolicyByNumber(policyNumber: string): ActivePolicy | undefined {
    return this.activePolicies().find(p => p.policyNumber === policyNumber);
  }
}
