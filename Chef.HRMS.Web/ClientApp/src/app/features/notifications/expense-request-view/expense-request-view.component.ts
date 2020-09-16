import { Component, OnInit, Input } from '@angular/core';
import { UnitType } from 'src/app/models/common/types/unittype';
import { ExpenseRequest } from '@features/employee-expense/expense-request.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ExpenseDocumentService } from '@features/employee-expense/expense-document.service';
import { ExpenseRequestService } from '@features/employee-expense/expense-request.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-expense-request-view',
  templateUrl: './expense-request-view.component.html',
  styles: [
  ]
})
export class ExpenseRequestViewComponent implements OnInit {

  mileageFormula = '';
  mileageUnitTypes = UnitType;
  downloadPath;

  @Input() expenseRequest: ExpenseRequest;
    currentUserId: any;
  constructor(
    public modalService: NgbModal,
    private expenseRequestService: ExpenseRequestService,
    private expenseDocumentService: ExpenseDocumentService,
    private toastr: ToasterDisplayService,
    private sanitizer: DomSanitizer,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    if (this.expenseRequest.mileageCovered > 0) {
      this.mileageFormula = '(' + this.expenseRequest.currency + ' ' + this.expenseRequest.mileageRate + ' x ' + this.expenseRequest.mileageCovered + ')'
    }

    if (this.expenseRequest.isReceiptAttached) {
      this.expenseDocumentService.getDocumentById(this.expenseRequest.id).subscribe((result: any) => {
        result.path = result.path.replace('c:', 'http://127.0.0.1:8887');
        this.downloadPath = this.sanitizer.bypassSecurityTrustUrl(result.path);
      },
        error => {
          console.error(error);
        });
    }
  }
  onSubmit() {
    let addForm = this.expenseRequest;
    addForm = {
      ...addForm,
      requestStatus: 3,
      approvedBy: this.currentUserId,
      approvedDate: new Date(Date.now()),
      modifiedBy: this.currentUserId,
      modifiedDate: new Date(Date.now())
    };
    this.expenseRequestService.update(addForm).subscribe((result) => {
      if (result) {
        this.toastr.showSuccessMessage('Leave Request submitted successfully');
        this.activeModal.close('submit');
      }
    });
  }
  reject() {
    let addForm = this.expenseRequest;
    addForm = {
      ...addForm,
      requestStatus: 5,
      approvedBy: this.currentUserId,
      approvedDate: new Date(Date.now()),
      modifiedBy: this.currentUserId,
      modifiedDate: new Date(Date.now())
    };
    this.expenseRequestService.update(addForm).subscribe((result) => {
      if (result) {
        this.toastr.showSuccessMessage('Leave Request rejected successfully');
        this.activeModal.close('submit');
      }
    });
  }

}
