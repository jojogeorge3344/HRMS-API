import { Component, OnInit } from '@angular/core';
import { LoanRequestService } from '../loan-request.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { LoanRequestEditComponent } from '../loan-request-edit/loan-request-edit.component';
import { LoanRequestCreateComponent } from '../loan-request-create/loan-request-create.component';
import { LoanType } from '../../../models/common/types/loantype';
import { PaymentType } from '../../../models/common/types/paymenttype';
import { LoanRequest } from '../loan-request.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { LoanRequestViewComponent } from '../loan-request-view/loan-request-view.component';
import { LoanRequestPrintComponent } from '../loan-request-print/loan-request-print.component';
import { RequestStatus } from 'src/app/models/common/types/requeststatustype';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '@features/employee/employee.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeSalaryConfigurationService } from '@features/employee/employee-salary/employee-salary-configuration.service';
import { LoanSettingsService } from '@settings/loan/loan-settings.service';
import { formatDate } from '@angular/common';

@Component({
  templateUrl: './loan-request-list.component.html',
  styleUrls:['./loan-request-list.component.scss']
})
export class LoanRequestListComponent implements OnInit {

  public loanRequests: any = [];

  loanTypes = LoanType;
  paymentTypes = PaymentType;
  requestTypes = RequestStatus;
  minDate;
  nextLoanNumber: number;
  employeeList: any[];
  currentUserId: any;
  salaryRange: any;
  searchKey: any;
  searchloanRequests: any;

  constructor(
    http: HttpClient,
    private loanRequestService: LoanRequestService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private employeeSalaryConfigurationService: EmployeeSalaryConfigurationService,
    private loanSettingsService: LoanSettingsService,
    ) {
      const current = new Date();
      this.minDate = {
        year: current.getFullYear(),
        month: current.getMonth() + 1,
        day: current.getDate()
      };
     }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getloanRequests(); 
    this.getEmployeeList()
    this.getSalaryRange()
  }

  getloanRequests() {
    this.loanRequestService.getLoanId().subscribe(res => {
      this.nextLoanNumber = res;
    });
    this.loanRequestService.getAll().subscribe(result => {
      this.loanRequests = result;
      this.searchloanRequests=result
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the loan requests');
      });
  }

  openCreateLoanRequest() {
    let totalSalary=0

    this.employeeSalaryConfigurationService.getSalaryConfigurationByEmployee(this.currentUserId).subscribe((res) => {
      res.forEach(element => {

        totalSalary = totalSalary + Number(element.yearlyAmount);

    });

    const current = new Date();
    let loginUser=this.employeeList.filter(x=>x.id==this.currentUserId)
    var myDate = new Date(new Date(loginUser[0].dateOfJoin).getTime()+(25*24*60*60*1000));

    if( new Date(current)<=new Date(myDate) && this.router.url=='/my-loan'){
      
      this.toastr.showWarningMessage("Loan Is Eligible For Only After 25 days Of Joining Date")
    }
    else if(this.salaryRange>totalSalary && this.router.url=='/my-loan'){
      this.toastr.showWarningMessage("Loan Is Eligible For Only Above" + ' ' + this.salaryRange)
    }
    else{
    const modalRef = this.modalService.open(LoanRequestCreateComponent,
          { size: 'lg', centered: true, backdrop: 'static' });
    
        modalRef.componentInstance.loanTypes = this.loanTypes;
        modalRef.componentInstance.paymentTypes = this.paymentTypes;
        modalRef.componentInstance.nextLoanNumber = this.nextLoanNumber;
       
        modalRef.result.then((result) => {
          if (result == 'submit') {
            this.getloanRequests();
          }
        });
    }
 
  })

  }

  openEditLoanRequest(id: number,isApproved:boolean) {
    const modalRef = this.modalService.open(LoanRequestEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.loanTypes = this.loanTypes;
    modalRef.componentInstance.paymentTypes = this.paymentTypes;
    modalRef.componentInstance.loanId = id;
    modalRef.componentInstance.isApproved = isApproved
    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getloanRequests();
        }
    });
  }
  openViewLoanRequest(id: number) {
    const modalRef = this.modalService.open(LoanRequestViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.loanTypes = this.loanTypes;
    modalRef.componentInstance.paymentTypes = this.paymentTypes;
    modalRef.componentInstance.loanId = id;

    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getloanRequests();
        }
    });
  }
  openPrintLoanRequest(id: number) {
    debugger
    // const modalRef = this.modalService.open(LoanRequestPrintComponent,
    //   { size: 'lg', centered: true, backdrop: 'static',windowClass:'tablealign' });

    // modalRef.componentInstance.loanTypes = this.loanTypes;
    // modalRef.componentInstance.paymentTypes = this.paymentTypes;
    // modalRef.componentInstance.loanId = id;

    // modalRef.result.then((result) => {
    //     if (result == 'submit') {
    //       this.getloanRequests();
    //     }
    // });

     
   this.router.navigate(["./print/" + id ], {
    
    relativeTo: this.route.parent,
   
   });
  }
  isDisabled(request) {
   if(request.status == 4){
     return true;
   }  
  }
  deleteLoanRequest(loanRequest: LoanRequest) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to cancel the Loan Request ${loanRequest.loanNo}?`;
    modalRef.result.then((userResponse) => {
        if (userResponse == true) {
          this.loanRequestService.delete(loanRequest.id).subscribe(() => {
            this.toastr.showSuccessMessage('The Loan Request cancelled successfully!');
            this.getloanRequests();
          });
        }
    });
  }
  isApplied(request) {
    return request == this.requestTypes.Draft;
  }
  getEmployeeList(){
    this.employeeService.getAll()
      .subscribe((result) => {
      this.employeeList = result;
    })
  }
  getSalaryRange(){
    this.loanSettingsService.get().subscribe(res=>{
    
      this.salaryRange=res.salaryFromRange
  
    })
  }
  searchLoan(): void {
    this.loanRequests = this.searchloanRequests.filter(
      (x) =>
        x.loanNo?.toLowerCase().includes(this.searchKey.toLowerCase()) ||
        (formatDate(x.requestedDate, 'dd-MM-yyyy', 'en-Us')).includes(this.searchKey) ||
        (formatDate(x.expectedOn, 'dd-MM-yyyy', 'en-Us')).includes(this.searchKey) ||
        x.loanAmount.toString().includes(this.searchKey)||
        (this.loanTypes[x.loanType]).toLowerCase().includes(this.searchKey.toLowerCase()) ||
        (this.paymentTypes[x.paymentType]).toLowerCase().includes(this.searchKey.toLowerCase())||
        (this.requestTypes[x.status]).toLowerCase().includes(this.searchKey.toLowerCase())||
         x.repaymentTerm.toString().includes(this.searchKey)||
         x.emiStartsFromMonth.toString().includes(this.searchKey)||
         x.emiStartsFromYear.toString().includes(this.searchKey) ||
         (x.emiStartsFromMonth?.toString() + " / " + x.emiStartsFromYear?.toString()).includes(this.searchKey)
    );
  }
}
