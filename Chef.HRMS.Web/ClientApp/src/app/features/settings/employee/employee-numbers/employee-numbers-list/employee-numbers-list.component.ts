import { EmployeeNumbers } from './../employee-numbers.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { EmployeeNumbersCreateComponent } from '../employee-numbers-create/employee-numbers-create.component';
import { EmployeeNumbersEditComponent } from '../employee-numbers-edit/employee-numbers-edit.component';
import { EmployeeNumbersService } from '../employee-numbers.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-numbers-list',
  templateUrl: './employee-numbers-list.component.html'
})
export class EmployeeNumbersListComponent implements OnInit, OnDestroy {

  employeeNumberSeries: EmployeeNumbers[];
  assignedNumberSeries: number[] = [];
  employeeNumberSeriesNames: string[];

  constructor(
    private employeeNumbersService: EmployeeNumbersService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService
    ) { }

  ngOnInit(): void {
    this.getemployeenumberseries();
    this.getAssignedNumberSeries();
  }

  ngOnDestroy(): void {
    this.modalService.dismissAll()
  }

  getemployeenumberseries() {
    this.employeeNumbersService.getAll().subscribe(result => {
      this.employeeNumberSeries = result;
      this.employeeNumberSeriesNames = this.employeeNumberSeries.map(a => a.name.toLowerCase());
    });
  }

  getAssignedNumberSeries() {
    this.employeeNumbersService.getAllAssignedNumberSeries().subscribe(result => {
      this.assignedNumberSeries = result;
    },
    error => {
      console.error(error);
    });
  }

  isDisabled(employeeSeries) {
    return (this.assignedNumberSeries.includes(employeeSeries.id) || employeeSeries.isActive);
  }

  openCreate() {
    const modalRef = this.modalService.open(EmployeeNumbersCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.numberSeriesNames = this.employeeNumberSeriesNames;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getemployeenumberseries();
      }
    });
  }

  openEdit(employeeSeries) {
    const modalRef = this.modalService.open(EmployeeNumbersEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.employeeSeries = employeeSeries;
    modalRef.componentInstance.isDisabled = this.isDisabled(employeeSeries);
    modalRef.componentInstance.numberSeriesNames = this.employeeNumberSeriesNames.filter(v => v !== employeeSeries.name.toLowerCase());

    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getemployeenumberseries();
        }
    });
  }

  delete(id: number, name: string) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the Employee Number Series ${name}?`;
    modalRef.result.then((userResponse) => {
        if (userResponse == true) {
          this.employeeNumbersService.delete(id).subscribe(() => {
            this.toastr.showSuccessMessage('The Employee Number Series deleted successfully!');
            this.getemployeenumberseries();
          });
        }
    });
  }

}
