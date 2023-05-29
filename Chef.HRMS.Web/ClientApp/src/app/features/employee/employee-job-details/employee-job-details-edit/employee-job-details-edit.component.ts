import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeJobDetailsService } from '../employee-job-details.service';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeJobTitleService } from '@settings/employee/employee-job-title/employee-job-title.service';
import { EmployeeNumbersService } from '@settings/employee/employee-numbers/employee-numbers.service';
import { ActivatedRoute } from '@angular/router';
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
import { padAtStrt } from '@shared/utils/utils.functions';
@Component({
  selector: 'hrms-employee-job-details-edit',
  templateUrl: './employee-job-details-edit.component.html',
  styleUrls: ['./employee-job-details.edit.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeJobDetailsEditComponent implements OnInit {

  editForm: FormGroup;
  currentUserId: number;
  id: any;
  jobDetailsId: any;
  jobTitleId:any;
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
  employeeList:any;
  reportingManager: number;
  groupCategory: any;
  visaDesignation:any;
  config;
  selectedDatasource:any;
  checkFlag: boolean;
  seriesName;
  categoryObj;
  employeeObj;
  designationName;
  location: any;
  loctaionObj: any;
  visaDesignationName: any;

  @Output() getEditByCreateJobId = new EventEmitter<any>();
  @Input() jobDetailsparamsId:any
  numberSeries: number;

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
 
    if(!this.jobDetailsparamsId){
      this.route.params.subscribe((params: any) => {
        this.jobDetailsId = params.jobDetailsId;
        this.id = parseInt(params.id, 10);
      });
    }else{
      
      this.route.params.subscribe((params: any) => {
        this.jobDetailsId =this.jobDetailsparamsId;
        this.id = parseInt(params.id, 10);
      });
   
    }

    this.businessUnitTypeKeys = Object.keys(this.businessUnitType).filter(Number).map(Number);
    this.departmentTypeKeys = Object.keys(this.departmentType).filter(Number).map(Number);
    this.workerTypeKeys = Object.keys(this.workerType).filter(Number).map(Number);
    this.timeTypeKeys = Object.keys(this.timeType).filter(Number).map(Number);
    this.periodTypeKeys = Object.keys(this.periodType).filter(Number).map(Number);
    this.noticePeriodTypeKeys = Object.keys(this.noticePeriodType).filter(Number).map(Number);
    this.getBasicDetailsId(); 
    this.getJobList();
    this.getEmployeeNumber();
    this.getBranches();
    this.getEmployeeList();
    this.getGroupCategory()
    this.employeeJobDetailsService.getVisaDesignation().subscribe((result)=>{
       this.visaDesignation=result;
    })
    this.config = {
      displayKey: "firstName",
      search: true,
      limitTo: 0,
      placeholder: "Select Reporting Manager",
      noResultsFound: "No results found!",
      searchPlaceholder: "Search",
      searchOnKey: "firstName",
      clearOnSelection: true,
    };
    this.employeeJobDetailsService.getProbation().subscribe((result)=>{
      this.editForm.patchValue({
        probationPeriod:result[0].probationDuration,
        periodType:result[0].periodType,
        workerType:result[0].workerType,
        timeType:result[0].timeType
      })
      })
  }
  ngAfterViewInit(){
    this.getJobDetailsId();
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
      result.dateOfJoin = new Date(result.dateOfJoin);
      localStorage.setItem('doj',JSON.stringify(result.dateOfJoin))
      this.numberSeries=result.numberSeriesId;
      this.editForm.patchValue(result);
      if(this.editForm.value.numberSeriesId){
        this.editForm.get('numberSeriesId').disable();
        this.checkFlag=true
      }else{
        this.editForm.get('numberSeriesId').enable();
        this.checkFlag=false
      }
      let designationItem = this.jobTitleId.find((item) => this.editForm.get('jobTitleId').value == item.id)
      let visaDesigItem = this.jobTitleId.find((item) => this.editForm.get('visaDesignationId').value == item.id)
      this.visaDesignationName=visaDesigItem;
      this.designationName = designationItem;
      let seriesItem = this.numberSeriesId.find((item) => this.editForm.get('numberSeriesId').value == item.id)
      this.seriesName = seriesItem;
      let item = this.location.find((item) => this.editForm.get('location').value == item.id)
      this.loctaionObj = item;
      let categoryItem = this.groupCategory.find((item) => this.editForm.get('categoryId').value == item.id)
      this.categoryObj = categoryItem;
      let employeeItem = this.employeeList.find((item) => this.editForm.get('reportingManager').value == item.id)
      this.employeeObj = employeeItem;


    },
      error => {
        console.error(error);
      });
  }

  getJobList() {
    this.employeeJobTitleService.getAll().subscribe(result => {
      let temp = { id: undefined, name: 'test', isLastRow: true };
      // lastrow
      this.jobTitleId = [...result, temp];
      // let designationItem = result.find((item) => this.editForm.get('jobTitleId').value == item.id)
      // let visaDesigItem = result.find((item) => this.editForm.get('visaDesignationId').value == item.id)
      // this.visaDesignationName=visaDesigItem;
      // this.designationName = designationItem;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Job Title Details');
      });
  }
  getGroupCategory() {
    this.employeeJobDetailsService.getCategory().subscribe((result: any) => {
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
      this.groupCategory = [...result, temp];

    })
  }

  getEmployeeList() {
    this.employeeService.getAll().subscribe(result => {
      let temp = { id: undefined, firstName: 'test', isLastRow: true }
      // lastrow
      this.employeeList = [...result, temp];
    },
      error => {
        console.error(error);
      });
  }
  selectDesignation(args) {
    this.editForm.patchValue({
      jobTitleId: args.value.id
    })
  }
  selectVisaDesignation(args){
    this.editForm.patchValue({
      visaDesignationId: args.value.id
    })
  }
  selectLocation(args) {
    this.editForm.patchValue({
      location: args.value.id
    })
  }
  selectEmpCategory(args) {
    this.editForm.patchValue({
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

  formatter = (employee) => employee.firstName;

  // search = (text$: Observable<string>) => text$.pipe(
  //   debounceTime(200),
  //   distinctUntilChanged(),
  //   filter(term => term.length >= 2),
  //   map(term => this.employeeList.filter(employee => new RegExp(term, 'mi').test(employee.firstName)).slice(0, 10))
  // )

  // selected($event) {
  //   this.editForm.patchValue({ reportingManager: $event.item.firstName });
  // }
  selectionChanged(args) {
    this.editForm.get("reportingManager").patchValue(args.value.id);
  }

  getEmployeeNumber() {
    this.employeeNumbersService.getAllActiveNumberSeries().subscribe(result => {
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
      this.numberSeriesId = [...result, temp];
      // let seriesItem = result.find((item) => this.editForm.get('numberSeriesId').value == item.id)
      // this.seriesName = seriesItem;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Number Series Details');
      });
  }

  // getNumberSeries(id){
  //   var editJobDetails =this.editForm.value;
  //   let seriesValue =this.numberSeriesId.find((employeeNumber)=>employeeNumber.id==id);
  //   editJobDetails.employeeNumber = (seriesValue.prefix).concat('-',seriesValue.nextNumber);
  //   this.employeeNumber = (seriesValue.prefix).concat('-',seriesValue.nextNumber);
  // }

  getBranches() {
    this.branchService.getAll().subscribe(result => {
      let temp = { id: undefined, shortName: 'test', isLastRow: true }
      // lastrow
      this.location = [...result, temp];
      // let item = result.find((item) => this.editForm.get('location').value == item.id)
      // this.loctaionObj = item;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the branches');
      });
  }
  getNumberSeries(args) {
    this.editForm.patchValue({
      numberSeriesId: args.value.id
    })
    const seriesValue = this.numberSeriesId.find((employeeNumber) => employeeNumber.id == args.value.id);
    const addJobDetails = this.editForm.value;
    seriesValue.nextNumber = seriesValue.nextNumber;
    seriesValue.digitInNumber = seriesValue.digitInNumber;
    addJobDetails.employeeNumber = (seriesValue.prefix).concat(padAtStrt(seriesValue.nextNumber, seriesValue.digitInNumber, 0));
   // this.employeeNumber = (seriesValue.prefix).concat(padAtStrt(seriesValue.nextNumber, seriesValue.digitInNumber, 0));
    //preview: `${form.prefix}${padAtStrt(form.nextNumber, form.digitInNumber, 0)}${form.suffix}`
    this.employeeNumber = (seriesValue.prefix).concat(padAtStrt(seriesValue.nextNumber, seriesValue.digitInNumber, 0).concat(seriesValue.suffix));
  }
  onSubmit() {
    const editJobDetails = this.editForm.value;
    debugger
    editJobDetails.numberSeriesId= this.editForm.get('numberSeriesId').value
    // editJobDetails.branchId = editJobDetails.location;
    // editJobDetails.companyId = this.branches.find(c => c.id == editJobDetails.branchId).companyId;
    editJobDetails.employeeId = parseInt(this.id, 10);
    editJobDetails.id = parseInt(this.jobDetailsId, 10);
    editJobDetails.createdDate=this.editForm.value.createdDate ? this.editForm.value.createdDate : new Date()
    // editJobDetails.reportingManager = editJobDetails.reportingManager.id;
    if(this.checkFlag==true){
    this.employeeJobDetailsService.update(editJobDetails).subscribe((result: any) => {
      this.toastr.showSuccessMessage('Employee Job Details updated successfully!');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to update the Employee Job Details');
      });
    }else{
      this.employeeJobDetailsService.add(editJobDetails).subscribe((result)=>{
        this.getEditByCreateJobId.emit(result)
        this.toastr.showSuccessMessage('Employee Job details added successfully!');
      })
      
    }  
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
      secondaryJobTitle: ['',[Validators.maxLength(26)]],
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
        Validators.required,Validators.max(365)
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
