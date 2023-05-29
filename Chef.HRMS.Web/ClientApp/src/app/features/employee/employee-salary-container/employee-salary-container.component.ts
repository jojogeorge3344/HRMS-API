import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'hrms-employee-salary-container',
  templateUrl: './employee-salary-container.component.html'
})
export class EmployeeSalaryContainerComponent implements OnInit {

  employeeId: number;
  @Input() passEmployeeId:any
  @Input() passJobDetailsId:any
  @Input() passJobFilingId:any
  passRoutingId:boolean=false
    
  constructor(private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    debugger
    console.log(this.passJobDetailsId,this.passJobFilingId)
    if(this.passEmployeeId){
      this.employeeId=this.passEmployeeId
      this.passRoutingId=true
    }else{
    this.route.params.subscribe((params: any) => {
      this.employeeId = parseInt(params.empId, 10);
      this.passRoutingId=false
    });
    }
  }  
  routingPartCreate(){
    this.router.navigate(
      [
        "./" + this.passEmployeeId + "/create" +
        "/" + this.passJobDetailsId + "/" + this.passJobFilingId +
          "/salary-details/create"
         
      ],
      { relativeTo: this.route.parent }
    );
  }
  routingPartEdit(){
    this.router.navigate(
      [
        "./" + this.passEmployeeId + "/create" +
        "/" + this.passJobDetailsId + "/" + this.passJobFilingId +
          "/salary-details/edit"
         
      ],
      { relativeTo: this.route.parent }
    );
  }
}
