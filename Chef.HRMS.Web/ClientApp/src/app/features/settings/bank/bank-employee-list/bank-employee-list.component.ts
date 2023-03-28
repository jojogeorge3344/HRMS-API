import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { BankEmployeeCreateComponent } from '../bank-employee-create/bank-employee-create.component';
import { BankEmployeeEditComponent } from '../bank-employee-edit/bank-employee-edit.component';
import { BankEmployeeViewComponent } from '../bank-employee-view/bank-employee-view.component';
import { BankService } from '../bank-employee.service';
import { BankGroup } from '../bank-employee.model';

@Component({
  selector: 'hrms-bank-employee-list',
  templateUrl: './bank-employee-list.component.html',
  styleUrls: ['./bank-employee-list.component.scss']
})
export class BankEmployeeListComponent implements OnInit {

  religionDetails: BankGroup[] = [];
  Codes: string[];
  Names: string[];
  Address:string[];

  constructor(
    public modalService: NgbModal,
    private bankService:BankService,
    private toastr: ToasterDisplayService,
  ) { }

  ngOnInit(): void {
    this.getReligionlist()
  }

  getReligionlist() {
    this.bankService.getAll().subscribe(result => {
      this.religionDetails = result;
      this.religionDetails=this.religionDetails.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
      this.Codes = this.religionDetails.map(a => a.code.toLowerCase());
      this.Names = this.religionDetails.map(a => a.name.toLowerCase());
      

    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Religion List Details');
    });
  }
  openCreate() {
    const modalRef = this.modalService.open(BankEmployeeCreateComponent,
      {size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name= this.Names;
    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getReligionlist()
        }
    });  
  }
  openEdit(relDetails: BankGroup) {
    const modalRef = this.modalService.open(BankEmployeeEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.relDetails= relDetails;
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name = this.Names;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getReligionlist()
      }
    });
  }
  openView(relDetails: BankGroup) {
    const modalRef = this.modalService.open(BankEmployeeViewComponent,
      { size: 'lg',centered: true, backdrop: 'static' });

    modalRef.componentInstance.relDetails = relDetails;
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name = this.Names;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getReligionlist();
      }
    });
  }

delete(relDetails: BankGroup) {
  const modalRef = this.modalService.open(ConfirmModalComponent,
    { centered: true, backdrop: 'static' });
  modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the Religion ${relDetails.name}`;
  modalRef.result.then((userResponse) => {
    if (userResponse == true) {
      this.bankService.delete(relDetails.id).subscribe(() => {
        this.toastr.showSuccessMessage('Religion deleted successfully!');
        this.getReligionlist()
      });
    }
  });
}
}



