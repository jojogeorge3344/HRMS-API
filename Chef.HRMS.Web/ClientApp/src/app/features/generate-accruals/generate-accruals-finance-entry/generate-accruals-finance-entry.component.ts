import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { GenerateAccrualsService } from '../generate-accruals.service';
import { ModeOfPayrollProcessType } from '../../../models/common/types/modeofpayrollprocesstype';

@Component({
  selector: 'hrms-generate-accruals-finance-entry',
  templateUrl: './generate-accruals-finance-entry.component.html',
  styleUrls: ['./generate-accruals-finance-entry.component.scss']
})
export class GenerateAccrualsFinanceEntryComponent implements OnInit {
  paygroupId:any
  leaveAccrualsList:any=[]
  EOSAccrualsList:any=[]
  ticketAccrualsList:any=[]

  constructor(
    public modalService: NgbModal,
    private generateAccrualsService:GenerateAccrualsService,
    private toastr: ToasterDisplayService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.paygroupId = params['id'];
    });

    this.getLeaveAccruals()
    this.getEOSAccruals()
    this.getTicketAccruals()
  }

  getLeaveAccruals() {
    this.leaveAccrualsList =[]
    this.generateAccrualsService.getLeaveAccrualsList(this.paygroupId).subscribe(result => {
      this.leaveAccrualsList = result;
      
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch Leave Accruals.');
      });
  }

  getEOSAccruals() {
    this.EOSAccrualsList =[]
    this.generateAccrualsService.getEOSAccrualList(this.paygroupId).subscribe(result => {
      this.EOSAccrualsList = result;
      console.log('leaveaccruals',this.EOSAccrualsList)
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch EOS Accruals.');
      });
  }

  getTicketAccruals() {
    this.ticketAccrualsList =[]
    this.generateAccrualsService.getticketaccrualList(this.paygroupId).subscribe(result => {
      this.ticketAccrualsList = result;
      console.log('leaveaccruals',this.ticketAccrualsList)
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch Ticket Accruals.');
      });
  }

}
