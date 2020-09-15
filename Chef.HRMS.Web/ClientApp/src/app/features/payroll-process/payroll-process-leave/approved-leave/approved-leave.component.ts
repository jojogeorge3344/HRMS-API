import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PayrollProcessLeaveService } from '../payroll-process-leave.service';
import { RequestStatus } from 'src/app/models/common/types/requeststatustype';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-approved-leave',
  templateUrl: './approved-leave.component.html'
})
export class ApprovedLeaveComponent implements OnInit {

  @Input() employeeId: any;
  @Input() fromDate: any;
  @Input() toDate: any;
  @Input() employeeName: any;
  requestStatus = RequestStatus;

  approvedLeaveDetails = [];

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService,
    private payrollProcessLeaveService: PayrollProcessLeaveService,
  ) { }

  ngOnInit(): void {
    this.getAllApprovedLeaveDetailsByEmployeeId();
  }

  getAllApprovedLeaveDetailsByEmployeeId() {
    this.payrollProcessLeaveService.getAllApprovedLeaveDetails(this.employeeId, this.fromDate, this.toDate).subscribe(result => {
      this.approvedLeaveDetails = result;
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the All Approved Leave Details By Employee ID');
    });
  }

}
