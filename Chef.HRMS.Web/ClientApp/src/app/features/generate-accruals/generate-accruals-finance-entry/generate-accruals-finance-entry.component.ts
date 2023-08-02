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
  saveAccrualsDetails:any=[]
  Action:string  
  payrollid:any
  month:any
  year :any
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
      this.Action = params['IorV'];
      this.payrollid = params['payrollid']
      this.month = params['month']
      this.year = params['year']
    });
   if(this.Action == 'I'){
    this.getLeaveAccruals()
    this.getEOSAccruals()
    this.getTicketAccruals()
   }else {
   this.getProcessedAccruals()
   }
    
  }

  getLeaveAccruals() {
    debugger
    this.leaveAccrualsList =[]
    this.generateAccrualsService.getLeaveAccrualsList(this.paygroupId,this.month,this.year).subscribe(result => {
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

    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch Ticket Accruals.');
      });
  }

  saveAccruals(){
     this.saveAccrualsDetails.push({
      leaveAccruals:this.leaveAccrualsList,
      eosAccruals:this.EOSAccrualsList,
      ticketAccruals:this.ticketAccrualsList,
      paygroupId:this.paygroupId
    })
    this.generateAccrualsService.saveAccruals(this.saveAccrualsDetails[0]).subscribe(result => {
      this.toastr.showSuccessMessage('Accruals Saved successfully.');
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to Save Accruals.');
    });
  }

  generateFinacialEntry(){
    this.generateAccrualsService.gen_finacialEntry(this.paygroupId).subscribe(result => {
      this.toastr.showSuccessMessage('Finacial Entry Generate successfully.');
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to Generate Finacial Entry.');
    }
    )
  }

  getProcessedAccruals (){
    this.generateAccrualsService.get_processedAccruals(this.payrollid).subscribe((result:any) => {
      this.leaveAccrualsList = result.leaveAccruals
      this.EOSAccrualsList = result.eosAccruals
      this.ticketAccrualsList = result.ticketAccruals
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to View Accruals.');
    }
    )

  }

}
