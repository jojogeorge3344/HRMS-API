import { Component, OnInit,Input } from '@angular/core';
import { BankGroup } from '../bank-employee.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hrms-bank-employee-view',
  templateUrl: './bank-employee-view.component.html',
  styleUrls: ['./bank-employee-view.component.scss']
})
export class BankEmployeeViewComponent implements OnInit {

  @Input() relDetails: BankGroup;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}



