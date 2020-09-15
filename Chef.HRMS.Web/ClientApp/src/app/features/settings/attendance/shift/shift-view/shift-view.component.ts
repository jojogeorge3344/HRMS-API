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

  @Input() shift: Shift;

  constructor(public activeModal: NgbActiveModal) { }

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
  }
}
