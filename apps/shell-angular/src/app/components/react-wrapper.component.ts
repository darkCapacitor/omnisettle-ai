import { Component, ElementRef, input, afterNextRender, inject, OnDestroy, effect } from '@angular/core';
import { createRoot, Root } from 'react-dom/client';
import { createElement } from 'react';
import { ComplianceService } from '../services/compliance.service';

@Component({
  selector: 'app-react-wrapper', // Matches the HTML tag
  standalone: true,
  template: `<div #container class="react-container"></div>`,
})
export class ReactWrapperComponent implements OnDestroy {
  remoteName = input.required<string>();
  exposedModule = input.required<string>();
  
  private container = inject(ElementRef);
  private reactRoot?: Root;

  private complianceService = inject(ComplianceService);

  private syncEffect = effect(() => {
    const data = this.complianceService.complianceResult();
    if (this.reactRoot && data) {
      this.updateReactProps(data);
    }
  });
  
  constructor() {
    afterNextRender(async () => {
      await this.mountReactComponent();
      
      // Principal Move: Use an effect to re-render React 
      // whenever the Angular Signal changes!
      // effect(() => {
      //   const data = this.complianceService.complianceResult();
      //   if (this.reactRoot && data) {
      //      this.updateReactProps(data);
      //   }
      // });
    });
  }

  private updateReactProps(data: any) {
    // Re-render the same root with new props
    // React 19 is smart enough to only update the changed text
    const ReactComponent = (this as any).SavedComponent; 
    if (ReactComponent) {
      this.reactRoot?.render(createElement(ReactComponent, { 
        data: data,
        role: "Principal"
      }));
    }
  }

  private async mountReactComponent() {
    try {
      const remoteUrl = 'http://localhost:4300/assets/remoteEntry.js';
      
      // @ts-ignore
      const remote = await import(/* @vite-ignore */ remoteUrl);

      try {
        await remote.init({});
      } catch (e) { /* Already init */ }

      const factory = await remote.get(this.exposedModule());
      const module = await factory();
      
      console.log('MFE Module Content:', module);

      // --- THE FIX STARTS HERE ---
      let ReactComponent: any;

      if (typeof module === 'function') {
        // Case A: The module is the component itself (Vite optimization)
        ReactComponent = module;
      } else if (module && typeof module === 'object') {
        // Case B: The module is an object containing exports
        ReactComponent = module.default || module[Object.keys(module)[0]];
      }
      (this as any).SavedComponent = ReactComponent;

      if (!ReactComponent) {
        throw new Error(`Could not resolve a valid React component from the remote module.`);
      }
      // --- THE FIX ENDS HERE ---
      
      const domNode = this.container.nativeElement.querySelector('.react-container');
      
      if (domNode) {
        this.reactRoot = createRoot(domNode);
        this.reactRoot.render(createElement(ReactComponent, { 
            title: "OmniSettle Dashboard",
            timestamp: new Date().toLocaleTimeString()
        }));
        console.log("🚀 React Remote Mounted successfully!");
      }
    } catch (err) {
      console.error('MFE Loading Error:', err);
    }
  }

  ngOnDestroy() {
    this.reactRoot?.unmount();
  }
}