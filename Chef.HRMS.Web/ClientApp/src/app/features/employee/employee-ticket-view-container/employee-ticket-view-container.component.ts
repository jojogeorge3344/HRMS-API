import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { EmployeeTicketGroup } from '../employee-ticket-details/employee-ticket-model';
import { EmployeeTicketService } from '../employee-ticket-details/employee-ticket-service';
import { TicketBase } from '../employee-ticket-details/employee-ticket.enum';



@Component({
  selector: 'hrms-employee-ticket-view-container',
  templateUrl: './employee-ticket-view-container.component.html',
  styleUrls: ['./employee-ticket-view-container.component.scss']
})
export class EmployeeTicketViewContainerComponent implements OnInit {

  
  employeeTicketDetails: EmployeeTicketGroup[] = [];
  ticketBaseKeys: number[];
  ticketBaseOf = TicketBase;

  constructor(
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private employeeTicketService:EmployeeTicketService
  ) { }

  ngOnInit(): void {
    this.getEmployeeTicketSlablist()
    this.ticketBaseKeys = Object.keys(this.ticketBaseOf).filter(Number).map(Number);
  }

  getEmployeeTicketSlablist() {
    this.employeeTicketService.getAll().subscribe(result => {
      this.employeeTicketDetails = result;
      // this.employeeTicketDetails=this.employeeTicketDetails.sort((a, b) => a.bfName.toLowerCase().localeCompare(b.bfName.toLowerCase()));
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Ticket List Details');
    });
  }


}















