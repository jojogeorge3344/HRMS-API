import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { UserVariableGroup } from './user-variable.model';
import { UserVariableService } from './user-variable.service';
import { UserVariableCreateComponent } from '../user-variable-create/user-variable-create.component';
import { UserVariableEditComponent } from '../user-variable-edit/user-variable-edit.component';
import { UserVariableViewComponent } from '../user-variable-view/user-variable-view.component';

@Component({
  selector: 'hrms-user-variable-list',
  templateUrl: './user-variable-list.component.html',
  styleUrls: ['./user-variable-list.component.scss']
})
export class UserVariableListComponent implements OnInit {

  userVariableDetails: UserVariableGroup[] = [];
  Codes: string[];
  Names: string[];

  constructor(
    public modalService: NgbModal,
    private userVariableService:UserVariableService,
    private toastr: ToasterDisplayService,
  ) { }

  ngOnInit(): void {
    this.getReligionlist()
  }

  getReligionlist() {
    this.userVariableService.getAll().subscribe(result => {
      this.userVariableDetails = result;
      this.userVariableDetails=this.userVariableDetails.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
      this.Codes = this.userVariableDetails.map(a => a.code.toLowerCase());
      this.Names = this.userVariableDetails.map(a => a.name.toLowerCase());
      

    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Religion List Details');
    });
  }
  openCreate() {
    const modalRef = this.modalService.open(UserVariableCreateComponent,
      {size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name= this.Names;
    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getReligionlist()
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
        this.getReligionlist()
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
        this.getReligionlist();
      }
    });
  }

delete(userDetails: UserVariableGroup) {
  const modalRef = this.modalService.open(ConfirmModalComponent,
    { centered: true, backdrop: 'static' });
  modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the Religion ${userDetails.name}`;
  modalRef.result.then((userResponse) => {
    if (userResponse == true) {
      this.userVariableService.delete(userDetails.id).subscribe(() => {
        this.toastr.showSuccessMessage('Religion deleted successfully!');
        this.getReligionlist()
      });
    }
  });
}

}



