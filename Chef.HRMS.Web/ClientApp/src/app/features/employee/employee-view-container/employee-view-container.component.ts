import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hrms-employee-view-container',
  templateUrl: './employee-view-container.component.html',
  styleUrls: ['./employee-view-container.component.scss']
})
export class EmployeeViewContainerComponent implements OnInit {

  activeTabId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeTabId = 1;
    this.route.params.subscribe((params:any) => {
      if(params['activeTabId'])
        this.activeTabId = parseInt(params['activeTabId']);
    });
  }

}
