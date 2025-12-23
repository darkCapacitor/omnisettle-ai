import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ComplianceData {
  status: string;
  aI_Reasoning: string;
  tax: number;
}

@Injectable({ providedIn: 'root' })
export class ComplianceService {
  private http = inject(HttpClient);
  
  // The Single Source of Truth for the whole app
  // Using a Signal makes this extremely high-performance
  complianceResult = signal<ComplianceData | null>(null);
  isLoading = signal<boolean>(false);

  async validateCurrentTransaction() {
    this.isLoading.set(true);
    
    // Calling the .NET Gateway endpoint we created earlier
    this.http.get<ComplianceData>('http://localhost:5000/test-compliance')
      .subscribe({
        next: (data) => {
          this.complianceResult.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Gateway Error:', err);
          this.isLoading.set(false);
        }
      });
  }
}