import { Component, OnInit } from '@angular/core';
import { PayslipComponentsCreateComponent } from '../payslip-components-create/payslip-components-create.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { PayslipComponentsService } from '../payslip-components-service';
import { PayslipComponents } from '../payslip-components.model';
import { PayslipComponentsViewComponent } from '../payslip-components-view/payslip-components-view.component';
import { PayslipComponentsEditComponent } from '../payslip-components-edit/payslip-components-edit.component';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';

@Component({
  selector: 'hrms-payslip-components-list',
  templateUrl: './payslip-components-list.component.html',
  styleUrls: ['./payslip-components-list.component.scss']
})
export class PayslipComponentsListComponent implements OnInit {
  payslipComponentDetails:any=[];
  constructor(
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private payslipComponentsService: PayslipComponentsService,
  ) { }

  ngOnInit(): void {
    this.getAll()
  }
  getAll() {
    debugger
    this.payslipComponentsService.getAll()
      .subscribe((result) => {
        this.payslipComponentDetails = result
       
      })
  }
  openCreate() {
    debugger
    const modalRef = this.modalService.open(PayslipComponentsCreateComponent,
      { centered: true, backdrop: 'static' });
    // modalRef.componentInstance.code = this.Codes;
    // modalRef.componentInstance.name = this.Names;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAll()
      }
    });
  }


  openEdit(listItem) {
    const modalRef = this.modalService.open(PayslipComponentsEditComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.listItem = listItem;
    // modalRef.componentInstance.code = this.Codes;
    // modalRef.componentInstance.name = this.Names;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAll()
      }
    });
  }
  openView(listItem: PayslipComponents) {
    const modalRef = this.modalService.open(PayslipComponentsViewComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.listItem = listItem;
    // modalRef.componentInstance.code = this.Codes;
    // modalRef.componentInstance.name = this.Names;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAll();
      }
    });
  }

  delete(listItem: PayslipComponents) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.payslipComponentsService.delete(listItem.id).subscribe(() => {
          this.toastr.showSuccessMessage('Payslip component detail deleted successfully!');
          this.getAll()
        });
      }
    });
  }

}
