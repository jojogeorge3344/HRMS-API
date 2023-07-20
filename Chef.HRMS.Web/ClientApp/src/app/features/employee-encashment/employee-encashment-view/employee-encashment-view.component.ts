import { Component, OnInit } from '@angular/core';
import {   NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateformaterService } from "@shared/services/dateformater.service";
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '@features/employee/employee.service';
import { Observable } from 'rxjs';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { debounceTime, distinctUntilChanged,map} from 'rxjs/operators';
import { EmployeeEncashmentService } from '../employee-encashment.service';
import { RequestStatus } from 'src/app/models/common/types/requeststatustype';

@Component({
  selector: 'hrms-employee-encashment-view',
  templateUrl: './employee-encashment-view.component.html',
  styleUrls: ['./employee-encashment-view.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    {provide: NgbDateParserFormatter, useClass: DateformaterService}],
})
export class EmployeeEncashmentViewComponent implements OnInit {


  config_emp
  employeeList:any
  editForm: FormGroup;
  currentUserId:any
  searchFailed: boolean;
  encashmentPayslip: any;
  minDate:any;
  requestStatusType=RequestStatus
  encashmentId: any;
  selectedDatasource:any
  leaveencashmentPayslip: any=[];
  eosencashmentPayslip: any=[];
  ticketencashmentPayslip: any=[];
  
  

  constructor(   // public activeModal: NgbActiveModal,
  private formBuilder: FormBuilder,
  private toastr: ToasterDisplayService,
  public modalService: NgbModal,
  private router: Router,
  private employeeService: EmployeeService,
  private employeeEncashmentService: EmployeeEncashmentService,
  private route: ActivatedRoute,) { 
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.config_emp= {
      displayKey: "firstName",
      search: true,
      limitTo: 0,
      placeholder: "Select  Employee",
      noResultsFound: "No results found!",
      searchPlaceholder: "Search",
      searchOnKey: "firstName",
      clearOnSelection: false,
    };
    const current = new Date();
    this.editForm.patchValue({
      processDate:new Date(new Date(current).getTime()+(1*24*60*60*1000))
    })
    this.route.params.subscribe((params: any) => {
      let a= params.id;
      this.encashmentId  = parseInt(a, 10);
    });
    this.getEmployeeList()
  }

  getEmployeeList() {
    this.employeeService.getAll().subscribe(result => {
      this.employeeList = result
      this.getEmployeeEncashmentById( this.encashmentId )
    },
      error => {
        console.error(error);
      });
  }
  getEmployeeEncashmentById(id){
    debugger
    this.employeeEncashmentService.get(id).subscribe(res=>{
      this.editForm.patchValue(res)
      this.editForm.patchValue({
        requestDate:new Date(res.requestDate),
        processDate:new Date(res.processDate),
        id:res.id
      })
      const details = this.employeeList.find(emp => emp.id === res.employeeId);
      this.selectedDatasource=details.firstName
      this.encashmentPayslip=res.employeeEncashmentDetails
      this.leaveencashmentPayslip.push(this.encashmentPayslip[0])
      this.eosencashmentPayslip.push(this.encashmentPayslip[1])
      this.ticketencashmentPayslip.push(this.encashmentPayslip[2])
      let a=0
      for(let i=0;i<this.encashmentPayslip.length;i++){
        a +=this.encashmentPayslip[i].componentAmt
      }
      this.editForm.patchValue({
        netAmount:a
      })
      
      
    })

  }
  selectionChanged_Employee(args){
    this.editForm.get("employeeId").patchValue(args.value.id);
    this.getLeaveBalanceDetails()
    
  }

  search = (text: Observable<string>) => {
    return text.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        const searchitem = (this.employeeList.filter((v) => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
        if (searchitem.length == 0) {
          this.searchFailed = true;
          return;
        } else {
          this.searchFailed = false;
          return term.length <= 1 ? [].slice() : this.employeeList.filter((v) => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
        }

      })
    );
  }
  getLeaveBalanceDetails(){
    this.editForm.value.requestDate =  this.editForm.value.requestDate.getFullYear() + '-' + ( this.editForm.value.requestDate.getMonth() + 1) + '-' +  this.editForm.value.requestDate.getDate();
    this.editForm.value.processDate =  this.editForm.value.processDate.getFullYear() + '-' + ( this.editForm.value.processDate.getMonth() + 1) + '-' +  this.editForm.value.processDate.getDate();
    this.employeeEncashmentService.getBalanceLeave(this.editForm.value.requestDate,this.editForm.value.processDate,this.editForm.value.employeeId).subscribe(result=>{
    this.editForm.patchValue({
      annualLeaveBalance:result.annualLeaveBalance,
      eosBalanceDays:result.eosBalanceDays,
      accruedTicketAmt:result.accruedTicketAmt
    })
    })
  }
  onSubmit(){
    debugger
    if(this.editForm.invalid){
      return
    }
    this.editForm.value.processStatus=this.requestStatusType.Approved
    this.employeeEncashmentService.update(this.editForm.value).subscribe((result: any) => {
    console.log(result)
    this.toastr.showSuccessMessage('Employee Encashment updated successfully');
    this.router.navigate(["/employee-encashment"])
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to submit Employee Encashment');
      });
  }
  generateEncashmentSlip(){
    this.encashmentPayslip=[]
    this.employeeEncashmentService.getComponent(this.editForm.value.employeeId).subscribe((result: any) => {
    this.encashmentPayslip.push(result)
    this.encashmentPayslip.forEach(value=>{
      // let a=0
      // a=(value.eosAmount)+(value.leaveBalanceAmount)+(value.ticketBalanceAmount)
      // this.editForm.patchValue({
      //   netAmount:a
      // })

      this.editForm.value.employeeEncashmentDetails.push(
        {
          payrollComponentId:value.leaveComponentId
        },
        {
          payrollComponentId:value.eosId
        },
  
        {
          payrollComponentId:value.ticketComponentId
        })
    })
 
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to Get Employee Encashment Slip');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id:0,
      requestNum: null,
      requestDate: [new Date(Date.now()), [
        Validators.required
      ]],
      processDate:[new Date(Date.now()), [
        Validators.required
      ]],
      employeeId: [0, [
        Validators.required,
      ]],
      annualLeaveBalance:[null, [
        Validators.required,
      ]],
      approvedAnnualLeave:[null, [
        Validators.required,
      ]],
      eosBalanceDays:[null, [
        Validators.required,
      ]],
      approvedEOSDays:[null, [
        Validators.required,
      ]],
      accruedTicketAmt:[null, [
        Validators.required,
      ]],
      approvedTicketAmt:[null, [
        Validators.required,
      ]],
      processStatus:[],
      netAmount:[],
      employeeName:[],
      employeeEncashmentDetails:[[]]
    });
  }


}






