import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeJobTitleService } from '@settings/employee/employee-job-title/employee-job-title.service';
import { EmployeeNumbersService } from '@settings/employee/employee-numbers/employee-numbers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '@settings/branch/branch.service';
import { BusinessUnitType } from '../../../../models/common/types/businessunittype';
import { DepartmentType } from '../../../../models/common/types/departmenttype';
import { WorkerType } from '../../../../models/common/types/workertype';
import { TimeType } from '../../../../models/common/types/timetype';
import { PeriodType } from '../../../../models/common/types/periodType';
import { NoticePeriodType } from '../../../../models/common/types/noticeperiodtype';
import { padAtStrt } from '@shared/utils/utils.functions';
import { EmployeeJobTitle } from '@settings/employee/employee-job-title/employee-job-title.model';
import { Branch } from '@settings/branch/branch';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { Employee } from '@features/employee/employee.model';
import { EmployeeService } from '@features/employee/employee.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { EmployeeJobDetailsService } from '../employee-job-details.service';

@Component({
  selector: 'hrms-employee-job-details-create',
  templateUrl: './employee-job-details-create.component.html',
  styleUrls: ['./employee-job-details.create.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeJobDetailsCreateComponent implements OnInit {

  addForm: FormGroup;
  department: object;
  jobTitleId: EmployeeJobTitle[];
  numberSeriesId: any;
  noticePeriod: object;
  employeeNumber = '';
  businessUnitTypeKeys: number[];
  groupCategory:any;
  visaDesignation:any;
  businessUnitType = BusinessUnitType;
  departmentTypeKeys: number[];
  departmentType = DepartmentType;
  workerTypeKeys: number[];
  workerType = WorkerType;
  timeTypeKeys: number[];
  timeType = TimeType;
  periodTypeKeys: number[];
  periodType = PeriodType;
  noticePeriodTypeKeys: number[];
  noticePeriodType = NoticePeriodType;
  currentUserId: number;
  maxDate;
  minDate;
  searchFailed: boolean;
  employeeList: Employee[];
  config;
  reportingManager: number;
  selectedDatasource:any;

  @Input() id: any;
  location: Branch[];
  @Output() jobDetailsForm = new EventEmitter<boolean>();
  @Input() dob: any;
  @Input() jobDetails: any;
  @Input() passEmployeeId:any
  constructor(
    private employeeService: EmployeeService,
    private employeeJobTitleService: EmployeeJobTitleService,
    private employeeNumbersService: EmployeeNumbersService,
    private employeeJobDetailsService:EmployeeJobDetailsService,
    private branchService: BranchService,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private route: ActivatedRoute,


  ) {
    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

    this.route.params.subscribe((params: any) => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    if (this.jobDetails != null) {
      this.addForm.patchValue(this.jobDetails);
      this.employeeNumber = this.jobDetails.employeeNumber;
    }
    // this.route.params.subscribe((params: any) => {
    //   this.id = params.id;
    // });
    this.route.params.subscribe((params: any) => {
      if(params.jobDetailsId){
        this.employeeJobDetailsService.get(params.jobDetailsId).subscribe(result => {  
          result.dateOfJoin= new Date(result.dateOfJoin);
          this.reportingManager=result.reportingManager  
          this.addForm.patchValue(result);
    
        },)
      }
      
    });
    this.employeeJobDetailsService.getCategory().subscribe((result)=>{      
      this.groupCategory=result;  
    })

    this.employeeJobDetailsService.getVisaDesignation().subscribe((result)=>{
       this.visaDesignation=result;
    })
    this.employeeJobDetailsService.getProbation().subscribe((result)=>{
    this.addForm.patchValue({
      probationPeriod:result[0].probationDuration,
      periodType:result[0].periodType,
      workerType:result[0].workerType,
      timeType:result[0].timeType
    })
    })
    this.businessUnitTypeKeys = Object.keys(this.businessUnitType).filter(Number).map(Number);
    this.departmentTypeKeys = Object.keys(this.departmentType).filter(Number).map(Number);
    this.workerTypeKeys = Object.keys(this.workerType).filter(Number).map(Number);
    this.timeTypeKeys = Object.keys(this.timeType).filter(Number).map(Number);
    this.periodTypeKeys = Object.keys(this.periodType).filter(Number).map(Number);
    this.noticePeriodTypeKeys = Object.keys(this.noticePeriodType).filter(Number).map(Number);


    this.getJobList();
    this.getEmployeeNumber();
    this.getEmployeeList();
    this.getBranches();
    if (this.dob != undefined) {
      const dob = new Date(this.dob);
      this.minDate = {
        year: dob.getFullYear(),
        month: dob.getMonth() + 1,
        day: dob.getDate()
      };
    }
    this.config = {
      displayKey: "firstName",
      search: true,
      limitTo: 0,
      placeholder: "Select Reporting Manager",
      noResultsFound: "No results found!",
      searchPlaceholder: "Search",
      searchOnKey: "firstName",
      clearOnSelection: false,
    };
  }

  selectionChanged(args) {
    this.addForm.get("reportingManager").patchValue(args.value.id);
  }
  getJobList() {
    this.employeeJobTitleService.getAll().subscribe(result => {
      this.jobTitleId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Job Title Details');
      });
  }

  getEmployeeNumber() {
    this.employeeNumbersService.getAllActiveNumberSeries().subscribe(result => {
      this.numberSeriesId = result;
      console.log('numberseries',this.numberSeriesId)

    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Number Series Details');
      });
  }

  getEmployeeList() {
    this.employeeService.getAll().subscribe(result => {
      this.employeeList = result;
      this.employeeList = result.filter(employee => employee.id !== this.id);
      const details = this.employeeList.find(emp => emp.id === this.reportingManager);
      this.selectedDatasource=details.firstName
      //this.editForm.patchValue({ reportingManager: this.selectedDatasource });
      this.selectionChanged(details)
    },
      error => {
        console.error(error);
      });
  }

  formatter = (employee) => employee.firstName;

  // search = (text$: Observable<string>) => text$.pipe(
  //   debounceTime(200),
  //   distinctUntilChanged(),
  //   filter(term => term.length >= 2),
  //   map(term => this.employeeList.filter(employee => new RegExp(term, 'mi').test(employee.firstName)).slice(0, 10))
  // )
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

  selected($event) {
    this.addForm.patchValue({ reportingManager: $event.item.id });
  }

  getNumberSeries(id) {
    const seriesValue = this.numberSeriesId.find((employeeNumber) => employeeNumber.id == id);
    const addJobDetails = this.addForm.value;
    seriesValue.nextNumber = seriesValue.nextNumber;
    seriesValue.digitInNumber = seriesValue.digitInNumber;
    addJobDetails.employeeNumber = (seriesValue.prefix).concat(padAtStrt(seriesValue.nextNumber, seriesValue.digitInNumber, 0));
   // this.employeeNumber = (seriesValue.prefix).concat(padAtStrt(seriesValue.nextNumber, seriesValue.digitInNumber, 0));
    //preview: `${form.prefix}${padAtStrt(form.nextNumber, form.digitInNumber, 0)}${form.suffix}`
    this.employeeNumber = (seriesValue.prefix).concat(padAtStrt(seriesValue.nextNumber, seriesValue.digitInNumber, 0).concat(seriesValue.suffix));
  }

  getBranches() {
    debugger
    this.branchService.getAll().subscribe(result => {
      this.location = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the branches');
      });
  }

  onSubmit() {
    const addJobDetails = this.addForm.getRawValue();
    // addJobDetails.reportingManager = addJobDetails.reportingManager.id;
  
    addJobDetails.employeeId = this.passEmployeeId;
    addJobDetails.branchId = addJobDetails.location;
    addJobDetails.companyId = this.location.find(c => c.id == addJobDetails.branchId).companyId;
    // addJobDetails.numberSeriesId = parseInt(addJobDetails.numberSeriesId, 10);
    this.employeeJobDetailsService.add(addJobDetails).subscribe((result)=>{
      addJobDetails.switchResult=result
      this.jobDetailsForm.emit(addJobDetails);
      this.toastr.showSuccessMessage('Employee Job details added successfully!');
      
    })
    
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: 0,
      dateOfJoin: ['', [
        Validators.required
      ]],
      numberSeriesId: ['', [
        Validators.required
      ]],
      employeeNumber: [''],
      jobTitleId: ['', [
        Validators.required
      ]],
      secondaryJobTitle: ['',[
        //Validators.required,
        Validators.maxLength(26),
      ]],
      businessUnit: ['', [
        Validators.required,
      ]],
      department: ['', [
        Validators.required
      ]],
      location: ['', [
        Validators.required
      ]],
      reportingManager: ['', [
        Validators.required
      ]],
      workerType: ['', [
        Validators.required
      ]],
      timeType: ['', [
        Validators.required
      ]],
      probationPeriod: ['', [
        Validators.required,Validators.max(365)
      ]],
      periodType: [3],
      noticePeriod: ['', [
        Validators.required
      ]],
      categoryId: ['', [
        Validators.required
      ]],
      visaDesignationId: ['', [
        Validators.required
      ]],
      branchId: [''],
      companyId: [''],
      createdDate: [new Date()],
    });
  }

}

