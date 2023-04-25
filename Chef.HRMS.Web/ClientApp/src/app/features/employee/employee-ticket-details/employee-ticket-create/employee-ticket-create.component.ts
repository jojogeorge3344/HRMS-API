import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeTicketService } from '../employee-ticket-service';

@Component({
  selector: 'hrms-employee-ticket-create',
  templateUrl: './employee-ticket-create.component.html',
  styleUrls: ['./employee-ticket-create.component.scss']
})
export class EmployeeTicketCreateComponent implements OnInit {

  addForm: FormGroup;
  ticketDetails: any
  


  constructor( 
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private employeeTicketService:EmployeeTicketService,
  
    ) { }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
  }



  onSubmit() {
    this.addForm.value.valuetype = parseInt(this.addForm.value.valuetype)
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
      roundTrip: ['', [
        Validators.required
      ]],
      ticketAmount: ['', [
        Validators.required
      ]],
    });
  }


}





















