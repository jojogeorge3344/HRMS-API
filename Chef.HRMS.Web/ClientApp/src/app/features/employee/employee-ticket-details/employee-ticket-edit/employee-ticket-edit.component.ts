import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeTicketGroup } from '../employee-ticket-model';
import { EmployeeTicketService } from '../employee-ticket-service';
import { TicketBase } from '../employee-ticket.enum';
import * as moment from 'moment';

@Component({
  selector: 'hrms-employee-ticket-edit',
  templateUrl: './employee-ticket-edit.component.html',
  styleUrls: ['./employee-ticket-edit.component.scss']
})
export class EmployeeTicketEditComponent implements OnInit {

  addForm: FormGroup;
  ticketBaseKeys: number[];
  ticketBaseOf = TicketBase;

  @Input() relDetails: EmployeeTicketGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private employeeTicketService:EmployeeTicketService,
    ) {
  }

  ngOnInit(): void {
    debugger
    this.addForm = this.createFormGroup();
    this.addForm.patchValue({
      travelFrom:this.relDetails.travelFrom,
      travelTo:this.relDetails.travelTo,
      isRoundTrip:this.relDetails.isRoundTrip,
      amount:this.relDetails.amount,
      travelDate:this.relDetails.travelDate,
      travelMode:this.relDetails.travelMode,
      employeeId:this.relDetails.employeeId,
      id:this.relDetails.id

    });
    this.ticketBaseKeys = Object.keys(this.ticketBaseOf).filter(Number).map(Number);
  }


  
  onSubmit() {
    let b=moment(this.addForm.value.travelDate).format('YYYY-MM-DDT00:00:00')
    this.addForm.value.travelDate=b
    this.addForm.value.id=this.relDetails.id
    this.addForm.value.valueType = parseInt(this.addForm.value.valueType)
    const ticketForm = this.addForm.value;
    this.employeeTicketService.update(ticketForm).subscribe(result => {
    this.toastr.showSuccessMessage('The Ticket updated successfully!');
    this.activeModal.close('submit');
    },
      error => {
        console.error(error);
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
      employeeId:[0],
      id:[0]
    });
  }

}








