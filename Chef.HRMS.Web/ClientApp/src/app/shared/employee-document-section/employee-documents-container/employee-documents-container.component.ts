import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { getCurrentUserId } from "@shared/utils/utils.functions";

@Component({
  templateUrl: "./employee-documents-container.component.html",
  selector: "employee-documents-container",
})
export class EmployeeDocumentsContainerComponent implements OnInit {
  @Input() isView: boolean;
  @Input() passEmployeeId:any
  employeeId: number;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const currentUserId = getCurrentUserId();
    // if(this.passEmployeeId){
    //   this.employeeId=parseInt(this.passEmployeeId,10)
    // }else{
    //   this.route.params.subscribe((params: any) => {
    //     this.employeeId = params.id ? parseInt(params.id, 10) : currentUserId;
    //   });
    // }
    
    this.route.params.subscribe((params: any) => {
      if(params.empId){
        this.employeeId = parseInt(params.empId, 10);
      }else if(params.id){
        this.employeeId = params.id ? parseInt(params.id, 10) : currentUserId;
      }else{
        this.employeeId=parseInt(currentUserId, 10);
      }
          
        });
  }
}
