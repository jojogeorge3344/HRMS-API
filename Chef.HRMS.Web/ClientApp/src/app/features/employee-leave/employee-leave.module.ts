import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { EmployeeLeaveContainerComponent } from './employee-leave-container/employee-leave-container.component';
import { EmployeeLeaveBalanceComponent } from './employee-leave-balance/employee-leave-balance.component';
import { EmployeeLeaveRequestListComponent } from './employee-leave-request-list/employee-leave-request-list.component';
import { EmployeeLeaveRequestCreateComponent } from './employee-leave-request-create/employee-leave-request-create.component';
import { EmployeeLeaveRequestViewComponent } from './employee-leave-request-view/employee-leave-request-view.component';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { LeaveRequestPrintComponent } from './leave-request-print/leave-request-print.component';
import { ReportViewerModule } from '@shared/report-viewer/report-viewer.module';
import { BoldReportViewerModule } from '@boldreports/angular-reporting-components';
import { EmployeeLeaveRequestEditComponent } from './employee-leave-request-edit/employee-leave-request-edit.component';


@NgModule({
  declarations: [
    EmployeeLeaveContainerComponent,
    EmployeeLeaveBalanceComponent,
    EmployeeLeaveRequestListComponent,
    EmployeeLeaveRequestCreateComponent,
    EmployeeLeaveRequestViewComponent,
    LeaveRequestPrintComponent,
    EmployeeLeaveRequestEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: EmployeeLeaveContainerComponent,
        data: { breadcrumbs: ['Me', 'Leave'], name: 'me-leave' }
      },
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule.forRoot(),
    DirectivesModule,
    ReportViewerModule,
    BoldReportViewerModule
    
  ],
  providers: [{

    provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    multi: true,
    
  },
  DatePipe],
})
export class EmployeeLeaveModule { }
