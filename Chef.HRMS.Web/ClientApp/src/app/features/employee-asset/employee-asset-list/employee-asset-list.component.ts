import { Component, OnInit } from '@angular/core';
import { EmployeAssetService } from '../employe-asset.service';
import { AssetEmployeeWise } from '../employee-asset.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { WorkerType } from 'src/app/models/common/types/workertype';

@Component({
  selector: 'hrms-employee-asset-list',
  templateUrl: './employee-asset-list.component.html',
})
export class EmployeeAssetListComponent implements OnInit {
  employees:AssetEmployeeWise[];
  counts;
  requestedBy:number;
  requestedByName:string;
  list: any;
  empStatus=WorkerType;

  constructor(private employeeAsset:EmployeAssetService,
              public modalService: NgbModal,
              private router: Router,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getAll();
  }

getAll() {
      forkJoin([
        this.employeeAsset.getAll(),  
        this.employeeAsset.GetAllCount()
      ])
      .subscribe(([employees,counts]) => {
         employees=employees.map((employee)=>{
            const selectedEmployee=counts.find(count => count.empId===employee.id)
            if(selectedEmployee){
              return {...employee,allocatedAsset:selectedEmployee.allocatedAsset,
                requests:selectedEmployee.requests,}
            }
            return {
              ...employee,allocatedAsset:0,
                requests:0
            }
          })
          console.log(employees);
          this.employees=employees;
      })
        
     
  }



  openAllocatedAssets(employees) {
    this.router.navigate(
      ['./' + employees.id + '/allocatedassets'],
      { relativeTo: this.route.parent });
      this.employeeAsset.setListDetails({data: employees})
  }


  openReuests(employees) {
    this.router.navigate(
      ['./' + employees.id + '/requests'],
      { relativeTo: this.route.parent });
      this.employeeAsset.setListDetails({data: employees})
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
