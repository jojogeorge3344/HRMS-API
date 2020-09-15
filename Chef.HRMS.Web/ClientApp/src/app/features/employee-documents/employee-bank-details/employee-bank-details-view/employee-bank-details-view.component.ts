import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hrms-employee-bank-details-view',
  templateUrl: './employee-bank-details-view.component.html'
})
export class EmployeeBankDetailsViewComponent implements OnInit {

  @Input() bankDetails;

  constructor() { }

  ngOnInit(): void {
  }
}
