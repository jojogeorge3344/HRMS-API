import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeRevisionManagementCreateComponent } from '../employee-revision-management-create/employee-revision-management-create.component';
import { EmployeeRevisionManagementEditComponent } from '../employee-revision-management-edit/employee-revision-management-edit.component';
import { EmployeeRevisionManagementService } from '../employee-revision-management.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { EmployeeRevisionManagementViewComponent } from '../employee-revision-management-view/employee-revision-management-view.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'hrms-employee-revision-management-list',
  templateUrl: './employee-revision-management-list.component.html',
  styleUrls: ['./employee-revision-management-list.component.scss']
})
export class EmployeeRevisionManagementListComponent implements OnInit {
  currentUserId: number;
  revisionRequest:any=[]
  constructor(
    public modalService: NgbModal,
    private EmployeeRevisionManagementService:EmployeeRevisionManagementService,
    private toastr: ToasterDisplayService,
    private router: Router,
    private route: ActivatedRoute,
    
  ) { 

  }

  ngOnInit() {
    this.currentUserId = getCurrentUserId();
    this.getRevisionRequest()
  }
  openAddRequest(){
    // const modalRef = this.modalService.open(EmployeeRevisionManagementCreateComponent,
    //   {centered: true, backdrop: 'static',size:'xl' , windowClass:'tablealign'});

    // modalRef.result.then((result) => {
    //   if (result == 'submit') {
    //     this.getRevisionRequest();
    //   }
    // });
    
    this.router.navigate(["./create/"], { relativeTo: this.route.parent });
  }

  openEdit(id){

    this.router.navigate( [
      "./" +
        id +
        "/edit/"
    ],{ relativeTo: this.route.parent });
    // const modalRef = this.modalService.open(EmployeeRevisionManagementEditComponent,
    //   {centered: true, backdrop: 'static',size:'xl' , windowClass:'tablealign'});
    //   modalRef.componentInstance.reqId = id;
    //   modalRef.result.then((result) => {
    //     if (result == 'submit') {
    //       this.getRevisionRequest();
    //     }
    //   });
  }
  openView(id){
    this.router.navigate( [
      "./" +
        id +
        "/view/"
    ],{ relativeTo: this.route.parent });
    // const modalRef = this.modalService.open(EmployeeRevisionManagementViewComponent,
    //   {centered: true, backdrop: 'static',size:'xl' , windowClass:'tablealign'});
    //   modalRef.componentInstance.reqId = id;
    //   modalRef.result.then((result) => {
    //     if (result == 'submit') {
    //       this.getRevisionRequest();
    //     }
    //   });
  }
  openPrint(id){
        this.router.navigate(["./print/" + id ], {
        relativeTo: this.route.parent,
      
      });
  }

  delete(id) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete Employee Revision ?`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.EmployeeRevisionManagementService.delete(id).subscribe(() => {
          this.toastr.showSuccessMessage('The Employee Revision request is deleted successfully!');
           this.getRevisionRequest()
          
        });
     
      }
    });
  }
  process(id) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to Process Employee Revision ?`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.EmployeeRevisionManagementService.delete(id).subscribe(() => {
          this.toastr.showSuccessMessage('The Employee Revision request is processed successfully!');
           this.getRevisionRequest()
          
        });
     
      }
    });
  }
  getRevisionRequest() {
    debugger
    this.revisionRequest =[]
    this.EmployeeRevisionManagementService.getAll().subscribe(result => {
      this.revisionRequest = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch Employee Revision requests');
      });
  }

}
