import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentReturnType } from 'src/app/models/common/types/documentReturnType';
import { DocumentUpdateType } from 'src/app/models/common/types/documentUpdateType';
import { DocumentType } from 'src/app/models/common/types/documentType';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { DocumentTypeService } from '../document-type.service';

@Component({
  selector: 'hrms-document-type-view',
  templateUrl: './document-type-view.component.html',
  styleUrls: ['./document-type-view.component.scss']
})
export class DocumentTypeViewComponent implements OnInit {
  
  @Input() documentTypeDetails;
  documentTypeValue;
  documentReturnTypeValue;
  documentUpdateTypeValue;

  constructor(
    public activeModal: NgbActiveModal,

  ) { }

  ngOnInit(): void {
    debugger
    console.log('dtls',this.documentTypeDetails);
    this.documentTypeValue=DocumentType[this.documentTypeDetails.documentType]
    this.documentReturnTypeValue=DocumentReturnType[this.documentTypeDetails.documentReturnType]
    this.documentUpdateTypeValue=DocumentUpdateType[this.documentTypeDetails.documentUpdateType]
  
  }
}
