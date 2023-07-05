import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeWpsService } from '@settings/wps/employee-wps.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { result } from 'lodash';
import { PayrollParameterDetailsComponentService } from '../payroll-parameter-details.component.service';
import { PayrollParameterDetails } from '../payroll-parameter-details.model';
import { EmployeeService } from '@features/employee/employee.service';
import { UserVariableService } from '@settings/payroll/user-variable/user-variable-list/user-variable.service';
import { UserVariableType } from '@settings/payroll/user-variable/user-variable.model';
import { Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateformaterService } from "@shared/services/dateformater.service";


@Component({
  selector: 'hrms-payroll-parameter-details-view',
  templateUrl: './payroll-parameter-details-view.component.html',
  styleUrls: ['./payroll-parameter-details-view.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    {provide: NgbDateParserFormatter, useClass: DateformaterService}],
})
export class PayrollParameterDetailsViewComponent implements OnInit {

  editForm: FormGroup;
  employeeList;
  config={
    displayKey: "firstName",
    search: true,
    limitTo: 0,
    placeholder: "Select Employee",
    noResultsFound: "No results found!",
    searchPlaceholder: "Search",
    searchOnKey: "firstName",
    clearOnSelection: false,
  };;
  userVariableDetails;
  UserVariableType = UserVariableType;
  reqId: any;
  selectedDatasource;
  payrollParameterDetailsItem;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private payrollParameterDetailsService: PayrollParameterDetailsComponentService,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private userVariableService:UserVariableService,

  ) { }

  ngOnInit(): void {
    this.editForm = this.createFormGroup();
    this.route.params.subscribe((params: any) => {
      this.reqId = params['id'];
    });
    this.getEmployeeList();
    this.getUserVariables()
    debugger
  //   this.selectedDatasource=this.employeeList.filter((item)=>{
  //  this.payrollParameterDetailsItem.employeeId==item.id
  //   })
  // this.payrollParameterDetailsItem.transDate = new Date(this.payrollParameterDetailsItem.transDate);    

    this.config = {
      displayKey: "firstName",
      search: true,
      limitTo: 0,
      placeholder: "Select Employee",
      noResultsFound: "No results found!",
      searchPlaceholder: "Search",
      searchOnKey: "firstName",
      clearOnSelection: false,
    };

  }
  selectionChanged(args) {
    // this.editForm.get("employeeId").patchValue(args.value.id);
  }
  onChangeEvent(args) {
    debugger
    let id = this.editForm.get("userVariableId").value
    let selectedItem = this.userVariableDetails.find((item) => item.id == id)
    // this.variableType=UserVariableType[selectedItem.type]
    // this.addForm.get('variableType').patchValue(UserVariableType[selectedItem.type])
    this.editForm.patchValue({
      type: selectedItem.type, //UserVariableType[selectedItem.type]
      variableTypeName: UserVariableType[selectedItem.type]
    });
    // this.addForm.get('type').setValue(UserVariableType[selectedItem.type])
  }

  getEmployeeList() {
    this.employeeService.getAll()
      .subscribe((result) => {
        this.employeeList = result;
        this.getItemById();
      })
  }
  getUserVariables() {
    this.userVariableService.getAll()
      .subscribe((result) => {
        this.userVariableDetails = result
      })
  }


  getItemById() {
    debugger
    this.payrollParameterDetailsService.get(this.reqId).subscribe(result => {
      
    this.payrollParameterDetailsItem = result;
    if(this.payrollParameterDetailsItem.status==1){
      this.editForm.patchValue({
        statusName:'pending',
    })
    }else if(this.payrollParameterDetailsItem.status==2){
      this.editForm.patchValue({
        statusName:'Approved',
    })
    }else{
      this.editForm.patchValue({
        statusName:'processed',
    })
    }
    this.editForm.patchValue({
      id:this.payrollParameterDetailsItem.id,
      // employeeId:this.payrollParameterDetailsItem.employeeId,
      userVariableId:this.payrollParameterDetailsItem.userVariableId,
      variableTypeName: UserVariableType[this.payrollParameterDetailsItem.type],
      transDate:new Date(this.payrollParameterDetailsItem.transDate),
      transValue:this.payrollParameterDetailsItem.transValue,
      type:this.payrollParameterDetailsItem.type,
      status:this.payrollParameterDetailsItem.status,
      remarks:this.payrollParameterDetailsItem.remarks
    });
    let details:any =null;
    this.employeeList.forEach((emp) =>{
      if(( result.employeeId ==emp.id)){
         details=emp;
      }
     });
 
    this.editForm.patchValue({employeeId:details.firstName});
    this.editForm.patchValue({  transDate:new Date(this.payrollParameterDetailsItem.transDate)})
    },
    
     error => {
    
    console.error(error);
    
    });
    
    }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id:[null],
      employeeId: [''],
      userVariableId: [null, [
        Validators.required
      ]],
      type: ['', [
        Validators.required,
      ]],
      transDate: [null, [
        Validators.required
      ]],
      transValue: ['', [
        Validators.required
      ]],
      status: ['', [
        Validators.required
      ]],
      variableTypeName: [''],
      statusName: ['pending'],
      remarks: [''],
    });
  }

}
