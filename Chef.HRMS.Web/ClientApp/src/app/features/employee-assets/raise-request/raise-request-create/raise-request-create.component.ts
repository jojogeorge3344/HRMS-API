import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { RaiseRequestService } from '../raise-request.service';

@Component({
  selector: 'hrms-raise-request-create',
  templateUrl: './raise-request-create.component.html'
})
export class RaiseRequestCreateComponent implements OnInit {

  addForm: FormGroup;

    currentUserId: number;
    @Input() assetTypeNames: string[];

    constructor(
      private raiseRequestService: RaiseRequestService,
      public activeModal: NgbActiveModal,
      private formBuilder: FormBuilder,
      private toastr: ToasterDisplayService) {
   }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
  }
  get name() { return this.addForm.get('name'); }

  onSubmit() {
    this.raiseRequestService.add(this.addForm.value).subscribe((result: any) => {
      console.log("res",result)
      if (result.id === -1) {
        this.toastr.showErrorMessage('Raised request already exists!');
      } else {
        this.toastr.showSuccessMessage('Request added successfully!');
        this.activeModal.close('submit');
      }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to add the request');
    });

  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      assettypename: ['', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.assetTypeNames)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
    });
  }

}
