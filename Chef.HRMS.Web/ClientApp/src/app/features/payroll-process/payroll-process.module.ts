import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PipesModule } from '../../pipes/pipes.module';
import { customErrorMessages } from '@shared/utils/utils.functions';

import { PayrollProcessRoutingModule } from './payroll-process-routing.module';
import { PayrollProcessListComponent } from './payroll-process-list/payroll-process-list.component';
import { PayrollProcessMethodComponent } from './payroll-process-method/payroll-process-method.component';
import { PayrollProcessViewComponent } from './payroll-process-view/payroll-process-view.component';
import { PayrollProcessCreateContainerComponent } from './payroll-process-create-container/payroll-process-create-container.component';
import { PayrollProcessBonusListComponent } from './payroll-process-bonus/payroll-process-bonus-list/payroll-process-bonus-list.component';
import { PayrollProcessBonusCreateComponent } from './payroll-process-bonus/payroll-process-bonus-create/payroll-process-bonus-create.component';
import { PayrollProcessBonusEditComponent } from './payroll-process-bonus/payroll-process-bonus-edit/payroll-process-bonus-edit.component';
import { PayrollProcessBonusViewComponent } from './payroll-process-bonus/payroll-process-bonus-view/payroll-process-bonus-view.component';
import { PayrollProcessLoanCreateComponent } from './payroll-process-bonus/payroll-process-loan-create/payroll-process-loan-create.component';
import { PayrollProcessLoanEditComponent } from './payroll-process-bonus/payroll-process-loan-edit/payroll-process-loan-edit.component';
import { PayrollProcessLoanViewComponent } from './payroll-process-bonus/payroll-process-loan-view/payroll-process-loan-view.component';
import { PayrollProcessLeaveListComponent } from './payroll-process-leave/payroll-process-leave-list/payroll-process-leave-list.component';
import { ApprovedLeaveComponent } from './payroll-process-leave/approved-leave/approved-leave.component';
import { UnApprovedLeaveComponent } from './payroll-process-leave/un-approved-leave/un-approved-leave.component';
import { PayrollProcessSalaryListComponent } from './payroll-process-salary/payroll-process-salary-list/payroll-process-salary-list.component';
import { PayrollProcessSalaryEditComponent } from './payroll-process-salary/payroll-process-salary-edit/payroll-process-salary-edit.component';
import { UnMarkedLeaveComponent } from './payroll-process-leave/un-marked-leave/un-marked-leave.component';
import { PayrollProcessAdhocListComponent } from './payroll-process-adhoc/payroll-process-adhoc-list/payroll-process-adhoc-list.component';
import { PayrollProcessLoansAdvancesListComponent } from './payroll-process-adhoc/payroll-process-loans-advances-list/payroll-process-loans-advances-list.component';
import { PayrollDeferPayementComponent } from './payroll-process-adhoc/payroll-defer-payement/payroll-defer-payement.component';
import { PayrollCreateAdhocPaymentComponent } from './payroll-process-adhoc/payroll-create-adhoc-payment/payroll-create-adhoc-payment.component';
import { PayrollEditAdhocPaymentComponent } from './payroll-process-adhoc/payroll-edit-adhoc-payment/payroll-edit-adhoc-payment.component';
import { PayrollProcessAdhocContainerComponent } from './payroll-process-adhoc/payroll-process-adhoc-container/payroll-process-adhoc-container.component';
import { PayrollViewAdhocPaymentComponent } from './payroll-process-adhoc/payroll-view-adhoc-payment/payroll-view-adhoc-payment.component';
import { PayrollProcessPreviewListComponent } from './payroll-process-preview/payroll-process-preview-list/payroll-process-preview-list.component';
import { PayrollProcessPreviewSplitComponent } from './payroll-process-preview/payroll-process-preview-split/payroll-process-preview-split.component';
import { PayrollProcessEmployeeContainerComponent } from './payroll-process-employee-container/payroll-process-employee-container.component';
import { PayrollEmployeeLeaveComponent } from './payroll-employee-leave/payroll-employee-leave.component';
import { PayrollEmployeeSalaryComponent } from './payroll-employee-salary/payroll-employee-salary.component';
import { PayrollEmployeeBonusContainerComponent } from './payroll-employee-bonus/payroll-employee-bonus-container/payroll-employee-bonus-container.component';
import { PayrollEmployeeBonusListComponent } from './payroll-employee-bonus/payroll-employee-bonus-list/payroll-employee-bonus-list.component';
import { PayrollEmployeeLoanAdvancesListComponent } from './payroll-employee-bonus/payroll-employee-loan-advances-list/payroll-employee-loan-advances-list.component';
import { PayrollEmployeeCreateBonusComponent } from './payroll-employee-bonus/payroll-employee-create-bonus/payroll-employee-create-bonus.component';
import { PayrollEmployeeEditBonusComponent } from './payroll-employee-bonus/payroll-employee-edit-bonus/payroll-employee-edit-bonus.component';
import { PayrollEmployeeCreateLoanAdvancesComponent } from './payroll-employee-bonus/payroll-employee-create-loan-advances/payroll-employee-create-loan-advances.component';
import { PayrollEmployeeEditLoanAdvancesComponent } from './payroll-employee-bonus/payroll-employee-edit-loan-advances/payroll-employee-edit-loan-advances.component';
import { PayrollEmployeeViewLoanAdvancesComponent } from './payroll-employee-bonus/payroll-employee-view-loan-advances/payroll-employee-view-loan-advances.component';
import { PayrollEmployeeViewBonusComponent } from './payroll-employee-bonus/payroll-employee-view-bonus/payroll-employee-view-bonus.component';
import { PayrollCreateAdhocComponent } from './payroll-employee-adhoc/payroll-create-adhoc/payroll-create-adhoc.component';
import { PayrollEditAdhocComponent } from './payroll-employee-adhoc/payroll-edit-adhoc/payroll-edit-adhoc.component';
import { PayrollViewAdhocComponent } from './payroll-employee-adhoc/payroll-view-adhoc/payroll-view-adhoc.component';
import { PayrollAdhocContainerComponent } from './payroll-employee-adhoc/payroll-adhoc-container/payroll-adhoc-container.component';
import { PayrollAdhocListComponent } from './payroll-employee-adhoc/payroll-adhoc-list/payroll-adhoc-list.component';
import { PayrollLoanAdvanceListComponent } from './payroll-employee-adhoc/payroll-loan-advance-list/payroll-loan-advance-list.component';
import { PayrollEmployeeReviewComponent } from './payroll-employee-review/payroll-employee-review.component';
import { PayrollProcessCompletedViewComponent } from './payroll-process-completed-view/payroll-process-completed-view.component';
import { PayrollProcessOvertimeListComponent } from './payroll-process-overtime-list/payroll-process-overtime-list.component';
import { PayrollProcessSummaryDetailsComponent } from './payroll-process-summary-details/payroll-process-summary-details.component';
import { PayrollProcessEmployeeSummarydetailsComponent } from './payroll-process-employee-summarydetails/payroll-process-employee-summarydetails.component';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    PayrollProcessListComponent,
    PayrollProcessMethodComponent,
    PayrollProcessViewComponent,
    PayrollProcessCreateContainerComponent,
    PayrollProcessBonusListComponent,
    PayrollProcessBonusCreateComponent,
    PayrollProcessBonusEditComponent,
    PayrollProcessBonusViewComponent,
    PayrollProcessLoanCreateComponent,
    PayrollProcessLoanEditComponent,
    PayrollProcessLoanViewComponent,
    PayrollProcessLeaveListComponent,
    ApprovedLeaveComponent,
    UnApprovedLeaveComponent,
    PayrollProcessListComponent,
    PayrollProcessMethodComponent,
    PayrollProcessViewComponent,
    PayrollProcessCreateContainerComponent,
    PayrollProcessSalaryListComponent,
    PayrollProcessSalaryEditComponent,
    UnMarkedLeaveComponent,
    PayrollProcessAdhocListComponent,
    PayrollProcessLoansAdvancesListComponent,
    PayrollDeferPayementComponent,
    PayrollCreateAdhocPaymentComponent,
    PayrollEditAdhocPaymentComponent,
    PayrollProcessAdhocContainerComponent,
    PayrollViewAdhocPaymentComponent,
    PayrollProcessPreviewListComponent,
    PayrollProcessPreviewSplitComponent,
    PayrollProcessEmployeeContainerComponent,
    PayrollEmployeeLeaveComponent,
    PayrollEmployeeSalaryComponent,
    PayrollEmployeeBonusContainerComponent,
    PayrollEmployeeBonusListComponent,
    PayrollEmployeeLoanAdvancesListComponent,
    PayrollEmployeeCreateBonusComponent,
    PayrollEmployeeEditBonusComponent,
    PayrollEmployeeCreateLoanAdvancesComponent,
    PayrollEmployeeEditLoanAdvancesComponent,
    PayrollEmployeeViewLoanAdvancesComponent,
    PayrollEmployeeViewBonusComponent,
    PayrollCreateAdhocComponent,
    PayrollEditAdhocComponent,
    PayrollViewAdhocComponent,
    PayrollAdhocContainerComponent,
    PayrollAdhocListComponent,
    PayrollLoanAdvanceListComponent,
    PayrollEmployeeReviewComponent,
    PayrollProcessCompletedViewComponent,
    PayrollProcessOvertimeListComponent,
    PayrollProcessSummaryDetailsComponent,
    PayrollProcessEmployeeSummarydetailsComponent,


  ],
  imports: [
    CommonModule,
    PayrollProcessRoutingModule,
    TabsModule.forRoot(),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
    //  NgBootstrapFormValidationModule,
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule,
    TreeModule,
    TreeTableModule,
    TableModule
    
    
    
  ],
 
  providers: [DatePipe,{

    provide: CUSTOM_ERROR_MESSAGES,
    useValue: customErrorMessages,
    multi: true
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PayrollProcessModule { }
