import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { Shift } from '../shift.model';

@Component({
  selector: 'hrms-shift-view',
  templateUrl: './shift-view.component.html'
})
export class ShiftViewComponent implements OnInit {

  startTime: NgbTimeStruct;
  endTime: NgbTimeStruct;

  graceStartTime:NgbTimeStruct;
  graceEndTime:NgbTimeStruct;
  workingHr:string
  minimunHr:string

  @Input() shift: Shift;

  constructor(public activeModal: NgbActiveModal) { 
   
  }

  ngOnInit(): void {
    this.startTime = {
      hour: new Date(this.shift.startTime).getHours(), 
      minute: new Date(this.shift.startTime).getMinutes(), 
      second: 0
    };
    this.endTime = {
      hour: new Date(this.shift.endTime).getHours(), 
      minute: new Date(this.shift.endTime).getMinutes(), 
      second: 0
    };
    this.graceStartTime = {
      hour: new Date(this.shift.graceStartTime).getHours(), 
      minute: new Date(this.shift.graceStartTime).getMinutes(), 
      second: 0
    };
    this.graceEndTime = {
      hour: new Date(this.shift.graceEndTime).getHours(), 
      minute: new Date(this.shift.graceEndTime).getMinutes(), 
      second: 0
    };
     const wrHr = new Date(this.shift.workingHours).getHours() >= 10 ? new Date(this.shift.workingHours).getHours() : '0' +new Date(this.shift.workingHours).getHours()
     const minValue = new Date(this.shift.workingHours).getMinutes() >10 ? new Date(this.shift.workingHours).getMinutes() : '0' +new Date(this.shift.workingHours).getMinutes()
     this.workingHr = wrHr + ':' + minValue

     const minHr = new Date(this.shift.minimumHours).getHours() >=10 ? new Date(this.shift.minimumHours).getHours()  : '0'+ new Date(this.shift.minimumHours).getHours() 
     const minMinValue = new Date(this.shift.minimumHours).getMinutes() >=10 ? new Date(this.shift.minimumHours).getMinutes() : '0' +new Date(this.shift.minimumHours).getMinutes()
     this.minimunHr = minHr + ':'+ minMinValue
    //  this.workingHr =  new Date(this.shift.workingHours).getHours() + ':' +  new Date(this.shift.workingHours).getMinutes()
    //  this.minimunHr = new Date(this.shift.minimumHours).getHours() + ':' +  new Date(this.shift.minimumHours).getMinutes()

   
  }
}
