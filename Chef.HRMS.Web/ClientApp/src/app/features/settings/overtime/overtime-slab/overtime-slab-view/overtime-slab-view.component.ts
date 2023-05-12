import { Component, OnInit ,Input} from '@angular/core';
import { OverTimeSlabGroup } from '../overtime-slab-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OvertimeType } from 'src/app/models/common/types/overtimeType';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'hrms-overtime-slab-view',
  templateUrl: './overtime-slab-view.component.html',
  styleUrls: ['./overtime-slab-view.component.scss']
})
export class OvertimeSlabViewComponent implements OnInit {
  overtimetype=OvertimeType;
  overtimetypekeys: number[];
  addForm: FormGroup;
  @Input() relDetails: OverTimeSlabGroup;

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    debugger
    this.addForm = this.createFormGroup();
    this.overtimetypekeys = Object.keys(this.overtimetype)
    .filter(Number)
    .map(Number);
    console.log(this.relDetails)
    if(this.relDetails.valueType=="1"){
      this.relDetails.valueType='Number/%'
    }else{
      this.relDetails.valueType='Number'
    }
    this.addForm.patchValue({
      overtimetype:this.relDetails.overTimeType

    })
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({

      overtimetype:['']
    });
  }

}




