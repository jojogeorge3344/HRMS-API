import { Component, OnInit } from '@angular/core';
import { EmployeAssetService } from '../employe-asset.service';
import { AssetEmployeeWise } from '../employee-asset.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeAssetViewComponent } from '../employee-asset-view/employee-asset-view.component';

@Component({
  selector: 'hrms-employee-asset-list',
  templateUrl: './employee-asset-list.component.html',
})
export class EmployeeAssetListComponent implements OnInit {
  employees:AssetEmployeeWise[];

  constructor(private employeeAsset:EmployeAssetService,
              public modalService: NgbModal,) { }

  ngOnInit(): void {
  }

getAll() {
    this.employeeAsset.getAll().subscribe(result => {
      console.log(result); 
      // this.employees===result.requests 
  })
  }


  openAllocatedAssets(employees) {
    const modalRef = this.modalService.open(EmployeeAssetViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.employees = employees;

    modalRef.result.then((result) => {
        if (result == 'submit') {
          // this.getJobList();
        }
    });
  }

  openReuests(employees) {
    const modalRef = this.modalService.open(EmployeeAssetViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.employees = employees;

    modalRef.result.then((result) => {
        if (result == 'submit') {
          // this.getJobList();
        }
    });
  }

  openView(employees) {
    const modalRef = this.modalService.open(EmployeeAssetViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.employees = employees;

    modalRef.result.then((result) => {
        if (result == 'submit') {
          // this.getJobList();
        }
    });
  }




}
