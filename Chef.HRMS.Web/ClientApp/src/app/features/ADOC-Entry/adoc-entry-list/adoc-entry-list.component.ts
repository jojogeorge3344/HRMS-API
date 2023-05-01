
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { AdocEntryCreateComponent } from '../adoc-entry-create/adoc-entry-create.component';
import { AdocEntryEditComponent } from '../adoc-entry-edit/adoc-entry-edit.component';
import { AdocEntryViewComponent } from '../adoc-entry-view/adoc-entry-view.component';

@Component({
  selector: 'hrms-adoc-entry-list',
  templateUrl: './adoc-entry-list.component.html',
  styleUrls: ['./adoc-entry-list.component.scss']
})
export class AdocEntryListComponent implements OnInit {
  Codes: string[];
  Names: string[];

  documentTypeDetails;

  constructor(
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,

  ) { }

  ngOnInit(): void {
    // this.getDocumentTypelist()
   
  }


  openCreate(){
    debugger
    const modalRef = this.modalService.open(AdocEntryCreateComponent,
      {size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name= this.Names;
    modalRef.result.then((result) => {
        if (result == 'submit') {
          // this.getDocumentTypelist()
        }
    });  
  }


  openEdit(documentTypeDetails: DocumentType) {
    const modalRef = this.modalService.open(AdocEntryEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.documentTypeDetails= documentTypeDetails;
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name = this.Names;
    console.log('code',this.Codes);
    console.log('name',this.Names);
 
    modalRef.result.then((result) => {
      if (result == 'submit') {
        // this.getDocumentTypelist()
      }
    });
  }
  openView(documentTypeDetails: DocumentType) {
    const modalRef = this.modalService.open(AdocEntryViewComponent,
      { size: 'lg',centered: true, backdrop: 'static' });

    modalRef.componentInstance.documentTypeDetails = documentTypeDetails;
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name = this.Names;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        // this.getDocumentTypelist();
      }
    });
  }

delete(documentTypeDetails: DocumentType) {
  const modalRef = this.modalService.open(ConfirmModalComponent,
    { centered: true, backdrop: 'static' });
  modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the Document type ${documentTypeDetails.name}`;
  modalRef.result.then((userResponse) => {
    // if (userResponse == true) {
    //   this.documentTypeService.delete(documentTypeDetails.id).subscribe(() => {
    //     this.toastr.showSuccessMessage('Document Type deleted successfully!');
    //     this.getDocumentTypelist()
    //   });
    // }
  });
}
}
