import{ModuleWithProviders}from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDocumentsContainerComponent } from './employee-documents-container/employee-documents-container.component';


const routes:Routes=[

    {
        path: '', component: EmployeeDocumentsContainerComponent,
        data: { breadcrumbs: ['Me', 'Documents'], name: 'me-mydocuments' }
      }
    
    ];

    export const routing:ModuleWithProviders=RouterModule.forChild(routes)