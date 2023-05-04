import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EosService } from '@settings/eos/eos.service';
import { LeaveSlabService } from '../leave-slab-service';
import { LeaveComponentService } from '../leave-component.service';
import { valueTypeOff } from 'src/app/models/common/types/leaveSlabOff';
import { LeaveSlabGroup } from '../leave-slab.model';

@Component({
  selector: 'hrms-leave-slab-view',
  templateUrl: './leave-slab-view.component.html',
  styleUrls: ['./leave-slab-view.component.scss']
})
export class LeaveSlabViewComponent implements OnInit {

  editForm: FormGroup;
  @Input() relDetails: LeaveSlabGroup;
  valueSlabOffTypeKeys: number[];
  valueSlabOffType = valueTypeOff;
  @Input() code;
  @Input() name;
  @Input() id;



  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private leaveSlabService:LeaveSlabService,
    private eosService:EosService,
    private leaveComponentService: LeaveComponentService,) {
  }

  ngOnInit(): void {
    debugger
    this.editForm = this.createFormGroup();
    this.editForm.patchValue({
      leaveComponentCode:this.relDetails.leaveComponentCode,
      leaveComponentName:this.relDetails.leaveComponentName,
      lowerLimit:this.relDetails.lowerLimit,
      upperLimit:this.relDetails.upperLimit,
      valueVariable:this.relDetails.valueVariable,
      valueType:this.relDetails.valueType,
      leaveComponentId:this.id

    });
    this.valueSlabOffTypeKeys = Object.keys(this.valueSlabOffType).filter(Number).map(Number);
    
  }
  

 
  createFormGroup(): FormGroup {
    return this.formBuilder.group({

      leaveComponentCode: ['', [
        Validators.required
      ]],
      leaveComponentName: ['', [
        Validators.required
      ]],
      lowerLimit: ['', [
        Validators.required
      ]],
      upperLimit: ['', [
        Validators.required
      ]],
      valueVariable: ['', [
        Validators.required
      ]],
      valueType: ['', [
        Validators.required
      ]],
      leaveComponentId: ['', ],
    });
  }

}








