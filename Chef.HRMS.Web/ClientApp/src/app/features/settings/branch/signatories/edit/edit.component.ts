import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchSignatoryService } from '../../signatory.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';


@Component({
  selector: 'signatory-edit',
  templateUrl: './edit.component.html'
})
export class EditSignatoryComponent implements OnInit {

  signatoryForm: FormGroup;

  @Input() signatoryId: any;
  @Input() countries: any;
  @Input() states: any;

  public statesByCountry: any;

  constructor(
    private signatoryService: BranchSignatoryService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.signatoryForm = this.createFormGroup();
    this.signatoryService.get(this.signatoryId).subscribe(result => {
      this.getStatesByCountry(result.country);
      const code = result.phone.split('-')[0].substr(1);
      result.phone = result.phone.split('-')[1];
      this.signatoryForm.patchValue(result);
      this.signatoryForm.patchValue({ phoneCode: code });
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the signatory');
      });
  }

  getStatesByCountry(countryId) {
    this.statesByCountry = this.states.filter((state) => state.countryId == countryId);
  }

  onSubmit() {
    const signatoryForm = this.signatoryForm.value;
    signatoryForm.phone = `+${signatoryForm.phoneCode}-${signatoryForm.phone}`;

    signatoryForm.stateName = this.states.find(i => i.id === signatoryForm.stateOrProvince).name;
    signatoryForm.countryName = this.countries.find(i => i.id === signatoryForm.country).name;

    this.signatoryService.update(signatoryForm).subscribe(result => {
      this.toastr.showSuccessMessage('The signatory is updated successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('There is an error in updating signatory');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      branchId: [''],
      fullName: ['', [
        Validators.required, Validators.maxLength(32)
      ]],
      fatherName: ['', [
        Validators.required, Validators.maxLength(32)
      ]],
      designation: ['', [
        Validators.required, Validators.maxLength(32)
      ]],
      panNumber: ['', [
        Validators.required, Validators.maxLength(16)
        // Validators.pattern('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$')
      ]],
      addressLine1: ['', [
        Validators.required, Validators.maxLength(128)
      ]],
      addressLine2: ['', [
        Validators.required, Validators.maxLength(128)
      ]],
      city: ['', [
        Validators.required, Validators.maxLength(64)
      ]],
      stateOrProvince: [0],
      stateName: [''],
      countryName: [''],
      country: ['', [
        Validators.required
      ]],
      pincode: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.email, Validators.maxLength(64)
      ]],
      phoneCode: ['', [Validators.pattern(/^\d{1,3}$/)]],
      phone: ['', [
        Validators.pattern(/^\d{1,11}$/)
        // PhoneNumberValidator
      ]],
      fax: ['', [Validators.maxLength(16), Validators.pattern(/^\d{1,16}$/)]],
    });
  }
}
