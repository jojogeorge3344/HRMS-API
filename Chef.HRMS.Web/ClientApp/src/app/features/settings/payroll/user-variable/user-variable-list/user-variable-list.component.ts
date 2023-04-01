import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { UserVariableGroup } from './user-variable.model';
import { UserVariableService } from './user-variable.service';
import { UserVariableCreateComponent } from '../user-variable-create/user-variable-create.component';
import { UserVariableEditComponent } from '../user-variable-edit/user-variable-edit.component';
import { UserVariableViewComponent } from '../user-variable-view/user-variable-view.component';
import { SystemVariableService } from '@settings/payroll/system-variable-container/system-variable/system-service';
import { SystemVariableComponent } from '@settings/payroll/system-variable-container/system-variable/system-variable.component';

@Component({
  selector: 'hrms-user-variable-list',
  templateUrl: './user-variable-list.component.html',
  styleUrls: ['./user-variable-list.component.scss']
})
export class UserVariableListComponent implements OnInit {

  userVariableDetails: UserVariableGroup[] = [];
  Codes: string[];
  Names: string[];
  systemVariableDetails: UserVariableGroup[];

  constructor(
    public modalService: NgbModal,
    private userVariableService:UserVariableService,
    private toastr: ToasterDisplayService,
    private systemVariableService:SystemVariableService,
  ) { }

  ngOnInit(): void {
    this.getUserlist()
    this.getSystemlist()
  }

  getUserlist() {
    this.userVariableService.getAll().subscribe(result => {
      this.userVariableDetails = result;
      this.userVariableDetails=this.userVariableDetails.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
      this.Codes = this.userVariableDetails.map(a => a.code.toLowerCase());
      this.Names = this.userVariableDetails.map(a => a.name.toLowerCase());
      

    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the User Variable List Details');
    });
  }
  getSystemlist() {
    this.systemVariableService.getAll().subscribe(result => {
      this.systemVariableDetails = result;
      this.systemVariableDetails=this.systemVariableDetails.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
      // this.Codes = this.systemVariableDetails.map(a => a.code.toLowerCase());
      // this.Names = this.systemVariableDetails.map(a => a.name.toLowerCase());
      

    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the User Variable List Details');
    });
  }
  
  openCreate() {
    const modalRef = this.modalService.open(UserVariableCreateComponent,
      {size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name= this.Names;
    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getUserlist()
        }
    });  
  }
  openEdit(userDetails: UserVariableGroup) {
    const modalRef = this.modalService.open(UserVariableEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.userDetails= userDetails;
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name = this.Names;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getUserlist()
      }
    });
  }
  openView(userDetails: UserVariableGroup) {
    const modalRef = this.modalService.open(UserVariableViewComponent,
      { size: 'lg',centered: true, backdrop: 'static' });

    modalRef.componentInstance.userDetails = userDetails;
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name = this.Names;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getUserlist();
      }
    });
  }

delete(userDetails: UserVariableGroup) {
  const modalRef = this.modalService.open(ConfirmModalComponent,
    { centered: true, backdrop: 'static' });
  modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the User Variable ${userDetails.name}`;
  modalRef.result.then((userResponse) => {
    if (userResponse == true) {
      this.userVariableService.delete(userDetails.id).subscribe(() => {
        this.toastr.showSuccessMessage('User Variable deleted successfully!');
        this.getUserlist()
      });
    }
  });
}
openEditSystem(systemDetails: UserVariableGroup) {
  const modalRef = this.modalService.open(SystemVariableComponent,
    { size: 'lg', centered: true, backdrop: 'static' });
  modalRef.componentInstance.systemDetails= systemDetails;
  // modalRef.componentInstance.code = this.Codes;
  // modalRef.componentInstance.name = this.Names;

  modalRef.result.then((result) => {
    if (result == 'submit') {
      this.getSystemlist()
    }
  });
}

}



