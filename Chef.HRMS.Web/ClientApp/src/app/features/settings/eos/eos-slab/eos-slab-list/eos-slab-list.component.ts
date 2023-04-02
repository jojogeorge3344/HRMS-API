import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { EosSlabGroup } from '../eos-slab.model';
import { EosSlabService } from '../eos-slab.service';
import { EosSlabCreateComponent } from '../eos-slab-create/eos-slab-create.component';
import { EosSlabEditComponent } from '../eos-slab-edit/eos-slab-edit.component';

@Component({
  selector: 'hrms-eos-slab-list',
  templateUrl: './eos-slab-list.component.html',
  styleUrls: ['./eos-slab-list.component.scss']
})
export class EosSlabListComponent implements OnInit {

  
  eosSlabDetails: EosSlabGroup[] = [];

  constructor(
    public modalService: NgbModal,
    private eosSlabService:EosSlabService,
    private toastr: ToasterDisplayService,
  ) { }

  ngOnInit(): void {
    this.getEoslist()
  }

  getEoslist() {
    this.eosSlabService.getAll().subscribe(result => {
      this.eosSlabDetails = result;
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the EosSlab List Details');
    });
  }
  openCreate() {
    const modalRef = this.modalService.open(EosSlabCreateComponent,
      {size: 'xl', centered: true, backdrop: 'static' });
    // modalRef.componentInstance.code = this.Codes;
    // modalRef.componentInstance.name= this.Names;
    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getEoslist()
        }
    });  
  }
  openEdit(relDetails: EosSlabGroup) {
    const modalRef = this.modalService.open(EosSlabEditComponent,
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
  // openView(relDetails: EosSlabGroup) {
  //   const modalRef = this.modalService.open(EosViewComponent,
  //     { size: 'lg',centered: true, backdrop: 'static' });

  //   modalRef.componentInstance.relDetails = relDetails;
  //   // modalRef.componentInstance.code = this.Codes;
  //   // modalRef.componentInstance.name = this.Names;

  //   modalRef.result.then((result) => {
  //     if (result == 'submit') {
  //       this.getEoslist();
  //     }
  //   });
  // }

delete(relDetails: EosSlabGroup) {
  const modalRef = this.modalService.open(ConfirmModalComponent,
    { centered: true, backdrop: 'static' });
  modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the Eos ${relDetails.bfName}`;
  modalRef.result.then((userResponse) => {
    if (userResponse == true) {
      this.eosSlabService.delete(relDetails.id).subscribe(() => {
        this.toastr.showSuccessMessage('Eos deleted successfully!');
        this.getEoslist()
      });
    }
  });
}


}









