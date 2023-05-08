import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { PayrollComponentService } from "../payroll-component.service";
import { duplicateNameValidator } from "@shared/utils/validators.functions";
import { getCurrentUserId } from "@shared/utils/utils.functions";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";
import { IncludeInPaySlipType } from "src/app/models/common/types/includeinpaysliptype";
import { PayHeadType } from "src/app/models/common/types/payheadtype";
import { RoundingType } from "src/app/models/common/types/roundingtype";
import { PayHeadBaseUnitType } from "src/app/models/common/types/paybaseunittype";
import { PayHeadContractValueType } from "src/app/models/common/types/paycontracttype";

@Component({
  selector: "hrms-payroll-component-create",
  templateUrl: "./payroll-component-create.component.html",
})
export class PayrollComponentCreateComponent implements OnInit {
  addForm: FormGroup;
  currentUserId: number;

  payHeadTypes = PayHeadType;
  payContractTypes = PayHeadContractValueType;
  payBaseUnitTypes = PayHeadBaseUnitType;
  includePaySlipTypes = IncludeInPaySlipType;
  roundingTypes = RoundingType;

  payrollComponentTypeKeys: number[];
  payHeadTypeKeys: number[];
  payContractTypeKeys: number[];
  payBaseUnitTypeKeys: number[];
  includePaySlipTypeKeys: number[];
  roundingTypeKeys: number[];

  @Input() payrollComponentNames: string[];
  @Input() payrollComponentCodes: string[];
  payrollComponentTypeKeysSearch: any;

  config;

  constructor(
    private payrollComponentService: PayrollComponentService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService
  ) {}

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();

    this.payHeadTypeKeys = Object.keys(this.payHeadTypes)
      .filter(Number)
      .map(Number);
    this.payContractTypeKeys = Object.keys(this.payContractTypes)
      .filter(Number)
      .map(Number);
    this.payBaseUnitTypeKeys = Object.keys(this.payBaseUnitTypes)
      .filter(Number)
      .map(Number);
    this.includePaySlipTypeKeys = Object.keys(this.includePaySlipTypes)
      .filter(Number)
      .map(Number);
    this.roundingTypeKeys = Object.keys(this.roundingTypes)
      .filter(Number)
      .map(Number);
      debugger

    this.payrollComponentService
      .getAllPayrollComponentByType()
      .subscribe((result) => {        
        this.payrollComponentTypeKeys = result.sort((a, b) => a.categoryId - b.categoryId);
        this.payrollComponentTypeKeysSearch = result.sort((a, b) => a.categoryId - b.categoryId);
      });
 debugger
    this.config = {
      displayKey: "name",
      search: true,
      limitTo: 0,
      placeholder: "Select a Payroll Component Type",
      noResultsFound: "No results found!",
      searchPlaceholder: "Search",
      searchOnKey: "name",
      clearOnSelection: false,
    };
  }
  // searchPayroll(value){
  //   debugger
  //   this.payrollComponentTypeKeys=this.payrollComponentTypeKeysSearch.filter((res)=>{
  //     return res.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
  //   })

  // // let a = event.toUpperCase();

  // // for (let i = 0; i <
  // //   this.payrollComponentTypeKeys.length; i++) {
  // //   let txtValue = a[i].textContent || a[i].innerText;
  // //   if (txtValue.toUpperCase().indexOf(a) > -1) {
  // //     a[i]= "";
  // //   } else {
  // //     a[i] = "none";
  // //   }
  // // }
  // }
  // filterDropdown(e) {
  //   debugger
  //   console.log("e in filterDropdown -------> ", e);
  //   window.scrollTo(window.scrollX, window.scrollY + 1);
  //   let searchString = e.toLowerCase();
  //   if (!searchString) {
  //     this.payrollComponentTypeKeys = this.payrollComponentTypeKeysSearch.slice();
  //     return;
  //   } else {
  //     this.payrollComponentTypeKeys = this.payrollComponentTypeKeysSearch.filter(
  //       user => user.name.toLowerCase().indexOf(searchString) > -1
  //     );
  //   }
  //   window.scrollTo(window.scrollX, window.scrollY - 1);
  //   console.log("this.filteredList indropdown -------> ", this.payrollComponentTypeKeys);
  // }

  // selectValue(name) {
  //   this.selectedValue = name;
  //   console.log(this.selectedValue)

  // }

  selectionChanged(args) {
    debugger
    this.addForm.get("payrollComponentType").patchValue(args.value.id);
  }

  get name() {
    return this.addForm.get("name");
  }

  get code() {
    return this.addForm.get("shortCode");
  }

  onSubmit() {
    const payrollComponentForm = this.addForm.value;
    payrollComponentForm.payrollComponentType = parseInt(
      payrollComponentForm.payrollComponentType,
      10
    );

    this.payrollComponentService.add(payrollComponentForm).subscribe(
      (result: any) => {
        if (result.id === -1) {
          this.toastr.showErrorMessage("Payroll component already exists!");
        } else {
          this.toastr.showSuccessMessage(
            "Payroll component added successfully!"
          );
          this.activeModal.close("submit");
        }
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to add the payroll component ");
      }
    );
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          //Validators.pattern("^([a-zA-Z0-9 ])+$"),
          duplicateNameValidator(this.payrollComponentNames),
        ],
      ],
      payrollComponentType: [null, [Validators.required]],
      shortCode: [
        "",
        [
          Validators.required,
          Validators.maxLength(30),
          //Validators.pattern("^([a-zA-Z0-9])+$"),
          duplicateNameValidator(this.payrollComponentCodes),
        ],
      ],
      description: ["", [ Validators.maxLength(128)]],
      payHeadType: [null, Validators.required],
      payHeadContractValueType: [null, Validators.required],
      minimumLimit: [0],
      maximumLimit: [0],
      payHeadBaseUnitType: [null, Validators.required],
      includeInPaySlipType: [null, Validators.required],
      roundingType: [null, Validators.required],
      orderNumber:[null,Validators.required]
    });
  }
}
