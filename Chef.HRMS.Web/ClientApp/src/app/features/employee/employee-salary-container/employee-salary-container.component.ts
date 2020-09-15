import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hrms-employee-salary-container',
  templateUrl: './employee-salary-container.component.html'
})
export class EmployeeSalaryContainerComponent implements OnInit {

  employeeId: number;
    
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.employeeId = parseInt(params.id, 10);
    });
  }  
}
