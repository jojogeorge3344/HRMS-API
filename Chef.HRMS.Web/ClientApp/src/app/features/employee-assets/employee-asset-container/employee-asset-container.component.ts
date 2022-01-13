import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hrms-employee-asset-container',
  templateUrl: './employee-asset-container.component.html'
})
export class EmployeeAssetContainerComponent implements OnInit {
  tabs = [
    { title: 'My Assets', fragment: 'my-assets' },
    { title: 'Raise Request', fragment: 'raise-request' }
  ];

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
