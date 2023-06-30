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
import { EmployeeJobDetails } from '../employee-job-details.model';

@Component({
  selector: 'hrms-employee-job-details-create',
  templateUrl: './employee-job-details-create.component.html',
  styleUrls: ['./employee-job-details.create.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeJobDetailsCreateComponent implements OnInit {

  addForm: FormGroup;
  department: object;
  jobTitleId;
  numberSeriesId: any;
  noticePeriod: object;
  employeeNumber = '';
  businessUnitTypeKeys: number[];
  groupCategory;
  visaDesignation: any;
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
  employeeList: any;
  employeeObj;
  seriesName;
  designationName;
  location: any;
  loctaionObj: any;
  categoryObj: any;
  visaDesignationName: any;
  isLoading=false;
  @Input() id: any;
  @Output() jobDetailsForm = new EventEmitter<boolean>();
  @Input() dob: any;
  @Input() jobDetails: any;
  @Input() passEmployeeId: any
  constructor(
    private employeeService: EmployeeService,
    private employeeJobTitleService: EmployeeJobTitleService,
    private employeeNumbersService: EmployeeNumbersService,
    private employeeJobDetailsService: EmployeeJobDetailsService,
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
    debugger
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
          this.addForm.patchValue(result);
    
        },)
      }
      
    });
    this.employeeJobDetailsService.getCategory().subscribe((result)=>{      
      this.groupCategory=result;  
    })

    // this.employeeJobDetailsService.getCategory().subscribe((result)=>{      
    //   this.groupCategory=result;  
    // })

    this.employeeJobDetailsService.getVisaDesignation().subscribe((result) => {
      this.visaDesignation = result;
    })
    this.employeeJobDetailsService.getProbation().subscribe((result) => {
      this.addForm.patchValue({
        probationPeriod: result[0].probationDuration,
        periodType: result[0].periodType,
        workerType: result[0].workerType,
        timeType: result[0].timeType
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
    this.getGroupCategory()
    if (this.dob != undefined) {
      const dob = new Date(this.dob);
      this.minDate = {
        year: dob.getFullYear(),
        month: dob.getMonth() + 1,
        day: dob.getDate()
      };
    }

  }
  getGroupCategory() {
    this.isLoading=true;
    this.employeeJobDetailsService.getCategory().subscribe((result: any) => {
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
      this.groupCategory = [...result, temp];
      this.isLoading=false;
      this.categoryObj = result.find((item) => this.addForm.get('categoryId').value == item.id)

    })
  }
  selectionChanged(args) {
    this.addForm.patchValue({
      reportingManager: args.value.id
    })
  }
  getJobList() {
    this.isLoading=true;
    this.employeeJobTitleService.getAll().subscribe(result => {
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
      this.jobTitleId = [...result, temp];
      this.isLoading=false;
      this.designationName= result.find((item) => this.addForm.get('jobTitleId').value == item.id)
      this.visaDesignationName = result.find((item) => this.addForm.get('visaDesignationId').value == item.id)
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Job Title Details');
      });
  }

  getEmployeeNumber() {
    this.isLoading=true;
    this.employeeNumbersService.getAllActiveNumberSeries().subscribe(result => {
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
      this.numberSeriesId = [...result.filter(item=>item.isActive==true), temp];
      this.isLoading=false;
      this.seriesName = result.find((item) => this.addForm.get('numberSeriesId').value == item.id)
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Number Series Details');
      });
  }
  refreshNumberSeries(event) {
    event.stopPropagation();
    event.preventDefault();
    this.getEmployeeNumber()
  }
  getEmployeeList() {
    this.isLoading=true;
    this.employeeService.getAll().subscribe(result => {
      let temp = { id: undefined, firstName: 'test', isLastRow: true }
      // lastrow
      this.employeeList = [...result, temp];
      this.isLoading=false;
      this.employeeObj = result.find((item) => this.addForm.get('reportingManager').value == item.id)
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


  getNumberSeries(args) {
    this.addForm.patchValue({
      numberSeriesId: args.value.id
    })
    const seriesValue = this.numberSeriesId.find((employeeNumber) => employeeNumber.id == args.value.id);
    const addJobDetails = this.addForm.value;
    seriesValue.nextNumber = seriesValue.nextNumber;
    seriesValue.digitInNumber = seriesValue.digitInNumber;
    addJobDetails.employeeNumber = (seriesValue.prefix).concat(padAtStrt(seriesValue.nextNumber, seriesValue.digitInNumber, 0));
    // this.employeeNumber = (seriesValue.prefix).concat(padAtStrt(seriesValue.nextNumber, seriesValue.digitInNumber, 0));
    //preview: `${form.prefix}${padAtStrt(form.nextNumber, form.digitInNumber, 0)}${form.suffix}`
    this.employeeNumber = (seriesValue.prefix).concat(padAtStrt(seriesValue.nextNumber, seriesValue.digitInNumber, 0).concat(seriesValue.suffix));
  }
  selectDesignation(args) {
    this.addForm.patchValue({
      jobTitleId: args.value.id
    })
  }
  selectVisaDesignation(args){
    this.addForm.patchValue({
      visaDesignationId: args.value.id
    })
  }
  selectLocation(args) {
    this.addForm.patchValue({
      location: args.value.id
    })
  }
  selectEmpCategory(args) {
    this.addForm.patchValue({
      categoryId: args.value.id
    })
  }
  refreshCategory(event) {
    event.stopPropagation();
    event.preventDefault();
    this.getGroupCategory()
  }
  refreshLocation(event) {
    event.stopPropagation();
    event.preventDefault();
    this.getBranches()
  }

  refreshDesignation(event) {
    event.stopPropagation();
    event.preventDefault();
    this.getJobList()
  }
  refreshRepManager(event) {
    event.stopPropagation();
    event.preventDefault();
    this.getEmployeeList()
  }
  getBranches() {
    this.isLoading=true;
    this.branchService.getAll().subscribe(result => {
      let temp = { id: undefined, shortName: 'test', isLastRow: true }
      // lastrow
      this.location = [...result, temp];
      this.isLoading=false;
      this.loctaionObj = result.find((item) => this.addForm.get('location').value == item.id)
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the branches');
      });
  }

  onSubmit() {
    debugger
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
      secondaryJobTitle: ['', [
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
        Validators.required, Validators.max(365)
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

