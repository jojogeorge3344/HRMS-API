import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hrms-employee-salary-container',
  templateUrl: './employee-salary-container.component.html'
})
export class EmployeeSalaryContainerComponent implements OnInit {

  employeeId: number;
  @Input() passEmployeeId
    
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.passEmployeeId){
      this.employeeId=this.passEmployeeId
    }else{
    this.route.params.subscribe((params: any) => {
      this.employeeId = parseInt(params.id, 10);
    });
    }
  }  
}
