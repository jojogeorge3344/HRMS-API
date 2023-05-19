import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hrms-employee-edit-container',
  templateUrl: './employee-edit-container.component.html'
})
export class EmployeeEditContainerComponent implements OnInit {

  activeTabId: number;
  jobDetailsId: any;
  jobFilingId:any

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeTabId = 1;
    this.route.params.subscribe((params:any) => {
      if(params['activeTabId'])
        this.activeTabId = parseInt(params['activeTabId']);
    });
  }
  getJobId(event){
    debugger
    this.jobDetailsId=event
  }
  getEditByCreateJobFilingId(event){
    debugger
   this.jobFilingId=event
  }
}
