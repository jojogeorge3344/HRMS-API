import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AttendanceHoursType } from '../../../../../models/common/types/attendancehourstype';
import { OvertimePolicy } from '../overtime-policy.model';

@Component({
  selector: 'hrms-overtime-policy-view',
  templateUrl: './overtime-policy-view.component.html'
})
export class OvertimePolicyViewComponent implements OnInit {

  @Input() attendanceHoursTypes: AttendanceHoursType;
  @Input() attendanceHoursTypeKeys: Number;
  @Input() overtimePolicy: OvertimePolicy;
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
