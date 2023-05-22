import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { EmployeeAddress } from './employee-address.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

import { getCurrentUserId } from '@shared/utils/utils.functions';
import { StateService } from '@settings/branch/state.service';
import { CountryService } from '@settings/branch/country.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../employee-address-edit/employee-address-state.service';
import { EmployeeAddressService } from '../employee-address-edit/employee-address.service';


@Component({
  selector: 'hrms-employee-address-create',
  templateUrl: './employee-address-create.component.html',
  styleUrls: ['./employee-address-create.component.scss']
})
export class EmployeeAddressCreateComponent implements OnInit {


  editForm: FormGroup;
 // @Input() address: EmployeeAddress;
  public countries: any;
  public states: any;
  currentUserId: number;
  id:any
  public currentstatesByCountry: any;
  public permanentstatesByCountry: any;
  getStateValue: any;
  currentStateValue:any;
  permanentStateValue: any;
  @Output() addressDetailsForm = new EventEmitter<any>();
  @Input() passEmployeeId:any


  constructor(private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private addressService: EmployeeAddressService,
    private stateService: StateService,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    ) { }


  ngOnInit(): void {
    //this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    
    // if (this.address) {
    //   this.editForm.patchValue(this.address);
    //   this.getStatesByCountry(this.address.currentCountry, 'current');
    //   this.getStatesByCountry(this.address.currentCountry, 'permenant');
    // }
    this.route.params.subscribe((params: any) => {
      this.id = parseInt(params.id, 10);
      });
      this.getStates()
     this.getCountires()
  }
  getCountires() {
    this.countryService.getAll().subscribe(result => {
      this.countries = result.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())) 
    },
      error => {
        console.error(error);
      });
      this.getStates()
  }

  getStates() {
    this.stateService.getAll().subscribe(result => {
      this.states = result.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())) 
      this.getAll()
    },
      error => {
        console.error(error);
      });
  }
  getAll(){
    let data=[];
    this.addressService.get(this.id).subscribe((res)=>{
      data=res
      this.editForm.value.currentCountry=res[0].currentCountry
      this.editForm.patchValue({
        currentState:res[0].currentState ? res[0].currentState : "",
        permanentState: res[0].permanentState ?  res[0].permanentState : "",
      })
      this.permanentStateValue= res[0].permanentState
      if(this.editForm.value.currentCountry || this.editForm.value.permanentCountry){
      this.getStatesByCountry(this.editForm.value.currentCountry, 'current');
      this.getStatesByCountry(this.editForm.value.permanentCountry, 'permenant');
      }
      this.getStateValue=res[0].id
     
      
        this.editForm.patchValue({
          employeeId: res[0].employeeId,
          currentAddressLine1:res[0].currentAddressLine1,
          currentAddressLine2:res[0].currentAddressLine2,
          currentCountry: res[0].currentCountry,
          currentState: res[0].currentState ? res[0]?.currentState : "",
          currentPinCode: res[0].currentPinCode,
          permanentAddressLine1: res[0].permanentAddressLine1,
          permanentAddressLine2: res[0].permanentAddressLine2,
          permanentCountry: res[0].permanentCountry,
          permanentState: res[0].permanentState ?  res[0]?.permanentState : "",
          permanentPinCode: res[0].permanentPinCode,
          //id:res[0].id
        });
      
    
       // this.setpermanentAsCurrent(this.editForm.value.currentState, 'permanentState');
    
    })
    
    // if(!this.editForm.controls.ispermanentSameAsCurrent.value && this.permanentStateValue ){
    //  this.editForm.value.permanentState=this.permanentStateValue
    // }
// setTimeout(() => {
//   this.editForm.patchValue({
//     currentState: data[0].currentState,
//     permanentState: data[0]?.permanentState,
//   })
// }, 200);

  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      currentAddressLine1: ['', [
        Validators.required,
        Validators.maxLength(128),
      ]],
      currentAddressLine2: ['', [
        Validators.maxLength(128),
      ]],
      currentCountry: ['', [
        Validators.required,
        Validators.maxLength(32),
      ]],
      currentPinCode: ['', [
        Validators.required,
        Validators.maxLength(6),
        Validators.pattern("^[0-9]*$")
      ]],
      currentState: ['', [
        Validators.required,
      ]],
      permanentAddressLine1: ['', [
        Validators.required,
        Validators.maxLength(128),
      ]],
      permanentAddressLine2: ['', [
        Validators.maxLength(128),
      ]],
      permanentCountry: ['', [
        Validators.required,
        Validators.maxLength(32),
      ]],
      permanentPinCode: ['', [
        Validators.required,
        Validators.maxLength(6),
        Validators.pattern("^[0-9]*$"),
      ]],
      permanentState: ['', [
        Validators.required,
      ]],
      ispermanentSameAsCurrent: [false],
      createdDate: []
     

    });
  }
  getStatesByCountry(countryId, addressType) {
    if (addressType === 'current') {
      // this.commonService.getStatesByCountryId(countryId).subscribe((result)=>{
      //   this.currentstatesByCountry=result
        
      // })
      this.currentstatesByCountry = this.states?.filter((state) => state.countryId == countryId);
      this.setpermanentAsCurrent(this.editForm.controls.currentCountry.value, 'permanentCountry');
      if (this.editForm.controls.ispermanentSameAsCurrent.value) {
        this.permanentstatesByCountry = this.states?.filter((state) => state.countryId == countryId);
      }
    } else {
      this.permanentstatesByCountry = this.states?.filter((state) => state.countryId == countryId);
    
    }
  }
  currentAspermanent() {
    if (this.editForm.controls.ispermanentSameAsCurrent.value) {
      this.setpermanentAsCurrent(this.editForm.controls.currentAddressLine1.value, 'permanentAddressLine1');
      this.setpermanentAsCurrent(this.editForm.controls.currentAddressLine2.value, 'permanentAddressLine2');
      this.setpermanentAsCurrent(this.editForm.controls.currentCountry.value, 'permanentCountry');
      this.getStatesByCountry(this.editForm.controls.currentCountry.value, 'permanent');
      this.setpermanentAsCurrent(this.editForm.controls.currentState.value, 'permanentState');
      this.setpermanentAsCurrent(this.editForm.controls.currentPinCode.value, 'permanentPinCode');


      this.editForm.controls.permanentAddressLine1.disable();
      this.editForm.controls.permanentAddressLine2.disable();
      this.editForm.controls.permanentCountry.disable();
      this.editForm.controls.permanentPinCode.disable();
      this.editForm.controls.permanentState.disable();
    } else {
      this.editForm.controls.permanentAddressLine1.enable();
      this.editForm.controls.permanentAddressLine2.enable();
      this.editForm.controls.permanentCountry.enable();
      this.editForm.controls.permanentPinCode.enable();
      this.editForm.controls.permanentState.enable();
    }
  }
  setpermanentAsCurrent(value: any, field: string) {
    if (this.editForm.controls.ispermanentSameAsCurrent.value) {
      const updatevalue = {};
      updatevalue[field] = value;
      this.editForm.patchValue(updatevalue);
    }

  }
  onSubmit() {
  
    const address = this.editForm.getRawValue();
    address.employeeId = this.passEmployeeId
    address.createdDate = new Date();
    if (this.getStateValue) {
      address.id = this.getStateValue;
    } 

    address.currentCountry = parseInt(address.currentCountry, 10);
    address.currentState = parseInt(address.currentState, 10);
    address.permanentCountry = parseInt(address.permanentCountry, 10);
    address.permanentState = parseInt(address.permanentState, 10);
    if(address.id){
    this.addressService.update(address).subscribe(res => {
      if (res) {
        this.toastr.showSuccessMessage('The address updated successfully');
        // this.activeModal.close('submit');
      }
    }, error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to update the address');
    });
  }else{

    this.addressService.update(address).subscribe(res => {
      if (res) {
        this.toastr.showSuccessMessage('The address added successfully');
        // this.activeModal.close('submit');
        this.addressDetailsForm.emit(address)
      }
    }, error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to add the address')
    });
  }


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

}



