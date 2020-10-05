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

@Component({
  selector: 'hrms-employee-job-details-create',
  templateUrl: './employee-job-details-create.component.html',
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

  @Input() id: any;
  location: Branch[];
  @Output() jobDetailsForm = new EventEmitter<boolean>();
  @Input() dob: any;
  @Input() jobDetails: any;
  constructor(
    private employeeService: EmployeeService,
    private employeeJobTitleService: EmployeeJobTitleService,
    private employeeNumbersService: EmployeeNumbersService,
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
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    if (this.jobDetails != null) {
      this.addForm.patchValue(this.jobDetails);
      this.employeeNumber = this.jobDetails.employeeNumber;
    }
    this.route.params.subscribe((params: any) => {
      this.id = params.id;
    });

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

    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Number Series Details');
      });
  }

  getEmployeeList() {
    this.employeeService.getAll().subscribe(result => {
      this.employeeList = result;
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
    this.employeeNumber = (seriesValue.prefix).concat(padAtStrt(seriesValue.nextNumber, seriesValue.digitInNumber, 0));
  }

  getBranches() {
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
    addJobDetails.reportingManager = addJobDetails.reportingManager.id;
    this.jobDetailsForm.emit(addJobDetails);

  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: this.id,
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
      periodType: [3],
      noticePeriod: ['', [
        Validators.required
      ]],
      branchId: [''],
      companyId: [''],
      createdDate: [new Date()],
      createdBy: [this.currentUserId],
      modifiedBy: [this.currentUserId]
    });
  }

}
