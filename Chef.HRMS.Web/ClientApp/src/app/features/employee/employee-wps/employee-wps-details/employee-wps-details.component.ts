import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WpsUser } from '../wps-user.model';
import { EmployeeWpsUserService } from '../employee-wps-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeWpsService } from '@settings/wps/employee-wps.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { result } from 'lodash';
import { EmployeeWpsBankerService } from '../employee-wps-bank.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'hrms-employee-wps-details',
  templateUrl: './employee-wps-details.component.html',
  styleUrls: ['./employee-wps-details.component.scss']
})
export class EmployeeWpsDetailsComponent implements OnInit {

  wpsUserDetails:any;
  addForm: FormGroup;
  editForm: FormGroup;
  groupId: any;
  currentUserId: number;
  id: any;
  wpsId: any;
  molId:any;
  routingId:any;
  salaryCardNo:any;
  bankId:any;
  accountNo:any
  bankList: any;
  detailsUpdate: any;
  wpsGroupObj:any;
  bankObj:any;

  constructor(
    private route: ActivatedRoute,
    private employeeWpsUserService: EmployeeWpsUserService,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private employeeWpsService: EmployeeWpsService,
    private employeeWpsBankerService: EmployeeWpsBankerService,
  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.route.params.subscribe((params: any) => {
      this.id = parseInt(params.id, 10);
    });
    // this.getMolId(this.id)
    this.fillDropDowns()
  }

  getWPSGrouplist() {
    this.employeeWpsService.getAll().subscribe(result => {
      this.groupId = result;
      let temp = { id: undefined, groupName: 'test', isLastRow: true }
        // lastrow
        this.groupId = [...result, temp];
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the WPS Group List Details');
      });
  }

  getWPSUserlistById() {
    debugger
    this.employeeWpsUserService.get(this.id).subscribe(result => {
      this.wpsUserDetails = result[0];
      this.wpsId=result[0].wpsId;
      this.detailsUpdate=result[0].id
      this.addForm.patchValue(result[0]);
      this.wpsGroupObj = this.setValueById(this.groupId, this.wpsUserDetails.groupId)
      this.bankObj = this.setValueById(this.bankList, this.wpsUserDetails.bankId)
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the WPS List Details');
      });
  }

  onSubmit() {
    if(this.wpsId){
      this.addForm.value.id=this.detailsUpdate
      const addWpsDetails = this.addForm.value;
      console.log("details",this.addForm.getRawValue());
      
      addWpsDetails.employeeId = parseInt(this.id, 10);
      addWpsDetails.wpsId = parseInt(addWpsDetails.wpsId)
      this.employeeWpsUserService.update(addWpsDetails).subscribe((result:any)=> {
           this.toastr.showSuccessMessage('WPS Details updated successfully!');
           this.getWPSUserlistById();  
      })
    }
    else{
      const addWpsDetails = this.addForm.value;
      addWpsDetails.employeeId = parseInt(this.id, 10);
      this.employeeWpsUserService.add(addWpsDetails).subscribe((result:any) => {
        this.toastr.showSuccessMessage('WPS Details added successfully!');
        this.getWPSUserlistById();
      })
    }
    // const addWpsDetails = this.addForm.value;
    // addWpsDetails.employeeId = parseInt(this.id, 10);
    // this.employeeWpsUserService.add(addWpsDetails).subscribe((result: any) => {
    //   this.toastr.showSuccessMessage('WPS Details updated successfully!');
    //   console.log("wps777",addWpsDetails);
    //   this.getWPSUserlistById();  
    // }
    // ,
    //   error => {
    //     console.error(error);
    //     this.toastr.showErrorMessage('Unable to update the WPS Details');
    //   });

  }
  // getMolId(id) {
  //   debugger
  //   this.employeeWpsUserService.get(id).subscribe(result => {
  //     this.molId = result;
  //   },
  //     error => {
  //       console.error(error);
  //       this.toastr.showErrorMessage('Unable to fetch the molid Details');
  //     });
  // }
  getWPSBanklist() {
    this.employeeWpsBankerService.getBank().subscribe(result => {
      let temp = { id: undefined,status:'Active', name: 'test', isLastRow: true }
      // lastrow
      this.bankList = [...result.filter(x=>x.status=="Active"), temp];
      this.bankObj = result.find((item) => this.addForm.get('bankId').value == item.id)
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the WPS Group List Details');
      });
  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [''],
      groupId: ['', [
        Validators.maxLength(60),
        Validators.required
      ]],
      wpsId: ['', [
      // Validators.pattern(/^\d{1,14}$/),
        Validators.required,
         Validators.maxLength(30),
        
      ]],
      molId: ['', [
        Validators.maxLength(18),
        Validators.required
      ]],
      routingId: ['', [
        Validators.maxLength(18),
        Validators.required
      ]],
      salaryCardNo: ['', [
        Validators.maxLength(18),
        Validators.required
      ]],
      bankId: ['', [
        Validators.required
      ]],
      accountNo: ['', [
        Validators.maxLength(18),
        Validators.required
      ]],
    });
  }
  selectWpsGroup(args){
    this.addForm.patchValue({
      groupId: args.value.id
    })
  }
  selectBank(args){
    this.addForm.patchValue({
      bankId: args.value.id
    })
  }
  refreshWpsGroup(event){
    event.stopPropagation();
    event.preventDefault();
    this.getWPSGrouplist()
  }
  refreshBank(event){
    event.stopPropagation();
    event.preventDefault();
    this.getWPSBanklist()
  }
  setValueById(list: any, value) {
    console.log("list", list, value);

    return list?.find((item) => value == item.id)
  }
  fillDropDowns() {
    forkJoin([
      this.employeeWpsService.getAll(),
      this.employeeWpsBankerService.getBank()
    ]).subscribe(res => {
      let temp = { id: undefined,status:'Active',groupName: 'test', name: 'test', isLastRow: true };
      this.groupId = [...res[0], temp];
      this.bankList = [...res[1].filter(x=>x.status=="Active"), temp];
      this.getWPSUserlistById();
    })
  }

}
