import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { PayrollProcessService } from '../payroll-process.service';


@Component({
  selector: 'hrms-payroll-process-salarydetails-view',
  templateUrl: './payroll-process-salarydetails-view.component.html',
  styleUrls: ['./payroll-process-salarydetails-view.component.scss']
})
export class PayrollProcessSalarydetailsViewComponent implements OnInit {

  @Input() process;
 
  

  constructor(
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private payrollProcessService: PayrollProcessService,
    public modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    debugger
    console.log(this.process)
  }



}
