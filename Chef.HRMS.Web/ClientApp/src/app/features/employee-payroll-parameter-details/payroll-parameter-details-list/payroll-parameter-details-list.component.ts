import { Component, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { PayrollParameterDetails } from '../payroll-parameter-details.model';
import { PayrollParameterDetailsComponentService } from '../payroll-parameter-details.component.service';
import { PayrollParameterDetailsCreateComponent } from '../payroll-parameter-details-create/payroll-parameter-details-create.component';
import { PayrollParameterDetailsEditComponent } from '../payroll-parameter-details-edit/payroll-parameter-details-edit.component';
import { PayrollParameterDetailsViewComponent } from '../payroll-parameter-details-view/payroll-parameter-details-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { UserVariableType } from '@settings/payroll/user-variable/user-variable.model';
@Component({
  selector: 'hrms-payroll-parameter-details-list',
  templateUrl: './payroll-parameter-details-list.component.html',
  styleUrls: ['./payroll-parameter-details-list.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class PayrollParameterDetailsListComponent implements OnInit {

  Codes: string[];
  Names: string[];
  UserVariableType = UserVariableType;

  payrollParameterDetailsList: any[]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public modalService: NgbModal,
    private payrollParameterDetailsService: PayrollParameterDetailsComponentService,
    private toastr: ToasterDisplayService,

  ) { }

  ngOnInit(): void {
    this.getAllList()
  }


  openCreate() {
    this.router.navigate(["./create/"], { relativeTo: this.route.parent });
  }


  getAllList() {
    debugger
    this.payrollParameterDetailsService.getAll().subscribe(result => {
      this.payrollParameterDetailsList = result;
    },
      // error => {
      //   console.error(error);
      //   this.toastr.showErrorMessage('Unable to fetch the Payroll Parameter Details List');
      // }
    );
  }

  openEdit(id) {
    this.router.navigate([

      "./" +

      id +

      "/edit/"

    ], { relativeTo: this.route.parent });
  }

  openView(id) {
    this.router.navigate([

      "./" +

      id +

      "/view/"

    ], { relativeTo: this.route.parent });

  }

  openProcess(details) {
    if(details.status==2){
      details.status = 3;
      this.payrollParameterDetailsService.update(details).subscribe((result) => {
        if (result) {
          this.toastr.showSuccessMessage('Employee Payroll Parameter Details Successfully Send For Processing');
          this.router.navigate(['/employee-payroll-parameter-details']);
        }
      },
        );
    }else if(details.status==3){
      this.toastr.showErrorMessage('Employee Payroll Parameter Details already processed');
    }else{
      details.status = 3;
      this.payrollParameterDetailsService.update(details).subscribe((result) => {
        if (result) {
          this.toastr.showSuccessMessage('Employee Payroll Parameter Details Successfully Send For Processing');
          this.router.navigate(['/employee-payroll-parameter-details']);
        }
      },
        );
    }
   
   }

  delete(details) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the item?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.payrollParameterDetailsService.delete(details.id).subscribe(() => {
          this.toastr.showSuccessMessage('payroll parameter detail deleted successfully!');
          this.getAllList()
        });
      }
    });
  }

}
