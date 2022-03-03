import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hrms-employee-asset-container',
  templateUrl: './employee-asset-container.component.html'
})
export class EmployeeAssetContainerComponent implements OnInit {
  tabs = [
    { title: 'Raise Request', fragment: 'raise-request' },
    { title: 'My Assets', fragment: 'my-assets' }
  ];

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
