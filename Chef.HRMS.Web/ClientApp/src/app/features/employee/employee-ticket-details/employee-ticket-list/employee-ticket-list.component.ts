import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { EmployeeTicketGroup } from '../employee-ticket-model';
import { EmployeeTicketService } from '../employee-ticket-service';
import { EmployeeTicketViewComponent } from '../employee-ticket-view/employee-ticket-view.component';
import { EmployeeTicketEditComponent } from '../employee-ticket-edit/employee-ticket-edit.component';
import { EmployeeTicketCreateComponent } from '../employee-ticket-create/employee-ticket-create.component';
import { ActivatedRoute } from '@angular/router';
import { TicketBase } from '../employee-ticket.enum';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hrms-employee-ticket-list',
  templateUrl: './employee-ticket-list.component.html',
  styleUrls: ['./employee-ticket-list.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeTicketListComponent implements OnInit {

  
  employeeTicketDetails: EmployeeTicketGroup[] = [];
  findEmployeeId: number;
  ticketBaseKeys: number[];
  ticketBaseOf = TicketBase;

  constructor(
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private employeeTicketService:EmployeeTicketService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    debugger
    this.getEmployeeTicketSlablist()
    this.route.params.subscribe((params: any) => {
      this.findEmployeeId = parseInt(params.id, 10);
    });
    this.ticketBaseKeys = Object.keys(this.ticketBaseOf).filter(Number).map(Number);
  }

  getEmployeeTicketSlablist() {
    this.employeeTicketService.getAll().subscribe(result => {
      this.employeeTicketDetails = result;
      this.employeeTicketDetails=this.employeeTicketDetails.filter(x=>x.employeeId==this.findEmployeeId)
       this.employeeTicketDetails=this.employeeTicketDetails.sort((a, b) => a.travelFrom.toLowerCase().localeCompare(b.travelFrom.toLowerCase()));
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Ticket List Details');
    });
  }
  openCreate() {
    const modalRef = this.modalService.open(EmployeeTicketCreateComponent,
      {size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.employeeId = this.findEmployeeId;
    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getEmployeeTicketSlablist()
        }
    });  
  }
  openEdit(relDetails: EmployeeTicketGroup) {
    const modalRef = this.modalService.open(EmployeeTicketEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.relDetails= relDetails;
    modalRef.componentInstance.employeeId = this.findEmployeeId;
    // modalRef.componentInstance.code = this.Codes;
    // modalRef.componentInstance.name = this.Names;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getEmployeeTicketSlablist()
      }
    });
  }
  openView(relDetails: EmployeeTicketGroup) {
    const modalRef = this.modalService.open(EmployeeTicketViewComponent,
      { size: 'lg',centered: true, backdrop: 'static' });

    modalRef.componentInstance.relDetails = relDetails;
    // modalRef.componentInstance.code = this.Codes;
    // modalRef.componentInstance.name = this.Names;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getEmployeeTicketSlablist();
      }
    });
  }

delete(relDetails: EmployeeTicketGroup) {
  const modalRef = this.modalService.open(ConfirmModalComponent,
    { centered: true, backdrop: 'static' });
  modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the Ticket ${relDetails.travelFrom}`;
  modalRef.result.then((userResponse) => {
    if (userResponse == true) {
      this.employeeTicketService.delete(relDetails.id).subscribe(() => {
        this.toastr.showSuccessMessage('Ticket deleted successfully!');
        this.getEmployeeTicketSlablist()
      });
    }
  });
}

}












