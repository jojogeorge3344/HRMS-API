import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeTicketGroup } from '../employee-ticket-model';


@Component({
  selector: 'hrms-employee-ticket-view',
  templateUrl: './employee-ticket-view.component.html',
  styleUrls: ['./employee-ticket-view.component.scss']
})
export class EmployeeTicketViewComponent implements OnInit {


  @Input() relDetails: EmployeeTicketGroup;

  constructor
  (
    public activeModal: NgbActiveModal,
  ) 
  { }

  ngOnInit() {
    console.log('data',this.relDetails)
  }

}



