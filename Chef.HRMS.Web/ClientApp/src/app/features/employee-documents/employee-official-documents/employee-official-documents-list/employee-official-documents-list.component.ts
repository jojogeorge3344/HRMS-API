import { Component, OnInit } from '@angular/core';
import { EmployeeOfficialDocumentsService } from "../employee-official-documents.service";

@Component({
  selector: 'hrms-employee-official-documents-list',
  templateUrl: './employee-official-documents-list.component.html'
})
export class EmployeeOfficialDocumentsListComponent implements OnInit {

  employeeLetter: any;

  constructor(private employeeOfficialDocumentsService: EmployeeOfficialDocumentsService) { }

  ngOnInit(): void {
    this.getEmployeeLetter()
  }
  getEmployeeLetter() {
    this.employeeOfficialDocumentsService.get()
    .subscribe(res=>{
      this.employeeLetter = res;
    })
  }

}
