import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { forkJoin } from 'rxjs';

import { ExpenseRequestService } from '../expense-request.service';
import { ExpenseDocumentService } from '../expense-document.service';
import { DocumentService } from '@shared/services/document.service';
import { DocumentUploadService } from '@shared/services/document-upload.service';

import { ExpenseRequest } from './../expense-request.model';
import { ExpenseConfiguration } from '@settings/expense/expense-configuration/expense-configuration.model';

import { ExpenseCategoryType } from 'src/app/models/common/types/expensecategorytype';
import { UnitType } from 'src/app/models/common/types/unittype';

import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-expense-request-create',
  templateUrl: './expense-request-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})

export class ExpenseRequestCreateComponent implements OnInit {
  addForm: FormGroup;
  selectedExpenseType: ExpenseConfiguration;

  documentToUpload: File;
  documentPath: string;
  documentSave: FormData;
  expenseRequestDocument;

  companyName: string;
  branchName: string;
  directoryName: string;
  fileName: string;

  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;

  isDisabled: boolean;
  isReceiptRequired: boolean;
  isLimitExceeded: boolean;
  isAmountExceeded: boolean;
  isMileageCategory: boolean;

  expenseCategoryTypes = ExpenseCategoryType;
  mileageUnitTypes = UnitType;

  mileageFormula: string;
  mileageUnit: string;
  maxLimit: number;
  currentUserId: number;

  @Input() expenseTypes: ExpenseConfiguration[];
  @Input() expenseRequestNames: string[];

  @ViewChild('expenseDate') datePicker: any;

  constructor(
    private expenseRequestService: ExpenseRequestService,
    private documentService: DocumentService,
    private documentUploadService: DocumentUploadService,
    private expenseDocumentService: ExpenseDocumentService,
    public modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.initialize();
    this.onChanges();
  }

  initialize() {
    this.selectedExpenseType = null;

    this.companyName = 'Company';
    this.branchName = 'Branch';
    this.directoryName = 'c:';
    this.fileName = '';

    this.documentToUpload = null;
    this.documentPath = `${this.directoryName}\\${this.companyName}\\${this.branchName}\\ExpenseDocument\\${this.currentUserId}\\`;
    this.documentSave = null;

    this.isDisabled = true;
    this.isReceiptRequired = false;
    this.isMileageCategory = false;

    this.mileageFormula = '';
    this.mileageUnit = '';
    this.maxLimit = null;

    const current = new Date();

    this.minDate = { year: 1900, month: 1, day: 1 };
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

    this.addForm = this.createFormGroup();
    this.addForm.patchValue({ currency: this.expenseTypes[0].currency });
  }

  setExpenseType() {
    const expenseConfigurationId = this.addForm.get('expenseConfigurationId').value;
    this.selectedExpenseType = this.expenseTypes.find(item => item.id === expenseConfigurationId);
    this.addForm.patchValue({ expenseTypeId: this.selectedExpenseType.expenseTypeId, expenseTypeName: this.selectedExpenseType.name });
    this.enableForm();
    this.setupMileageFields();
    this.checkMaxLimit();
    this.addValidations();

    if (!this.isAmountExceeded && !this.isLimitExceeded) {

    }
  }

