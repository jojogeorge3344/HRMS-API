import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ExpenseRequest } from '../expense-request.model';
import { UnitType } from 'src/app/models/common/types/unittype';
import { DomSanitizer } from '@angular/platform-browser';
import { ExpenseDocumentService } from "../expense-document.service";

@Component({
  selector: 'hrms-expense-request-view',
  templateUrl: './expense-request-view.component.html'
})
export class ExpenseRequestViewComponent implements OnInit {

  mileageFormula = "";
  mileageUnitTypes = UnitType;
  downloadPath;
  
  @Input() expenseRequest: ExpenseRequest;

  constructor(public modalService: NgbModal,
    private expenseDocumentService: ExpenseDocumentService,
    private sanitizer: DomSanitizer,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if(this.expenseRequest.mileageCovered > 0) {
      this.mileageFormula = "(" + this.expenseRequest.currency + " " + this.expenseRequest.mileageRate + " x " + this.expenseRequest.mileageCovered + ")"
    }

    if(this.expenseRequest.isReceiptAttached) {
      this.expenseDocumentService.getDocumentById(this.expenseRequest.id).subscribe((result:any) => {
        result.path = result.path.replace("c:", "http://127.0.0.1:8887");
        this.downloadPath = this.sanitizer.bypassSecurityTrustUrl(result.path);   
      },
      error => {
        console.error(error);
      });      
    }
  }
}
