import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'hrms-payroll-process-employee-summarydetails',
  templateUrl: './payroll-process-employee-summarydetails.component.html',
  styleUrls: ['./payroll-process-employee-summarydetails.component.scss']
})
export class PayrollProcessEmployeeSummarydetailsComponent implements OnInit {
  @Input() summaryDetails
  constructor(
    public activeModal: NgbActiveModal,
    public modalService: NgbModal
  ) { 

  }

  ngOnInit(): void {
    console.log('summaryDetails',this.summaryDetails)
  }

}
