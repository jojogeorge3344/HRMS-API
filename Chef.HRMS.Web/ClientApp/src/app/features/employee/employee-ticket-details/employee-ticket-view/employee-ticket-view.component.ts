import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeTicketGroup } from '../employee-ticket-model';
import { EmployeeTicketService } from '../employee-ticket-service';
import { TicketBase } from '../employee-ticket.enum';
import * as moment from 'moment';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'hrms-employee-ticket-view',
  templateUrl: './employee-ticket-view.component.html',
  styleUrls: ['./employee-ticket-view.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeTicketViewComponent implements OnInit {
  

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
    this.addForm = this.createFormGroup();
    this.addForm.patchValue({
      travelFrom:this.relDetails.travelFrom,
      travelTo:this.relDetails.travelTo,
      isRoundTrip:this.relDetails.isRoundTrip,
      amount:this.relDetails.amount,
      // travelDate:new Date(this.relDetails.travelDate),
      travelMode:this.relDetails.travelMode,
      employeeId:this.relDetails.employeeId,
      id:this.relDetails.id

    });
    this.ticketBaseKeys = Object.keys(this.ticketBaseOf).filter(Number).map(Number);
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
      // travelDate:['', [
      //   Validators.required 
      // ]],
      employeeId:[0],
      id:[0]
    });
  }

}


