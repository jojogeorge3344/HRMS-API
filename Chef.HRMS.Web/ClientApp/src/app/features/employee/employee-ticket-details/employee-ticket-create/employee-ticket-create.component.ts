import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeTicketService } from '../employee-ticket-service';
import { TicketBase } from '../employee-ticket.enum';
import * as moment from 'moment';

@Component({
  selector: 'hrms-employee-ticket-create',
  templateUrl: './employee-ticket-create.component.html',
  styleUrls: ['./employee-ticket-create.component.scss']
})
export class EmployeeTicketCreateComponent implements OnInit {

  addForm: FormGroup;
  ticketDetails: any
  employees: any;
  ticketBaseKeys: number[];
  ticketBaseOf = TicketBase;
  minDateFrom;
  maxDateFrom;
  @Input() employeeId

  constructor( 
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private employeeTicketService:EmployeeTicketService,
    ) { }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.ticketBaseKeys = Object.keys(this.ticketBaseOf).filter(Number).map(Number);
    const current = new Date();
    this.minDateFrom = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    this.maxDateFrom = {
      year: current.getFullYear() + 1,
      month: 3,
      day: 31
    };
   
  }

  onSubmit() {
    debugger
    let b=moment(this.addForm.value.travelDate).format('YYYY-MM-DDT00:00:00')
    this.addForm.value.travelDate=b
    this.addForm.value.employeeId=this.employeeId
    const ticketForm = this.addForm.value;
    this.employeeTicketService.add(ticketForm).subscribe(result => {
          this.toastr.showSuccessMessage('The Ticket added successfully!');
          this.activeModal.close('submit');
        },
          error => {
            this.toastr.showErrorMessage('Unable to add the Ticket');
    });
    
  
  }
  
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      travelFrom: ['', [
        Validators.required
      ]],
      travelTo: ['', [
        Validators.required
      ]],
      isRoundTrip: ['', [
        Validators.required
      ]],
      amount: ['', [
        Validators.required
      ]],
      travelMode:['', [
        Validators.required
      ]],
      travelDate:['', [
        Validators.required
      ]],
      employeeId:[0]
    });
  }


}





















