import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveComponentService } from '../../leave-component/leave-component.service';
import { LeaveComponent } from '../../leave-component/leave-component.model';

@Component({
  templateUrl: './leave-configuration-edit.component.html'
})
export class LeaveConfigurationEditComponent implements OnInit {

  leaveComponent: LeaveComponent;
  leaveStructureId: number;
  leaveComponentId: number;
  isView: boolean = false;
  activeId = 1;
  
  constructor(public route: ActivatedRoute,
    private router: Router,
    private leaveComponentService: LeaveComponentService) { }

  ngOnInit(): void {
    this.isView = (this.route.snapshot.url[1].path === "view");

    this.route.params.subscribe(params => {
    
      this.leaveStructureId = parseInt(params['leaveStructureId']);
      this.leaveComponentId = parseInt(params['leaveComponentId']);
    
      this.leaveComponentService.get(this.leaveComponentId).subscribe((result) => {    
        this.leaveComponent = result;                  
      },
      error => {
        console.error(error);
      });
    });
  }

  onSubmit() {
    if(this.activeId === 1) {
      this.activeId = 2;
    }
    else {
      this.router.navigate(['settings/leave/leave-structure'], { queryParams: { leaveStructureId: this.leaveStructureId } });
    }    
  }

}
