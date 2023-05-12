import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hrms-leave-settings-container',
  templateUrl: './leave-settings-container.component.html'
})
export class LeaveSettingsContainerComponent implements OnInit {
  activeId: string;

  tabs = [
    { title: 'Leave Component', fragment: 'leave-component' },
    { title: 'Leave Structure', fragment: 'leave-structure' }
  ];
  
  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeId = this.route.children[0].snapshot.url[0].path;
  }

}
