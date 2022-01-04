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

  getAllEmployeeDetails(){
    this.employeeAsset.getAllEmployeeDetails().subscribe(result => {
      console.log(result);  
      // this.employees===result
    })
  }

  getAllAllocatedAssets() {
    this.employeeAsset.getAllAllocatedAssets().subscribe(result => {
      console.log(result); 
      // this.employees===result.allocatedAssets 
  })
}

getAllRequests() {
    this.employeeAsset.getAllRequests().subscribe(result => {
      console.log(result); 
      // this.employees===result.requests 
  })
  }
  openViewList(employeAsset: AssetEmployeeWise) {
    const modalRef = this.modalService.open(EmployeeAssetViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.employeAsset = employeAsset;

    modalRef.result.then((result) => {
        if (result == 'submit') {
          // this.getJobList();
        }
    });
  }


}
