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

@Component({
  selector: 'hrms-employee-wps-details',
  templateUrl: './employee-wps-details.component.html',
  styleUrls: ['./employee-wps-details.component.scss']
})
export class EmployeeWpsDetailsComponent implements OnInit {

  wpsUserDetails: WpsUser[] = [];
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
    this.getWPSGrouplist();
    this.getWPSUserlistById();
    // this.getMolId(this.id)
    this.getWPSBanklist()
  }

  getWPSGrouplist() {
    this.employeeWpsService.getAll().subscribe(result => {
      this.groupId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the WPS Group List Details');
      });
  }

  getWPSUserlistById() {
    this.employeeWpsUserService.get(this.id).subscribe(result => {
      this.wpsUserDetails = result;
      this.wpsId=result[0].wpsId;
      this.addForm.patchValue(result[0]);
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the WPS List Details');
      });
  }

  onSubmit() {
    if(this.wpsId){
      const addWpsDetails = this.addForm.value;
      console.log("details",this.addForm.getRawValue());
      
      addWpsDetails.employeeId = parseInt(this.id, 10);
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
    this.employeeWpsUserService.getBank().subscribe(result => {
      this.bankList = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the WPS Group List Details');
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
      // Validators.pattern(/^\d{1,14}$/),
        Validators.required,
         Validators.maxLength(14),
        
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


  

}
