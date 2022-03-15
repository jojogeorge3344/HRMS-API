import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { EmployeeService } from '../employee.service';
import { DepartmentType } from 'src/app/models/common/types/departmenttype';
import { BranchService } from '@settings/branch/branch.service';
import { Employee } from '../employee.model';
import { EmployeeJobDetails } from '../employee-job-details/employee-job-details.model';
import { Branch } from '@settings/branch/branch';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {

  basicdetails: Employee;
  jobFilings: any;
  jobDetails: EmployeeJobDetails;
  employees: Employee[] = [];
  departmentType = DepartmentType;
  branches: Branch[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private branchService: BranchService,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getEmployeeDetails();
    this.getBranches();
  }

  getEmployeeDetails() {
    this.employeeService.getAll().subscribe(result => {
      this.employees = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Employee Details');
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

  showLocation(location) {
    if (this.branches.length && location) {
      const locationSearch = this.branches.find(c => c.id == location)
      return `${locationSearch.shortName} - ${locationSearch.city}`
    }
    return null;
  }

  openCreate() {
    this.router.navigate(['./create/'], { relativeTo: this.route.parent });
  }

  openEdit(employee: Employee) {
    this.router.navigate(
      ['./' + employee.id + '/edit/' + employee.jobDetailsId + '/' + employee.jobFilingId],
      { relativeTo: this.route.parent }
    );
  }

  openView(employee: Employee) {
    this.router.navigate(
      ['./' + employee.id + '/view/' + employee.jobDetailsId + '/' + employee.jobFilingId],
      { relativeTo: this.route.parent });
  }

  delete(employee: Employee) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the employee ${employee.firstName}, ${employee.lastName}?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.employeeService.delete(employee.id).subscribe(() => {
          this.toastr.showSuccessMessage('Employee deleted successfully!');
          this.getEmployeeDetails();
        });
      }
    });
  }

}

