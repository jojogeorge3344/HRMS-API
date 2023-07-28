import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { OvertimeRequestService } from '../overtime-request.service';
import { OvertimeRequestCreateComponent } from '../overtime-request-create/overtime-request-create.component';
import { OvertimeRequestEditComponent } from '../overtime-request-edit/overtime-request-edit.component';
import { OvertimeRequest } from '../overtime-request.model';
import { RequestStatus } from '../../../models/common/types/requeststatustype';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { OvertimeRequestViewComponent } from '../overtime-request-view/overtime-request-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ExcelService } from '@features/reports/excel.service';
import { DatePipe, formatDate } from '@angular/common';
import download from 'downloadjs';
@Component({
  templateUrl: './overtime-request-list.component.html'
})
export class OvertimeRequestListComponent implements OnInit {

  overtimeRequests: OvertimeRequest[];
  overtimeRequestStatusTypes = RequestStatus;
  currentUserId: number;
  overtimePolicyId: number;
  employeeDetailsCheck: boolean;
  excel = [];
  searchovertimeRequests: any;
  searchKey: any;
  

  constructor(
    private overtimeRequestService: OvertimeRequestService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private router: Router,
    private excelService: ExcelService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
) {
  }

  ngOnInit(): void {
    debugger
    this.currentUserId = getCurrentUserId();

    this.getAssignedOverTimePolicyRequests();
    let b=this.router.routerState.snapshot.url;
    if(b=="/my-overtime"){
      this.employeeDetailsCheck=true
      this.getOvertimeRequestsSelf();
    }else{
      this.employeeDetailsCheck=false  
      this.getOvertimeRequestsAll();

    }
    
  }

  isApplied(overtimeRequestStatus) {
    return overtimeRequestStatus == this.overtimeRequestStatusTypes.Draft;
  }

  getOvertimeRequestsSelf() {
    this.overtimeRequestService.getAllOvertimeDetailsById(this.currentUserId).subscribe((result: OvertimeRequest[]) => {
      this.overtimeRequests = result;
      this.searchovertimeRequests=result
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the overtime requests');
      });
  }
  getOvertimeRequestsAll() {
    this.overtimeRequestService.getAll().subscribe((result: OvertimeRequest[]) => {
      this.overtimeRequests = result.sort((a, b) => a.employeeName.toLowerCase().localeCompare(b.employeeName.toLowerCase())) ;
      this.searchovertimeRequests=result.sort((a, b) => a.employeeName.toLowerCase().localeCompare(b.employeeName.toLowerCase()))
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the overtime requests');
      });
  }

  getAssignedOverTimePolicyRequests() {
    this.overtimeRequestService.getAssignedOverTimePolicy(this.currentUserId).subscribe((result) => {
      this.overtimePolicyId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the overtime Policy Id');
      });
  }

  openAdd() {
    const modalRef = this.modalService.open(OvertimeRequestCreateComponent,
      {centered: true, backdrop: 'static' });

    modalRef.componentInstance.currentUserId = this.currentUserId;
    modalRef.componentInstance.policyId = this.overtimePolicyId;
    modalRef.componentInstance.overTimeApply = this.overtimeRequests;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        if(this.router.routerState.snapshot.url=="/my-overtime"){
        this.getOvertimeRequestsSelf();
        this.getAssignedOverTimePolicyRequests()
        }else{
          this.getOvertimeRequestsAll()
        }
      }
    });
  }

  openEdit(overtimeRequest: OvertimeRequest) {
    const modalRef = this.modalService.open(OvertimeRequestEditComponent,
      {centered: true, backdrop: 'static' });

    modalRef.componentInstance.overtimeRequest = overtimeRequest;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        if(this.router.routerState.snapshot.url=="/my-overtime"){
          this.getOvertimeRequestsSelf();
          }else{
            this.getOvertimeRequestsAll()
          }
      }
    });
  }

  openView(overtimeRequest: OvertimeRequest) {
    const modalRef = this.modalService.open(OvertimeRequestViewComponent,
      {centered: true, backdrop: 'static' });

    modalRef.componentInstance.overtimeRequest = overtimeRequest;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        if(this.router.routerState.snapshot.url=="/my-overtime"){
          this.getOvertimeRequestsSelf();
          }else{
            this.getOvertimeRequestsAll()
          }
      }
    });
  }

  delete(overtimeRequest: OvertimeRequest) {
    debugger
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the overtime request?`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.overtimeRequestService.delete(overtimeRequest.id).subscribe(() => {
          this.toastr.showSuccessMessage('The overtime request is deleted successfully!');
          if(this.router.routerState.snapshot.url=="/my-overtime"){
            this.getOvertimeRequestsSelf();
            }else{
              this.getOvertimeRequestsAll()
            }
          
        });
     
      }
    });
  }

  ExcelImport(){
   
  //   this.excel.push({
  //     Code:'',
  //     Name:'',
  //     'FromDate (yyyy-mm-dd)':'',
  //     'ToDate (yyyy-mm-dd)':'',
  //     NormalOvertime:'',
  //     HolidayOvertime:'',
  //     SpecialOvertime:'',
  //     Reason:''
  //   })
  
  // this.excelService.exportAsExcelFile(this.excel, 'Employee_Overtime_List');
 
    this.overtimeRequestService.getExcelFormat().subscribe((res:any)=>{
    download(atob(res), 'Employee_Overtime_List.xlsx', { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    })
  
  }

  openUpload(){
    this.router.navigate(["./upload/"], { relativeTo: this.route.parent });
  }
  searchLoan(): void {
    debugger
    this.overtimeRequests = this.searchovertimeRequests.filter(
      (x) =>
      x.employeeNumber?.toLowerCase().includes(this.searchKey.toLowerCase()) ||
        x.employeeName?.toLowerCase().includes(this.searchKey.toLowerCase()) ||
        (this.overtimeRequestStatusTypes[x.requestStatus]).toLowerCase().includes(this.searchKey.toLowerCase())||
        (formatDate(x.fromDate, 'dd-MM-yyyy', 'en-Us')).includes(this.searchKey) ||
        (formatDate(x.toDate, 'dd-MM-yyyy', 'en-Us')).includes(this.searchKey) ||
        (formatDate(x.createdDate, 'dd-MM-yyyy', 'en-Us')).includes(this.searchKey) ||
        x.createdBy?.toLowerCase().includes(this.searchKey.toLowerCase())
    );
  }
}
