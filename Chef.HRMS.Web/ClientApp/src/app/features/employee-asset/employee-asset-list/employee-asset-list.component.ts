import { Component, OnInit } from '@angular/core';
import { EmployeAssetService } from '../employe-asset.service';
import { AssetEmployeeWise } from '../employee-asset.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeAssetViewComponent } from '../employee-asset-view/employee-asset-view.component';
import { EmployeeAssetRequestsComponent } from '../employee-asset-requests/employee-asset-requests.component';
import { EmployeeAssetAllocatedComponent } from '../employee-asset-allocated/employee-asset-allocated.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'hrms-employee-asset-list',
  templateUrl: './employee-asset-list.component.html',
})
export class EmployeeAssetListComponent implements OnInit {
  employees:AssetEmployeeWise[];

  constructor(private employeeAsset:EmployeAssetService,
              public modalService: NgbModal,
              private router: Router,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getAll();
    
  }

getAll() {
    this.employeeAsset.getAll().subscribe(result => {
      this.employees=result
      console.log(this.employees);
      
  })
  }


  openAllocatedAssets(employees) {
    const modalRef = this.modalService.open(EmployeeAssetAllocatedComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    // modalRef.componentInstance.employees = employees;
    this.employeeAsset.setListDetails({data: employees})

    modalRef.result.then((result) => {
        if (result == 'submit') {
          // this.getJobList();
        }
    });
  }

  openReuests(employees) {
    const modalRef = this.modalService.open(EmployeeAssetRequestsComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.employees = employees;

    modalRef.result.then((result) => {
        if (result == 'submit') {
          // this.getJobList();
        }
    });
  }


  // openView(employees) {
  //   const modalRef = this.modalService.open(EmployeeAssetViewComponent,
  //     { size: 'lg', centered: true, backdrop: 'static' });

  //   modalRef.componentInstance.employees = employees;

  //   modalRef.result.then((result) => {
  //       if (result == 'submit') {
  //         // this.getJobList();
  //       }
  //   });
  // }

  openView(employees) {
    this.router.navigate(
      ['./' + employees.id + '/view'],
      { relativeTo: this.route.parent });
      this.employeeAsset.setListDetails({data: employees})
  }





}
