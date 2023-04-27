import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { OvertimeRequestService } from '../overtime-request.service';
import { OvertimePolicyConfigurationService } from '@settings/overtime/overtime-policy-configuration/overtime-policy-configuration.service';
import { EmployeeService } from '@features/employee/employee.service';
import { OvertimeRequest } from '../overtime-request.model';
import { NgbActiveModal, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { getCurrentUserId } from '@shared/utils/utils.functions';
@Component({
  selector: 'hrms-overtime-request-view',
  templateUrl: './overtime-request-view.component.html',
  styleUrls: ['./overtime-request-view.component.scss']
})
export class OvertimeRequestViewComponent implements OnInit {
  @Input() overtimeRequest: OvertimeRequest;
  selectedItems:any=[]
  employeeList:any=[]
  employeeDetailsCheck: boolean;
  employeeDetails: any;
  selectEnable: boolean;
  employeeLogin: any;
  currentUserId: number;
  constructor(
    private overtimeRequestService: OvertimeRequestService,
    private employeeService: EmployeeService,
    public activeModal: NgbActiveModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getEmployeeList();
    let b=this.router.routerState.snapshot.url;
    if(b=="/my-overtime"){
      this.employeeDetailsCheck=true
    }else{
      this.employeeDetailsCheck=false  
    }
   this.getLoginEmployeeDetail()
  }

  getOvertimeNotifyPersonnelByOvertimeId(){
    this.overtimeRequestService.getOvertimeNotifyPersonnelByOvertimeId(this.overtimeRequest.id).subscribe((res:any) =>{
      this.selectedItems = this.employeeList?.filter(({ id: id1 }) => res.some(({ notifyPersonnel: id2 }) => id2 === id1));
    },
      error => {
        console.error(error);
        //this.toastr.showErrorMessage('Unable to fetch the Notify personnel');
      });
    }

  getEmployeeList() {
      this.employeeService.getAll().subscribe(result => {
        this.employeeList = result.filter(employee => employee.id !== this.overtimeRequest.employeeId);
        if(this.employeeDetailsCheck==false){
          //this.employeeDetails=result
          this.selectEnable=true
        }
        this.getOvertimeNotifyPersonnelByOvertimeId();
      },
        error => {
          console.error(error);
        });

       
    }
  
    formatter = (employee) => employee.firstName;
  getLoginEmployeeDetail(){
      debugger
      this.employeeService.getLoginEmployee(this.currentUserId).subscribe(res=>{
        this.employeeLogin=res
        if(this.employeeDetailsCheck==true){
          
          this.overtimeRequest.employeeName=this.employeeLogin.firstName
          
        }
      })
    }
}
