import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReligionService } from '../religion-detail.service';

@Component({
  selector: 'hrms-religion-edit',
  templateUrl: './religion-edit.component.html',
  styleUrls: ['./religion-edit.component.scss']
})
export class ReligionEditComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    private religionService:ReligionService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
  }

  onSubmit() {
    const religionForm = this.addForm.value;
    this.religionService.add(religionForm).subscribe(result => {
      this.toastr.showSuccessMessage('The Religion added successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the Religion');
      });
  }
  

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      code: ['', [
        Validators.maxLength(14),
        Validators.required,
      ]],
      name: ['', [
        Validators.maxLength(64),
        Validators.required,
      ]],
      status: ['', [
        Validators.required,
      ]],
    });
  }

}
