import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { DocumentTypeService } from '../document-type.service';
import { DocumentTypeCreateComponent } from '../document-type-create/document-type-create.component';
import { DocumentTypeEditComponent } from '../document-type-edit/document-type-edit.component';
import { DocumentTypeViewComponent } from '../document-type-view/document-type-view.component';
import { DocumentType } from '../document-type.model';

@Component({
  selector: 'hrms-document-type-list',
  templateUrl: './document-type-list.component.html',
  styleUrls: ['./document-type-list.component.scss']
})
export class DocumentTypeListComponent implements OnInit {
  Codes: string[];
  Names: string[];

  documentTypeDetails;

  constructor(
    public modalService: NgbModal,
    private documentTypeService:DocumentTypeService,
    private toastr: ToasterDisplayService,

  ) { }

  ngOnInit(): void {
    this.getDocumentTypelist()
  }


  openCreate(){
    const modalRef = this.modalService.open(DocumentTypeCreateComponent,
      {size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name= this.Names;
    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getDocumentTypelist()
        }
    });  
  }

  getDocumentTypelist(){
    debugger
      this.documentTypeService.getAll().subscribe(result => {
        this.documentTypeDetails = result;
        this.documentTypeDetails=this.documentTypeDetails.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        this.Names = this.documentTypeDetails.map(a => a.name.toLowerCase());
      },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Religion List Details');
      });
    }

  openEdit(documentTypeDetails: DocumentType) {
    const modalRef = this.modalService.open(DocumentTypeEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.documentTypeDetails= documentTypeDetails;
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name = this.Names;
    console.log('code',this.Codes);
    console.log('name',this.Names);
 
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getDocumentTypelist()
      }
    });
  }
  openView(documentTypeDetails: DocumentType) {
    const modalRef = this.modalService.open(DocumentTypeViewComponent,
      { size: 'lg',centered: true, backdrop: 'static' });

    modalRef.componentInstance.documentTypeDetails = documentTypeDetails;
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name = this.Names;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getDocumentTypelist();
      }
    });
  }

delete(documentTypeDetails: DocumentType) {
  const modalRef = this.modalService.open(ConfirmModalComponent,
    { centered: true, backdrop: 'static' });
  modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the Document type ${documentTypeDetails.name}`;
  modalRef.result.then((userResponse) => {
    if (userResponse == true) {
      this.documentTypeService.delete(documentTypeDetails.id).subscribe(() => {
        this.toastr.showSuccessMessage('Document Type deleted successfully!');
        this.getDocumentTypelist()
      });
    }
  });
}
}
