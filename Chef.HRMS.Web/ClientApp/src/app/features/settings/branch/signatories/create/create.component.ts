import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchSignatoryService } from '../../signatory.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'signatory-create',
  templateUrl: './create.component.html'
})
export class CreateSignatoryComponent implements OnInit {

  signatoryForm: FormGroup;

  @Input() branchId: any;
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
    this.signatoryForm.patchValue({ branchId: parseInt(this.branchId, 10) });
  }

  getStatesByCountry(countryId) {
    this.statesByCountry = this.states.filter((state) => state.countryId == countryId);
  }

  onSubmit() {
    const signatoryForm = this.signatoryForm.value;
    signatoryForm.phone = `+${signatoryForm.phoneCode}-${signatoryForm.phone}`;

    signatoryForm.stateName = this.states.find(i => i.id === signatoryForm.stateOrProvince).name;
    signatoryForm.countryName = this.countries.find(i => i.id === signatoryForm.country).name;

    this.signatoryService.add(signatoryForm).subscribe(result => {
      this.toastr.showSuccessMessage('The signatory added successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the signatory');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
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
        Validators.required, , Validators.maxLength(16)
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
      phone: ['', [
         Validators.pattern(/^\d{1,3}$/)
        // PhoneNumberValidator
      ]],
      phoneCode: ['', Validators.pattern(/^\d{1,11}$/)],
      fax: ['', [Validators.maxLength(16), Validators.pattern(/^\d{1,16}$/)]],
    });
  }
}
