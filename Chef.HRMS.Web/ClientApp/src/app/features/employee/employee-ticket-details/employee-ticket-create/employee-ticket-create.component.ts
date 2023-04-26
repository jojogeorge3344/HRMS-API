import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeTicketService } from '../employee-ticket-service';
import { EmployeeService } from '@features/employee/employee.service';
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
  minDate;
  maxDate;

  constructor( 
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private employeeTicketService:EmployeeTicketService,
    private employeeService: EmployeeService,
    ) { }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.getEmployeeDetails()
    this.ticketBaseKeys = Object.keys(this.ticketBaseOf).filter(Number).map(Number);
    const current = new Date();
    this.maxDate = {
      year: current.getFullYear() - 18,
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  getEmployeeDetails() {
    debugger
    this.employeeService.getAll().subscribe(
      (result) => {
        this.employees = result;
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the Employee Details");
      }
    );
  }

  onSubmit() {
    // debugger
    // let b=moment(this.addForm.value.travelDate).format('YYYY-MM-DDT00:00:00')
    // console.log(b)
    // this.addForm.patchValue({
    //   travelDate:b
    // })
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
      isRoundTrip: ['', [
        Validators.required
      ]],
      amount: ['', [
        Validators.required
      ]],
      travelMode:['', [
        Validators.required
      ]],
      travelDate:[null, [
        Validators.required
      ]],
      employeeId:[0]
    });
  }


}





















