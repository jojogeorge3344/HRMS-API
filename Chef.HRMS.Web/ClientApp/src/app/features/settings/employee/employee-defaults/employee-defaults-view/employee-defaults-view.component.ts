import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeDefaultsService } from '../employee-defaults.service';
import { EmployeeDefaultsEditComponent } from '../employee-defaults-edit/employee-defaults-edit.component';
import { EmployeeDefaults } from '../employee-defaults.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-defaults-view',
  templateUrl: './employee-defaults-view.component.html'
})
export class EmployeeDefaultsViewComponent implements OnInit, OnDestroy {
  employeeDefaults: EmployeeDefaults;

  constructor(
    http: HttpClient,
    private employeeDefaultsService: EmployeeDefaultsService,
    private router: Router,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService
  ) { }

  ngOnDestroy(): void {
    this.modalService.dismissAll()
  }

  ngOnInit(): void {
    this.getEmployeeDefaultList();
  }

  getEmployeeDefaultList() {
    this.employeeDefaultsService.getAll().subscribe(result => {
      this.employeeDefaults = result;
      console.log(result);
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Employee Defaults Details');
    });
  }

  openEditEmployeeSettings(id) {
    const modalRef = this.modalService.open(EmployeeDefaultsEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.employeeDefaultId = id;
    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getEmployeeDefaultList();
        }
    });
  }

}
