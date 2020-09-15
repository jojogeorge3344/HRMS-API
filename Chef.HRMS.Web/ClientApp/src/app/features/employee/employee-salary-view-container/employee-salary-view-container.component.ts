import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hrms-employee-salary-view-container',
  templateUrl: './employee-salary-view-container.component.html',
  styleUrls: ['./employee-salary-view-container.component.scss']
})
export class EmployeeSalaryViewContainerComponent implements OnInit {

  employeeId: number;
    
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.employeeId = parseInt(params.id, 10);
    });
  }  
  
}
