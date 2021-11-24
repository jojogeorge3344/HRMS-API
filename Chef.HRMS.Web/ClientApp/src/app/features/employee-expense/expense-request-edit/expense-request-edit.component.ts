import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

import { ExpenseRequestService } from '../expense-request.service';
import { ExpenseConfigurationService } from '@settings/expense/expense-configuration/expense-configuration.service';
import { ExpenseDocumentService } from '../expense-document.service';
import { DocumentService } from '@shared/services/document.service';
import { DocumentUploadService } from '@shared/services/document-upload.service';

import { ExpenseRequest } from './../expense-request.model';
import { ExpenseConfiguration } from '@settings/expense/expense-configuration/expense-configuration.model';
import { Document } from '@shared/models/document';

import { UnitType } from 'src/app/models/common/types/unittype';

import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';


@Component({
  selector: 'hrms-expense-request-edit',
  templateUrl: './expense-request-edit.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})

export class ExpenseRequestEditComponent implements OnInit {
  editForm: FormGroup;
  selectedExpenseType: ExpenseConfiguration;

  documentToUpload: File = null;
  documentPath: string;
  documentSave: FormData = null;
  expenseRequestDocument;
  document: Document;
  expenseDocumentId: number;

  companyName: string;
  branchName: string;
  directoryName: string;
  fileName = '';

  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;

  isReceiptRequired = false;
  isReceiptUpdated = false;
  isMileageCategory = false;

  mileageUnitTypes = UnitType;

  mileageFormula: string;
  mileageUnit: string;
  maxLimit = 0;
  currentUserId: number;

  @Input() expenseRequest: ExpenseRequest;
  @Input() expenseConfigurationId: number;
  @Input() expenseRequestNames: string[];

  @ViewChild('expenseDate') datePicker: any;

  constructor(
    private expenseRequestService: ExpenseRequestService,
    private expenseConfigurationService: ExpenseConfigurationService,
    private documentService: DocumentService,
    private documentUploadService: DocumentUploadService,
    private expenseDocumentService: ExpenseDocumentService,
    public modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.getExpenseConfiguration();
  }

  getExpenseConfiguration() {
    this.expenseConfigurationService.get(this.expenseConfigurationId).subscribe((result: any) => {
      this.selectedExpenseType = result;
      if (this.selectedExpenseType) {
        this.setupMileageFields();
        this.setMaxLimit();
        this.onChanges();
        this.initialize();
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the expense configuration');
      });
  }

  initialize() {
    this.isReceiptRequired = this.selectedExpenseType.isProofRequired;

    this.editForm.patchValue(this.expenseRequest);
    this.editForm.patchValue({ expenseDate: new Date(this.expenseRequest.expenseDate) });

    this.setExpenseDate();
    this.setDocumentPath();

    if (this.expenseRequest.isReceiptAttached) {
      this.setDocumentFields();
    }
  }

  onChanges(): void {
    this.editForm.get('amount').valueChanges.subscribe(value => {
      if (this.selectedExpenseType.isCommentRequired) {
        if (value > this.selectedExpenseType.maximumLimitComment) {
          this.editForm.get('comment').setValidators([Validators.required, Validators.maxLength(250)]);
        } else {
          this.editForm.get('comment').setValidators([Validators.maxLength(250)]);
        }
        this.editForm.get('comment').updateValueAndValidity();
      }

      if (this.selectedExpenseType.isReceiptRequired) {
        if (value > this.selectedExpenseType.maximumLimitReceipt) {
          this.isReceiptRequired = true;
        } else {
          this.isReceiptRequired = false;
        }
      }
    });
  }

  setExpenseDate() {
    const createdDate = new Date(this.expenseRequest.createdDate);

    this.maxDate = {
      year: createdDate.getFullYear(),
      month: createdDate.getMonth() + 1,
      day: createdDate.getDate()
    };

    if (this.selectedExpenseType.daysPassed > 0) {
      createdDate.setDate(createdDate.getDate() - this.selectedExpenseType.daysPassed);
      this.minDate = {
        year: createdDate.getFullYear(),
        month: createdDate.getMonth() + 1,
        day: createdDate.getDate()
      };
    } else {
      this.minDate = { year: 1900, month: 1, day: 1 };
    }
  }

  setDocumentPath() {
    this.companyName = 'Company';
    this.branchName = 'Branch';
    this.directoryName = 'c:';
    this.documentPath = `${this.directoryName}\\${this.companyName}\\${this.branchName}\\ExpenseDocument\\${this.expenseRequest.employeeId}\\`;
  }

  setDocumentFields() {
    this.expenseDocumentService.getDocumentById(this.expenseRequest.id).subscribe((result: any) => {
      this.document = { id: result.documentId, name: result.name, path: result.path, extension: result.extension };
      this.expenseDocumentId = result.expenseDocumentId;
      this.fileName = this.document.name;
      this.editForm.patchValue({ document: this.document });
    },
      error => {
        console.error(error);
      });
  }

  setMaxLimit() {
    if (this.selectedExpenseType.isExpenseLimitEnabled) {
      const createdDate = new Date(this.expenseRequest.createdDate).toISOString();
      this.expenseRequestService.getMaximumExpenseAmountById(this.currentUserId, this.selectedExpenseType.id, this.selectedExpenseType.expensePeriodType, createdDate)
      .subscribe((result: any) => {

        this.maxLimit = result.maximumExpenselimit - result.totalAmount + this.expenseRequest.amount;

        if (this.maxLimit > 0) {
          this.editForm.get('amount').setValidators([Validators.required, Validators.min(1), Validators.max(this.maxLimit)]);

          if (this.isMileageCategory) {
            const maxMileage = +(this.maxLimit / this.selectedExpenseType.mileageRate).toFixed(2);
            this.editForm.get('mileageCovered').setValidators([Validators.required, Validators.max(maxMileage)]);
            this.editForm.get('mileageCovered').updateValueAndValidity();
          }

          this.editForm.get('amount').updateValueAndValidity();

        }
      },
        error => {
          console.error(error);
        });
    }
  }

  setupMileageFields() {
    if (this.expenseRequest.mileageCovered > 0) {
      this.isMileageCategory = true;
      this.mileageUnit = this.mileageUnitTypes[this.expenseRequest.mileageUnit];

      this.editForm.addControl('mileageUnit', new FormControl(null, [Validators.required]));
      this.editForm.addControl('mileageCovered', new FormControl(null, [Validators.required, Validators.max(10000)]));
      this.editForm.addControl('mileageRate', new FormControl(null, [Validators.required]));

      this.editForm.get('mileageCovered').valueChanges.subscribe(value => {
        this.mileageFormula = '(' + this.expenseRequest.currency + ' ' + this.selectedExpenseType.mileageRate + ' x ' + value + ')';

        this.editForm.patchValue({
          amount: (value * this.selectedExpenseType.mileageRate),
          mileageRate: this.selectedExpenseType.mileageRate,
          mileageUnit: this.mileageUnitTypes[this.mileageUnit]
        });
      });
    }
  }

  handleFileInput(files: FileList) {
    if (files.length == 0) {
      return;
    }

    this.resetFileData();

    this.documentToUpload = (files.item(0) as File);
    const documentExtension = this.documentToUpload.type.substring(this.documentToUpload.type.lastIndexOf('/') + 1);

    const validExtensions = ['pdf', 'png', 'jpg', 'jpeg', 'doc', 'docx'];
    if (!validExtensions.includes(documentExtension)) {
      (this.editForm.get('document') as FormGroup).controls.extension.setErrors({ filetype: true });
      return;
    }

    if (this.documentToUpload.size >= 2097152) {
      (this.editForm.get('document') as FormGroup).controls.size.setErrors({ filesize: true });
      return;
    }

    this.fileName = this.documentToUpload.name;
    this.documentSave = new FormData();
    if (this.expenseRequest.isReceiptAttached) {
      this.isReceiptUpdated = true;
    }

    this.editForm.patchValue({ document: { name: this.fileName } });
    this.editForm.patchValue({ document: { path: this.documentPath + this.documentToUpload.name } });
    this.editForm.patchValue({ document: { extension: documentExtension } });
    this.editForm.patchValue({ document: { size: this.documentToUpload.size } });
    this.editForm.patchValue({ isReceiptAttached: true });

    this.documentSave.append('document', this.documentToUpload);
    this.documentSave.append('path', this.documentPath);
  }

  removeFile() {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = 'Are you sure you want to delete this document?';

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.resetFileData();
      }
    });
  }

  resetFileData() {
    this.documentToUpload = null;
    this.documentSave = null;
    this.fileName = '';
    this.editForm.get('document').reset();
    this.editForm.patchValue({ isReceiptAttached: false });
  }

  addDocument() {
    forkJoin([
      this.documentService.add(this.editForm.value.document),
      this.documentUploadService.upload(this.documentSave)
    ]).subscribe(([document]) => {
      this.expenseRequestDocument = {
        expenseId: this.expenseRequest.id,
        documentId: document.id
      };

      this.expenseDocumentService.add(this.expenseRequestDocument).subscribe(() => {
        this.toastr.showSuccessMessage('Expense Request updated successfully!');
        this.activeModal.close('submit');
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('There is an error in updating Expense Request');
        });
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('There is an error in updating Expense Request');
      });
  }

  updateDocument() {
    const documentPath = new FormData();
    documentPath.append('path', this.document.path);
    this.editForm.patchValue({ document: { id: this.document.id } });

    forkJoin([
      this.documentService.update(this.editForm.value.document),
      this.documentUploadService.upload(this.documentSave),
      this.documentUploadService.delete(documentPath)
    ]).subscribe(() => {
      this.toastr.showSuccessMessage('Expense Request updated successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('There is an error in updating Expense Request');
      });
  }

  deleteDocument() {
    const documentPath = new FormData();
    documentPath.append('path', this.document.path);

    forkJoin([
      this.expenseDocumentService.delete(this.expenseDocumentId),
      this.documentUploadService.delete(documentPath)
    ]).subscribe(() => {
      this.toastr.showSuccessMessage('Expense Request updated successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('There is an error in updating Expense Request');
      });
  }

  get name() { return this.editForm.get('name'); }

  onSubmit() {
    if (this.isReceiptRequired) {
      if (this.editForm.get('document.name').value === null) {
        (this.editForm.get('document') as FormGroup).controls.name.setErrors({ filename: true });
        return;
      }
    }

    if (this.editForm.invalid) {
      return;
    }

    this.expenseRequestService.update(this.editForm.value).subscribe((expense: any) => {
      if (expense === -1) {
        this.toastr.showErrorMessage('Expense request title already exists!');
      } else {
        if (!this.fileName && this.expenseRequest.isReceiptAttached) {
          this.deleteDocument();
          return;
        }
        if (this.fileName) {
          if (this.isReceiptUpdated && this.expenseRequest.isReceiptAttached) {
            this.updateDocument();
            return;
          } else if (!this.isReceiptUpdated && !this.expenseRequest.isReceiptAttached) {
            this.addDocument();
            return;
          }
        }

        this.toastr.showSuccessMessage('Expense request updated successfully!');
        this.activeModal.close('submit');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to update the expense request');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      name: ['', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.expenseRequestNames)
      ]],
      expenseConfigurationId: [null, [
        Validators.required,
      ]],
      expenseTypeId: [null],
      expenseTypeName: [null],
      expensePolicyId: [null],
      expensePolicyName: [null],
      expenseDate: [null, [
        Validators.required
      ]],
      currency: [null],
      amount: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(99999999),
      ]],
      comment: [null, [
        Validators.maxLength(250)
      ]],
      document: this.formBuilder.group({
        name: [null],
        path: [null],
        extension: [null],
        size: [null]
      }),
      employeeId: [this.currentUserId],
      requestStatus: [1],
      isReceiptAttached: [false],
      createdDate: [],
    });
  }
}
