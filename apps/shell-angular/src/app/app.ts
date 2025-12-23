import { Component, inject } from '@angular/core';
import { ReactWrapperComponent } from './components/react-wrapper.component';
import { ComplianceService } from './services/compliance.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactWrapperComponent],
  // Use 'template' instead of 'templateUrl' for a moment to clear the JIT cache
  template: `
    <div class="min-h-screen bg-neutral-900 text-white p-12">
      <div class="max-w-4xl mx-auto">
        <header class="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
          <h1 class="text-5xl font-black tracking-tighter italic">
            Omni<span class="text-omni-green">Settle</span>
          </h1>
          
          <button 
            (click)="complianceService.validateCurrentTransaction()"
            class="bg-omni-green text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform active:bg-green-400">
            Run AI Compliance Check
          </button>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="p-6 bg-slate-800 rounded-xl border border-slate-700">
            <h3 class="text-slate-400 uppercase text-xs mb-4">Angular Shell State</h3>
            <p>Loading: {{ complianceService.isLoading() }}</p>
            <p>Last Sync: {{ complianceService.complianceResult() ? 'Success' : 'None' }}</p>
          </div>

          <app-react-wrapper
            remoteName="remoteAdvisor" 
            exposedModule="./AiAdvisor">
          </app-react-wrapper>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class App {
  public complianceService = inject(ComplianceService);
}