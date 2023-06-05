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
    debugger
    this.leaveAccrualsList =[]
    this.generateAccrualsService.getLeaveAccrualsList(this.paygroupId).subscribe(result => {
      this.leaveAccrualsList = result;

      this.leaveAccrualsList = [
        {
          id: 0,
          createdDate: "2023-06-02T05:55:03.057Z",
          modifiedDate: "2023-06-02T05:55:03.057Z",
          createdBy: "Lester",
          modifiedBy: "Lester",
          isArchived: true,
          employeeId: 0,
          accrualDate: "2023-06-02T05:55:03.057Z",
          leaveId: 0,
          accrualDays: 0,
          accrualAmount: 0,
          availDays: 0,
          availAmount: 0,
          accrualStatus: 0,
          eligibilityPerDay: 0,
          leaveCutOffType: 1,
          isIncludeLOPDays: true,
          workingdaysInCalMonth: 0,
          workeddaysInCalMonth: 0,
          cfLimitDays: 0,
          eligibleDays: 0,
          eligibilityBase: 0,
          monthlyAmount: 0,
          employeeCode: "TIC123",
          employeeName: "Lester"
        }
      ]

      this.leaveAccrualsList.push(this.leaveAccrualsList[0])
      console.log('data1',this.leaveAccrualsList)
      
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
      this.EOSAccrualsList = [
        {
          createdDate: "2023-06-02T06:09:28.015Z",
          modifiedDate: "2023-06-02T06:09:28.015Z",
          createdBy: "Lester",
          modifiedBy: "Lester",
          isArchived: true,
          id: 0,
          employeeId: 0,
          accrualDate: "2023-06-02T06:09:28.015Z",
          accrualDays: 0,
          accrualAmount: 0,
          accrualStatus: 0,
          employeeCode: "TIC123",
          employeeName: "Lester"
        }
      ]

      this.EOSAccrualsList.push(this.EOSAccrualsList[0])
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

      this.ticketAccrualsList = [
        {
          createdDate: "2023-06-02T06:11:24.411Z",
          modifiedDate: "2023-06-02T06:11:24.411Z",
          createdBy: "Lester",
          modifiedBy: "Lester",
          isArchived: true,
          id: 0,
          employeeId: 0,
          accrualDate: "2023-06-02T06:11:24.411Z",
          accrualAmount: 0,
          accrualStatus: 0,
          employeeCode: "TIC123",
          employeeName: "Lester"
        }
      ]
      this.ticketAccrualsList.push(this.ticketAccrualsList[0])
      console.log('ticket',this.ticketAccrualsList)
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

}
