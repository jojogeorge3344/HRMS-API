import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';

import { EmployeeJobTitleCreateComponent } from '../employee-job-title-create/employee-job-title-create.component';
import { EmployeeJobTitleEditComponent } from '../employee-job-title-edit/employee-job-title-edit.component';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeJobTitleService } from '../employee-job-title.service';
import { EmployeeJobTitle } from '../employee-job-title.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { EmployeeJobTitleViewComponent } from '../employee-job-title-view/employee-job-title-view.component';

@Component({
  selector: 'hrms-employee-job-title-list',
  templateUrl: './employee-job-title-list.component.html'
})
export class EmployeeJobTitleListComponent implements OnInit {

  jobTitles: EmployeeJobTitle[];
  jobTitleNames: string[];
  searchKey: string = "";
  filteredJobTitles: EmployeeJobTitle[];
  constructor(
    private employeeJobTitleService: EmployeeJobTitleService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService
    ) { }

  ngOnInit(): void {
    this.getJobList();
  }

  getJobList() {
    this.employeeJobTitleService.getAllJobTitleList().subscribe(result => {
      this.jobTitles = result;
      this.filteredJobTitles = result;
      this.jobTitleNames = this.jobTitles.map(a => a.name.toLowerCase());
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Job Title Details');
    });
  }

  isDisabled(jobTitle) {
    return (jobTitle.numberOfEmployees > 0);
  }

  openCreate() {
    const modalRef = this.modalService.open(EmployeeJobTitleCreateComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.jobTitleNames = this.jobTitleNames;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getJobList();
      }
    });
  }

  openEdit(jobTitle: EmployeeJobTitle) {
    const modalRef = this.modalService.open(EmployeeJobTitleEditComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.jobId = jobTitle.id;
    modalRef.componentInstance.jobTitleNames = this.jobTitleNames.filter(v => v !== jobTitle.name.toLowerCase());

    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getJobList();
        }
    });
  }

  openView(jobTitle: EmployeeJobTitle) {
    const modalRef = this.modalService.open(EmployeeJobTitleViewComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.jobId = jobTitle.id;
    modalRef.componentInstance.jobTitleNames = this.jobTitleNames.filter(v => v !== jobTitle.name.toLowerCase());

    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getJobList();
        }
    });
  }

  openViewList(jobTitle: EmployeeJobTitle) {
    const modalRef = this.modalService.open(EmployeeListComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.jobTitle = jobTitle;

    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getJobList();
        }
    });
  }

  delete(jobTitle: EmployeeJobTitle) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the Job Title ${jobTitle.name}?`;
    modalRef.result.then((userResponse) => {
        if (userResponse == true) {
          this.employeeJobTitleService.delete(jobTitle.id).subscribe(() => {
            this.toastr.showSuccessMessage('The Job Title deleted successfully!');
            this.getJobList();
          });
        }
    });
  }
  searchEmployee(): void {
    this.filteredJobTitles = this.jobTitles.filter(
      (emp) =>
        emp.name?.toLowerCase().includes(this.searchKey.toLowerCase())
    );
  }
}
