import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeTicketGroup } from '../employee-ticket-model';
import { EmployeeTicketService } from '../employee-ticket-service';

@Component({
  selector: 'hrms-employee-ticket-edit',
  templateUrl: './employee-ticket-edit.component.html',
  styleUrls: ['./employee-ticket-edit.component.scss']
})
export class EmployeeTicketEditComponent implements OnInit {

  addForm: FormGroup;

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
    this.addForm = this.createFormGroup();
    this.addForm.patchValue({
      travelFrom:this.relDetails.travelFrom,
      travelTo:this.relDetails.travelTo,
      roundTrip:this.relDetails.roundTrip,
      ticketAmount:this.relDetails.ticketAmount

    });
  
  }


  
  onSubmit() {
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
      roundTrip: ['', [
        Validators.required
      ]],
      ticketAmount: ['', [
        Validators.required
      ]],
    });
  }

}








