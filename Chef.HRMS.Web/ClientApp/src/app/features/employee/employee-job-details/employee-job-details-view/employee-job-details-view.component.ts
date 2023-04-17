import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeJobDetailsService } from '../employee-job-details.service';
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
import { EmployeeJobTitle } from '@settings/employee/employee-job-title/employee-job-title.model';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { Employee } from '@features/employee/employee.model';
import { EmployeeService } from '@features/employee/employee.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { EmployeeBasicDetailsService } from '@features/employee/employee-basic-details/employee-basic-details.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-job-details-view',
  templateUrl: './employee-job-details-view.component.html',
  styleUrls: ['./employee-job-details-view.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeJobDetailsViewComponent implements OnInit {

  editForm: FormGroup;
  currentUserId: number;
  id: any;
  jobDetailsId: any;
  jobTitleId: EmployeeJobTitle[];
  numberSeriesId: any;
  noticePeriod: object;
  employeeNumber = '';
  branches: any;
  businessUnitTypeKeys: number[];
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
  maxDate;
  minDate;
  employeeList: Employee[];
  reportingManager: number;
  groupCategory:any;
  visaDesignation:any;

  constructor(
    private employeeService: EmployeeService,
    private employeeJobDetailsService: EmployeeJobDetailsService,
    private employeeJobTitleService: EmployeeJobTitleService,
    private employeeNumbersService: EmployeeNumbersService,
    private branchService: BranchService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToasterDisplayService,
    private employeeBasicDetailsService: EmployeeBasicDetailsService,
  ) {
    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  ngOnInit(): void {
    
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.route.params.subscribe((params: any) => {
      this.jobDetailsId = params.jobDetailsId;
      this.id = parseInt(params.id, 10);
    });

    this.businessUnitTypeKeys = Object.keys(this.businessUnitType).filter(Number).map(Number);
    this.departmentTypeKeys = Object.keys(this.departmentType).filter(Number).map(Number);
    this.workerTypeKeys = Object.keys(this.workerType).filter(Number).map(Number);
    this.timeTypeKeys = Object.keys(this.timeType).filter(Number).map(Number);
    this.periodTypeKeys = Object.keys(this.periodType).filter(Number).map(Number);
    this.noticePeriodTypeKeys = Object.keys(this.noticePeriodType).filter(Number).map(Number);
    this.getBasicDetailsId();
    this.getJobDetailsId();
    this.getJobList();
    this.getEmployeeNumber();
    this.getBranches();

    this.employeeJobDetailsService.getCategory().subscribe((result)=>{      
      this.groupCategory=result;
    })

    this.employeeJobDetailsService.getVisaDesignation().subscribe((result)=>{
       this.visaDesignation=result;
    })
  }

  getBasicDetailsId() {
    this.employeeBasicDetailsService.get(this.id).subscribe(result => {
      result.dateOfBirth = new Date(result.dateOfBirth);
      if (result.dateOfBirth != undefined) {
        this.minDate = {
          year: result.dateOfBirth.getFullYear(),
          month: result.dateOfBirth.getMonth() + 1,
          day: result.dateOfBirth.getDate()
        };
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Employee Basic Details');
      });
  }
  getJobDetailsId() {
    this.employeeJobDetailsService.get(this.jobDetailsId).subscribe(result => {
      this.getEmployeeList();
      result.dateOfJoin = new Date(result.dateOfJoin);
      this.reportingManager = result.reportingManager;
      this.editForm.patchValue(result);
    },
      error => {
        console.error(error);
      });
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

  getEmployeeList() {
    this.employeeService.getAll().subscribe(result => {
      this.employeeList = result.filter(employee => employee.id !== this.id);
      const name = this.employeeList.find(emp => emp.id === this.reportingManager);
      this.editForm.patchValue({ reportingManager: name });
    },
      error => {
        console.error(error);
      });
  }

  formatter = (employee) => employee.firstName;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.employeeList.filter(employee => new RegExp(term, 'mi').test(employee.firstName)).slice(0, 10))
  )

  selected($event) {
    this.editForm.patchValue({ reportingManager: $event.item.firstName });
  }

  getEmployeeNumber() {
    this.employeeNumbersService.getAllActiveNumberSeries().subscribe(result => {
      this.numberSeriesId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Number Series Details');
      });
  }

  getBranches() {
    this.branchService.getAll().subscribe(result => {
      this.branches = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the branches');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [''],
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
      secondaryJobTitle: [''],
      businessUnit: ['', [
        Validators.required
      ]],
      department: ['', [
        Validators.required
      ]],
      location: ['', [
        Validators.required
      ]],
      branchId: [''],
      companyId: [''],
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
        Validators.required
      ]],
      periodType: [''],
      noticePeriod: ['', [
        Validators.required
      ]],
      categoryId: ['', [
        Validators.required
      ]],
      visaDesignationId: ['', [
        Validators.required
      ]],
      createdDate: [],
    });
  }

}
