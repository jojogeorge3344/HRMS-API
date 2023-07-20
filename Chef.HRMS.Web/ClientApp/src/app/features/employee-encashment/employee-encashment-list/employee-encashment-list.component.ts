import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { getCurrentUserId } from '@shared/utils/utils.functions';

import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

import { ActivatedRoute, Router } from '@angular/router';
import {EmployeeEncashmentService} from 'src/app/features/employee-encashment/employee-encashment.service'

@Component({
  selector: 'hrms-employee-encashment-list',
  templateUrl: './employee-encashment-list.component.html',
  styleUrls: ['./employee-encashment-list.component.scss']
})
export class EmployeeEncashmentListComponent implements OnInit {

  currentUserId: number;
  encashmentRequest:any=[]
  constructor(
    public modalService: NgbModal,
    private EmployeeEncashmentService:EmployeeEncashmentService,
    private toastr: ToasterDisplayService,
    private router: Router,
    private route: ActivatedRoute,
    
  ) { 

  }

  ngOnInit() {
    this.currentUserId = getCurrentUserId();
    this.getEmployeeEncashmentList()
  }
  createEncashment(){
    
    this.router.navigate(["./create/"], { relativeTo: this.route.parent });
  }

  openEdit(id){

    this.router.navigate( [
      "./" +
        id +
        "/edit/"
    ],{ relativeTo: this.route.parent });

  }
  openView(id){
    this.router.navigate( [
      "./" +
        id +
        "/view/"
    ],{ relativeTo: this.route.parent });

  }

  delete(id) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete Employee Encashment ?`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.EmployeeEncashmentService.delete(id).subscribe(() => {
          this.toastr.showSuccessMessage('The Employee Encashment request is deleted successfully!');
           this.getEmployeeEncashmentList()
          
        });
     
      }
    });
  }
  process(id) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to Process Employee Encashment ?`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.EmployeeEncashmentService.process(id).subscribe(() => {
          this.toastr.showSuccessMessage('The Employee Encashment request is processed successfully!');
           this.getEmployeeEncashmentList()
          
        });
     
      }
    });
  }
  getEmployeeEncashmentList() {
    debugger
    this.encashmentRequest =[]
    this.EmployeeEncashmentService.getAll().subscribe(result => {
      this.encashmentRequest = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch Employee Encashment');
      });
  }
}





