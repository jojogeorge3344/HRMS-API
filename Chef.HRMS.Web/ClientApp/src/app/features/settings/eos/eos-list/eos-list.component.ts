import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { EosGroup } from '../eos.model';
import { EosService } from '../eos.service';
import { EosCreateComponent } from '../eos-create/eos-create.component';
import { EosEditComponent } from '../eos-edit/eos-edit.component';
import { EosViewComponent } from '../eos-view/eos-view.component';

@Component({
  selector: 'hrms-eos-list',
  templateUrl: './eos-list.component.html',
  styleUrls: ['./eos-list.component.scss']
})
export class EosListComponent implements OnInit {

  eosDetails: EosGroup[] = [];
  Codes: string[];
  Names: string[];

  constructor(
    public modalService: NgbModal,
    private eosService:EosService,
    private toastr: ToasterDisplayService,
  ) { }

  ngOnInit(): void {
    this.getEoslist()
  }

  getEoslist() {
    this.eosService.getAll().subscribe(result => {
      this.eosDetails = result;
      this.eosDetails=this.eosDetails.sort((a, b) => a.bfName.toLowerCase().localeCompare(b.bfName.toLowerCase()))
      // this.eosDetails=this.eosDetails.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
      // this.Codes = this.eosDetails.map(a => a.code.toLowerCase());
      // this.Names = this.eosDetails.map(a => a.name.toLowerCase());
      

    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Eos List Details');
    });
  }
  openCreate() {
    const modalRef = this.modalService.open(EosCreateComponent,
      {size: 'xl', centered: true, backdrop: 'static' });
    // modalRef.componentInstance.code = this.Codes;
    // modalRef.componentInstance.name= this.Names;
    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getEoslist()
        }
    });  
  }
  openEdit(relDetails: EosGroup) {
    const modalRef = this.modalService.open(EosEditComponent,
      { size: 'xl', centered: true, backdrop: 'static' });
    modalRef.componentInstance.relDetails= relDetails;
    // modalRef.componentInstance.code = this.Codes;
    // modalRef.componentInstance.name = this.Names;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getEoslist()
      }
    });
  }
  openView(relDetails: EosGroup) {
    const modalRef = this.modalService.open(EosViewComponent,
      { size: 'xl',centered: true, backdrop: 'static' });

    modalRef.componentInstance.relDetails = relDetails;
    // modalRef.componentInstance.code = this.Codes;
    // modalRef.componentInstance.name = this.Names;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getEoslist();
      }
    });
  }

delete(relDetails: EosGroup) {
  const modalRef = this.modalService.open(ConfirmModalComponent,
    { centered: true, backdrop: 'static' });
  modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the Eos ${relDetails.bfName}`;
  modalRef.result.then((userResponse) => {
    if (userResponse == true) {
      this.eosService.delete(relDetails.id).subscribe(() => {
        this.toastr.showSuccessMessage('Eos deleted successfully!');
        this.getEoslist()
      });
    }
  });
}

}




