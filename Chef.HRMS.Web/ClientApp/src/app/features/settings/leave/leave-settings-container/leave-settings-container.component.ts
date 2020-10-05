import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hrms-leave-settings-container',
  templateUrl: './leave-settings-container.component.html'
})
export class LeaveSettingsContainerComponent implements OnInit {

  tabs = [
    { title: 'Leave Structure', fragment: 'leave-structure' },
    { title: 'Leave Component', fragment: 'leave-component' }
  ];
  
  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}