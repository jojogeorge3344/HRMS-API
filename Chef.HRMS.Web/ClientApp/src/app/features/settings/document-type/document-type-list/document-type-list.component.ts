import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { DocumentTypeService } from '../document-type.service';
import { DocumentTypeCreateComponent } from '../document-type-create/document-type-create.component';

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
    
  }

}
