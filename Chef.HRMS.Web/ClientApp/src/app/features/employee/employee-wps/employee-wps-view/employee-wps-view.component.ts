import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WpsUser } from '../wps-user.model';
import { EmployeeWpsUserService } from '../employee-wps-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeWpsService } from '@settings/wps/employee-wps.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'hrms-employee-wps-view',
  templateUrl: './employee-wps-view.component.html',
  styleUrls: ['./employee-wps-view.component.scss']
})
export class EmployeeWpsViewComponent implements OnInit {

  wpsUserDetails: WpsUser[] = [];
  addForm: FormGroup;
  groupId: any;
  currentUserId: number;
  id: any;

  constructor(
    private route: ActivatedRoute,
    private employeeWpsUserService: EmployeeWpsUserService,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private employeeWpsService: EmployeeWpsService,

  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.route.params.subscribe((params: any) => {
      this.id = parseInt(params.id, 10);
    });
   
    this.getWPSUserlistById();
  }

  getWPSGrouplist() {
    this.employeeWpsService.getAll().subscribe(result => {
      this.groupId = result;
      let wpsid1 = this.wpsUserDetails[0].groupId
      console.log("idd",wpsid1);
      let groupName =_.find(this.groupId,["id",wpsid1]).id
      console.log("groupname",groupName);
      this.addForm.patchValue({groupId:groupName});
      
      
     
     //
  //    let wpsid1 = this.wpsUserDetails[0].groupId
  //    console.log("wpsid1",wpsid1);
  //    console.log("group1",this.groups);
  //    let groupNamePatch = _.find(this.groups,["id",wpsid1]).id
  //  console.log("newwwwwwwww1", groupNamePatch);
  //  this.addForm.patchValue({groupId:groupNamePatch});
     //
      console.log("groupid",this.groupId);

    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the WPS Group List Details');
      });
  }

  getWPSUserlistById() {
    this.employeeWpsUserService.get(this.id).subscribe(result => {
      this.wpsUserDetails = result;
      console.log("wps333",this.wpsUserDetails);
      
      this.addForm.patchValue({wpsId:this.wpsUserDetails[0].wpsId});
      this.getWPSGrouplist();
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the WPS List Details');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [''],
      groupId: ['', [
        Validators.maxLength(18),
        Validators.required
      ]],
     wpsId: ['', [
  Validators.required,
  Validators.maxLength(13)
]],
    });
  }

}

// wpsId: [{value:'', disabled:true}, [
//   Validators.required,
//   Validators.maxLength(13)
// ]],