import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReligionService } from '../religion-detail.service';
import { ReligionGroup } from '../religion.model';

@Component({
  selector: 'hrms-religion-edit',
  templateUrl: './religion-edit.component.html',
  styleUrls: ['./religion-edit.component.scss']
})
export class ReligionEditComponent implements OnInit {

  addForm: FormGroup;
  @Input() relDetails: ReligionGroup;
  @Input() Code: string[];
  @Input() Name: string[];
  codeExistCheck:boolean=false

  constructor(
    private religionService:ReligionService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.addForm.patchValue(this.relDetails);
    if(this.addForm.value.status==true){
      this.addForm.patchValue({
        status:"Active"
      })
      }else{
        this.addForm.patchValue({
          status:"InActive"
        })
      }
  }

  onSubmit() {
    this.addForm.value.id=this.relDetails.id
    if(this.addForm.value.status=="Active"){
      this.addForm.value.status=true
      }else{
        this.addForm.value.status=false
      }
    const religionForm = this.addForm.value;
    if(!this.codeExistCheck){
    this.religionService.update(religionForm).subscribe(result => {
      this.toastr.showSuccessMessage('The Religion updated successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the Religion');
      });
    }
  }
  checkCodeEXist(event){
    this.religionService.get(event).subscribe((result)=>{
      if(result){
        this.codeExistCheck=true
     this.toastr.showWarningMessage("Already Code Exist")
      }else{
        this.codeExistCheck=false
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