  onChanges(): void {
    this.addForm.get('amount').valueChanges.subscribe(value => {
      if (this.selectedExpenseType.isCommentRequired) {
        if (value > this.selectedExpenseType.maximumLimitComment) {
          this.addForm.get('comment').setValidators([Validators.required, Validators.maxLength(250)]);
        } else {
          this.addForm.get('comment').setValidators([Validators.maxLength(250)]);
        }
        this.addForm.get('comment').updateValueAndValidity();
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

  checkMaxLimit() {
    if (this.selectedExpenseType.isExpenseLimitEnabled) {
      this.expenseRequestService.getMaximumExpenseAmountById(this.currentUserId, this.selectedExpenseType.id, this.selectedExpenseType.expensePeriodType, new Date().toISOString())
      .subscribe((result: any) => {
        this.maxLimit = result.maximumExpenselimit - result.totalAmount;
        if (this.maxLimit <= 0) {
          this.toastr.showErrorMessage('Maximum amount limit reached for this expense type!');
          this.resetForm();
          return;
        } else {
          this.addForm.get('amount').setValidators([Validators.required, Validators.min(1), Validators.max(this.maxLimit)]);

          if (this.isMileageCategory) {
            const maxMileage = +(this.maxLimit / this.selectedExpenseType.mileageRate).toFixed(2);
            this.addForm.get('mileageCovered').setValidators([Validators.required, Validators.max(maxMileage)]);
            this.addForm.get('mileageCovered').updateValueAndValidity();
          }

          this.addForm.get('amount').updateValueAndValidity();
        }
      },
        error => {
          console.error(error);
        });
    }

    if (this.selectedExpenseType.isInstanceLimitEnabled) {
      this.expenseRequestService.getMaximumInstancesById(this.currentUserId, this.selectedExpenseType.id, this.selectedExpenseType.expensePeriodType)
      .subscribe((result: any) => {
        if (result.maximumInstancesLimit - result.totalRequest <= 0) {
          this.toastr.showErrorMessage('Maximum request limit reached for this expense type!');
          this.resetForm();
          return;
        }
      },
        error => {
          console.error(error);
        });
    }
  }

  enableForm() {
    this.addForm.get('expenseDate').enable();
    this.addForm.get('amount').enable();
    this.addForm.get('comment').enable();
    this.isDisabled = false;
    this.addForm.get('expenseConfigurationId').disable();
  }

  resetForm() {
    this.addForm.get('expenseDate').disable();
    this.addForm.get('amount').disable();
    this.addForm.get('comment').disable();
    this.isDisabled = true;
    this.addForm.get('expenseConfigurationId').enable();
    this.addForm.controls['expenseConfigurationId'].reset();
    this.addForm.controls['expenseDate'].reset();
    this.addForm.controls['amount'].reset();
    this.addForm.controls['comment'].reset();
    
   // this.initialize();
  }
  resetExpenseType(){
   
    this.isDisabled=true;
  }

  setupMileageFields() {
    if (this.selectedExpenseType.category == this.expenseCategoryTypes.Mileage) {

      this.isMileageCategory = true;
      this.mileageUnit = this.mileageUnitTypes[this.selectedExpenseType.mileageUnit];

      this.addForm.addControl('mileageUnit', new FormControl(null, [Validators.required]));
      this.addForm.addControl('mileageCovered', new FormControl(null, [Validators.required, Validators.max(10000)]));
      this.addForm.addControl('mileageRate', new FormControl(null, [Validators.required]));

      this.addForm.get('mileageCovered').valueChanges.subscribe(value => {
        this.mileageFormula = '(' + this.expenseTypes[0].currency + ' ' + this.selectedExpenseType.mileageRate + ' x ' + value + ')';

        this.addForm.patchValue({
          amount: (value * this.selectedExpenseType.mileageRate),
          mileageRate: this.selectedExpenseType.mileageRate,
          mileageUnit: this.mileageUnitTypes[this.mileageUnit]
        });
      });
    }
  }

  addValidations() {
    this.isReceiptRequired = this.selectedExpenseType.isProofRequired;
    if (this.selectedExpenseType.daysPassed > 0) {
      this.addForm.get('expenseDate').setValidators([this.datePicker, Validators.required, ExpiryDateValidator(this.selectedExpenseType.daysPassed)]);
      this.addForm.get('expenseDate').updateValueAndValidity();
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
      (this.addForm.get('document')as FormGroup).controls.extension.setErrors({ filetype: true });
      return;
    }

    if (this.documentToUpload.size >= 2097152) {
      (this.addForm.get('document') as FormGroup).controls.size.setErrors({ filesize: true });
      console.log(this.addForm.controls.document["controls"].size);
      
      return;
    }

    this.fileName = this.documentToUpload.name;
    this.documentSave = new FormData();

    this.addForm.patchValue({ document: { name: this.fileName } });
    this.addForm.patchValue({ document: { path: this.documentPath + this.documentToUpload.name } });
    this.addForm.patchValue({ document: { extension: documentExtension } });
    this.addForm.patchValue({ document: { size: this.documentToUpload.size } });
    this.addForm.patchValue({ isReceiptAttached: true });

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
    this.addForm.get('document').reset();
    this.addForm.patchValue({ isReceiptAttached: false });
  }

  get name() { return this.addForm.get('name'); }

  onSubmit() {
    console.log(this.addForm.controls.document["controls"].size);
    
    if (this.isReceiptRequired) {
      if (this.addForm.get('document.name').value === null) {
        (this.addForm.get('document') as FormGroup).controls.name.setErrors({ filename: true });
        return;
      }
    }

    if (this.addForm.invalid) {
      return;
    }

    if(this.documentSave==null){
      this.toastr.showErrorMessage('Upload a document less than 2mb!!');
      console.log("null upload");
      return;
    }

    let payload = this.addForm.getRawValue();
    payload.amount = payload.amount.toFixed(2); 
    
    this.expenseRequestService.add(payload).subscribe((expense: ExpenseRequest) => {
      if (expense.id === -1) {
        this.toastr.showErrorMessage('Expense title already exists!');
      } else if (this.fileName) {
        forkJoin([
          this.documentService.add(this.addForm.value.document),
          this.documentUploadService.upload(this.documentSave)
        ]).subscribe(([document]) => {
          this.expenseRequestDocument = {
            expenseId: expense.id,
            documentId: document.id
          };

          this.expenseDocumentService.add(this.expenseRequestDocument).subscribe((result: any) => {
            this.toastr.showSuccessMessage('Expense Request added successfully!');
            this.activeModal.close('submit');
          },
            error => {
              console.error(error);
              this.toastr.showErrorMessage('There is an error in adding Expense Request');
            });
        },
          error => {
            console.error(error);
            this.toastr.showErrorMessage('There is an error in adding Expense Request');
          });
      } else {
        this.toastr.showSuccessMessage('Expense request added successfully!');
        this.activeModal.close('submit');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the expense request');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.expenseRequestNames)
      ]],
      expenseConfigurationId: [{ value: null, disabled: !this.isDisabled }, [
        Validators.required,
      ]],
      expenseTypeId: [null],
      expenseTypeName: [null],
      expensePolicyId: [this.expenseTypes[0].expensePolicyId],
      expensePolicyName: [this.expenseTypes[0].expensePolicyName],
      expenseDate: [{ value: null, disabled: this.isDisabled }, [
        Validators.required
      ]],
      currency: [null],
      amount: [{ value: null, disabled: this.isDisabled }, [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.min(1),
        Validators.max(99999999),
      ]],
      comment: [{ value: null, disabled: this.isDisabled }, [
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
    });
  }
}

function ExpiryDateValidator(days: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {

    const expiryDate = new Date(control.value);
    const currentDate = new Date(new Date().setHours(0, 0, 0, 0));
    expiryDate.setDate(expiryDate.getDate() + days);

    if (control.value && expiryDate < currentDate) {
      return { expired: true };
    }

    return null;
  };
}
