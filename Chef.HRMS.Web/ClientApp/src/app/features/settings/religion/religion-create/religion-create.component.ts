import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReligionService } from '../religion-detail.service';

@Component({
  selector: 'hrms-religion-create',
  templateUrl: './religion-create.component.html',
  styleUrls: ['./religion-create.component.scss']
})
export class ReligionCreateComponent implements OnInit {

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
      if(this.addForm.value.status=="Active"){
      this.addForm.value.status=true
      }else{
        this.addForm.value.status=false
      }
    const religionForm = this.addForm.value;
    this.religionService.get(religionForm.code).subscribe((result)=>{
      if(result){
     this.toastr.showWarningMessage("Already Code Exist")
      }
      else{
        this.religionService.add(religionForm).subscribe(result => {
          this.toastr.showSuccessMessage('The Religion added successfully!');
          this.activeModal.close('submit');
        },
          error => {
            console.error(error);
            this.toastr.showErrorMessage('Unable to add the Religion');
          });
      }
    })
  
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


