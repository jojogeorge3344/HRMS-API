import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LeaveComponentService } from '../../leave-component/leave-component.service';
import { LeaveComponent } from '../../leave-component/leave-component.model';
import { LeaveConfigurationService } from '../leave-configuration.service';
import { LeaveConfiguration } from '../leave-configuration.model';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'hrms-leave-configuration-container',
  templateUrl: './leave-configuration-container.component.html'
})
export class LeaveConfigurationContainerComponent implements OnInit {

  selected: number = null;
  assignedLeaveComponents: LeaveComponent[] = [];
  assignedLeaveConfigurations: LeaveConfiguration[] = [];
  leaveStructureId: number;
  currentLeaveComponent: LeaveComponent;
  activeId = 1;
  activeIndex:number
  queryString:string;
  removeComponentIdArray:any=[]

  constructor(private route: ActivatedRoute,
    private router: Router,
    private leaveComponentService: LeaveComponentService,
    private leaveConfigurationService: LeaveConfigurationService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {    
      this.leaveStructureId = parseInt(params['leaveStructureId']);
      this.getLeaveComponents(this.leaveStructureId);
      this.getLeaveConfigurations(this.leaveStructureId);
    });
   const url = window.location.href;
   if (url.includes('?')) {
    var paramValue= url.split('?')
    var QueryStringValue = paramValue[1]
    QueryStringValue = QueryStringValue.replace('componentQstring=','')
    this.removeComponentIdArray = QueryStringValue.split(',')
   }
  
  }

  setComponetList(){
    
    this.removeComponentIdArray.forEach(o =>{
      var data = parseInt(o)
       for(let i =0;i< this.assignedLeaveComponents.length;i++){
        if(this.assignedLeaveComponents[i].id == data){
             this.assignedLeaveComponents.splice(i,1)
        }
     }
    })
   
  }

  getLeaveComponents(leaveStructureId) {
    debugger
    this.leaveComponentService.getAllByLeaveStructure(leaveStructureId).subscribe((result:LeaveComponent[]) => {
      this.assignedLeaveComponents = result.filter(v => v.code.toLowerCase() !== "lop");
      console.log('comp',this.assignedLeaveComponents);
      
      this.setComponetList()
      this.selectLeaveComponent(0);
    },
    error => {
      console.error(error);
    });

  }

  getLeaveConfigurations(leaveStructureId) {
    this.leaveConfigurationService.getAll(leaveStructureId).subscribe((result:LeaveConfiguration[]) => {
      debugger
      this.assignedLeaveConfigurations = result;
      console.log('conf',this.assignedLeaveConfigurations);
      
    },
    error => {
      console.error(error);
    });
  }

  selectLeaveComponent(index) {
    this.activeId = 1;
    this.selected = index;
    this.currentLeaveComponent = this.assignedLeaveComponents[index];
     this.activeIndex =this.assignedLeaveComponents[index].id;
  }
 

  getLeaveConfiguration(leaveComponentId): LeaveConfiguration {
    return this.assignedLeaveConfigurations.find(v => v.leaveComponentId === leaveComponentId);
  }

  isLastStep(): boolean {
    return this.activeId === 2 && this.selected === (this.assignedLeaveComponents.length - 1);
  }

  isAllConfigured(): boolean {
    return this.assignedLeaveConfigurations.every(e => e.isConfigured);
  }

  onSubmit(isConfigured) {

    if(this.isAllConfigured() && this.isLastStep()) {
      this.router.navigate(['settings/leave/leave-structure'], { queryParams: { leaveStructureId: this.leaveStructureId } });      
    }

    if(this.activeId === 1) {
      this.activeId = 2;
      this.getLeaveConfiguration(this.currentLeaveComponent.id).isConfigured = isConfigured;
    }
    else {
      this.selectLeaveComponent(this.selected + 1);
      this.activeId = 1;
    }
  }

}
