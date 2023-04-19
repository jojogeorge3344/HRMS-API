import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AttendanceHoursType } from '../../../../../models/common/types/attendancehourstype';
import { OvertimePolicy } from '../overtime-policy.model';
import { OvertimePolicyService } from '../overtime-policy.service';
import { OvertimePolicyConfiguration } from '@settings/overtime/overtime-policy-configuration/overtime-policy-configuration.model';
import { OvertimePolicyConfigurationService } from '@settings/overtime/overtime-policy-configuration/overtime-policy-configuration.service';

@Component({
  selector: 'hrms-overtime-policy-view',
  templateUrl: './overtime-policy-view.component.html'
})
export class OvertimePolicyViewComponent implements OnInit {

  @Input() attendanceHoursTypes: AttendanceHoursType;
  @Input() attendanceHoursTypeKeys: Number;
  @Input() overtimePolicy: OvertimePolicy;
  overtimePolicyFormula:any;
  overtimePolicyId;
  holidayOverTime;
  normalOverTime:any;
  normalOvertimeDetails;
  holidayOvertimeDetails;
  specialOverTimeDetails;
  specialOverTime;

  constructor(public activeModal: NgbActiveModal,
    private overtimePolicyConfigurationService: OvertimePolicyConfigurationService) 
    { }

  ngOnInit(): void {
    debugger

    this.overtimePolicyId=this.overtimePolicy.id;
   this.getOvertimePolicy()

  }

  getOvertimePolicy() {
    debugger
    this.overtimePolicyConfigurationService.getByOverTimePolicyId(this.overtimePolicyId).subscribe((result) => {
      this.overtimePolicyFormula = result;
      console.log(this.overtimePolicyFormula);
      
      this.overtimePolicyConfigurationService.getNormalOverTime()
      .subscribe((result)=>{
        this.normalOverTime=result 
       this.normalOvertimeDetails= this.normalOverTime.filter(item=>this.overtimePolicyFormula.normalOverTime==item.id)
       
      })
      this.overtimePolicyConfigurationService.getHolidayOverTime()
      .subscribe((result)=>{
        this.holidayOverTime=result  
        this.holidayOvertimeDetails= this.holidayOverTime.filter(item=>this.overtimePolicyFormula.holidayOverTime==item.id)

      })
      this.overtimePolicyConfigurationService.getSpecialOverTime()
      .subscribe((result)=>{
        this.specialOverTime=result  
        this.specialOverTimeDetails= this.specialOverTime.filter(item=>this.overtimePolicyFormula.specialOverTime==item.id)

      })
    }
    );
  }
}
