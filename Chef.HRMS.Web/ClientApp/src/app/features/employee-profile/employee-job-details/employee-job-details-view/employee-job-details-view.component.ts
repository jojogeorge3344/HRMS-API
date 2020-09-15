import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';

import { EmployeeJobDetailsService } from '../employee-job-details.service';
import { BranchService } from '@settings/branch/branch.service';
import { EmployeeJobTitleService } from '@settings/employee/employee-job-title/employee-job-title.service';

import { Branch } from '@settings/branch/branch';
import { EmployeeJobDetails } from '../employee-job-details.model';
import { EmployeeJobTitle } from '@settings/employee/employee-job-title/employee-job-title.model';

import { DepartmentType } from '../../../../models/common/types/departmenttype';
import { NoticePeriodType } from '../../../../models/common/types/noticeperiodtype';
import { GenderType } from '../../../../models/common/types/gendertype';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeService } from '@features/employee/employee.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-job-details-view',
  templateUrl: './employee-job-details-view.component.html'
})
export class EmployeeJobDetailsViewComponent implements OnInit {
  currentUserId: number;
  jobDetailsInfo: EmployeeJobDetails;
  departmentType = DepartmentType;
  noticePeriodType = NoticePeriodType;
  genderType = GenderType;
  jobTitleName: any;
  branches: Branch[] = [];
  jobTitles: EmployeeJobTitle[];

  constructor(
    private jobDetailsService: EmployeeJobDetailsService,
    private employeeService: EmployeeService,
    private toastr: ToasterDisplayService,
    private employeeJobTitleService: EmployeeJobTitleService,
    private branchService: BranchService,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getJobDetails();
    this.getBranches();
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
  showLocation(location) {

    if (this.branches.length) {

      const branch = this.branches.find(branch => branch.id == location);
      if (branch) {
        return `${branch.shortName} - ${branch.city}`;
      } else {
        return null;
      }
    }
    return null;

  }

  getJobDetails() {
    forkJoin([this.jobDetailsService.get(this.currentUserId), this.employeeJobTitleService.getAll(), this.employeeService.getAll()])
      .subscribe(([details, titles, employees]) => {
        this.jobTitleName = titles.find(title => title.id === details.jobTitleId);
        this.jobTitles = titles;
        if (details.reportingManager && employees.length) {
          const emp = employees.find(employee => employee.id === details.reportingManager);
          details.reportingTo = `${emp.firstName} ${emp.middleName || ''} ${emp.lastName}`;
        }
        this.jobDetailsInfo = details;
      });
  }
}
