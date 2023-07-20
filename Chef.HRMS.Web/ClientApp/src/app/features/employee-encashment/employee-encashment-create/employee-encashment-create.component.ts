import { Component, OnInit } from '@angular/core';
import {   NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateformaterService } from "@shared/services/dateformater.service";
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { Router } from '@angular/router';
import { EmployeeService } from '@features/employee/employee.service';
import { Observable } from 'rxjs';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { debounceTime, distinctUntilChanged,map} from 'rxjs/operators';
import { EmployeeEncashmentService } from '../employee-encashment.service';
import { RequestStatus } from 'src/app/models/common/types/requeststatustype';

@Component({
  selector: 'hrms-employee-encashment-create',
  templateUrl: './employee-encashment-create.component.html',
  styleUrls: ['./employee-encashment-create.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    {provide: NgbDateParserFormatter, useClass: DateformaterService}],
})
export class EmployeeEncashmentCreateComponent implements OnInit {

  config_emp
  employeeList:any
  addForm: FormGroup;
  currentUserId:any
  searchFailed: boolean;
  encashmentPayslip: any;
  minDate:any;
  requestStatusType=RequestStatus
  
  

  constructor(   // public activeModal: NgbActiveModal,
  private formBuilder: FormBuilder,
  private toastr: ToasterDisplayService,
  public modalService: NgbModal,
  private router: Router,
  private employeeService: EmployeeService,
  private employeeEncashmentService: EmployeeEncashmentService,) { 
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
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
    this.addForm.patchValue({
      processDate:new Date(new Date(current).getTime()+(1*24*60*60*1000))
    })
    this.getEmployeeList()
  }

  getEmployeeList() {
    this.employeeService.getAll().subscribe(result => {
      this.employeeList = result
    },
      error => {
        console.error(error);
      });
  }
  selectionChanged_Employee(args){
    this.addForm.get("employeeId").patchValue(args.value.id);
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
    this.addForm.value.requestDate =  this.addForm.value.requestDate.getFullYear() + '-' + ( this.addForm.value.requestDate.getMonth() + 1) + '-' +  this.addForm.value.requestDate.getDate();
    this.addForm.value.processDate =  this.addForm.value.processDate.getFullYear() + '-' + ( this.addForm.value.processDate.getMonth() + 1) + '-' +  this.addForm.value.processDate.getDate();
    this.employeeEncashmentService.getBalanceLeave(this.addForm.value.requestDate,this.addForm.value.processDate,this.addForm.value.employeeId).subscribe(result=>{
    this.addForm.patchValue({
      annualLeaveBalance:result.annualLeaveBalance,
      eosBalanceDays:result.eosBalanceDays,
      accruedTicketAmt:result.accruedTicketAmt
    })
    })
  }
  onSubmit(){
    if(this.addForm.invalid){
      return
    }
    this.addForm.value.processStatus=this.requestStatusType.Approved
    this.employeeEncashmentService.add(this.addForm.value).subscribe((result: any) => {
    console.log(result)
    this.toastr.showSuccessMessage('Employee Encashment added successfully');
    this.router.navigate(["/employee-encashment"])
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to submit Employee Encashment');
      });
  }
  generateEncashmentSlip(){
    this.encashmentPayslip=[]
    this.employeeEncashmentService.getComponent(this.addForm.value.employeeId).subscribe((result: any) => {
    this.encashmentPayslip.push(result)
    this.encashmentPayslip.forEach(value=>{
      let a=0
      a=(value.eosAmount)+(value.leaveBalanceAmount)+(value.ticketBalanceAmount)
      this.addForm.patchValue({
        netAmount:a
      })

      this.addForm.value.employeeEncashmentDetails.push(
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
