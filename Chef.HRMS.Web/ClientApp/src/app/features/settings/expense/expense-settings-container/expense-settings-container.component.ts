import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hrms-expense-settings-container',
  templateUrl: './expense-settings-container.component.html'
})
export class ExpenseSettingsContainerComponent implements OnInit {

  tabs = [
    { title: 'Expense Policy', fragment: 'expense-policy' },
    { title: 'Expense Type', fragment: 'expense-type' }
  ];
  
  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
