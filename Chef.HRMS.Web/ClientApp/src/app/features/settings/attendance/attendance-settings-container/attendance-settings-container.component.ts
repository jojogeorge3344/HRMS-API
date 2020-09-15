import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hrms-attendance-settings-container',
  templateUrl: './attendance-settings-container.component.html'
})
export class AttendanceSettingsContainerComponent implements OnInit {

  tabs = [
    { title: 'Shift Management', fragment: 'shift-management' },
    { title: 'Work From Home Settings', fragment: 'work-from-home-settings' }
  ];

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
