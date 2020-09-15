import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { LeaveConfigurationService } from '../../leave-configuration/leave-configuration.service';
import { LeaveComponent } from '../../leave-component/leave-component.model';
import { LeaveStructure } from '../leave-structure.model';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { Router } from '@angular/router';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-leave-structure-assign',
  templateUrl: './leave-structure-assign.component.html'
})
export class LeaveStructureAssignComponent implements OnInit {

  addForm: FormGroup;
  currentUserId: number;
  isMatch: boolean;
  isEmpty = false;

  @Input() assignedLeaveComponents: LeaveComponent[];
  @Input() leaveStructure: LeaveStructure;
  @Input() allLeaveComponents: LeaveComponent[];

  constructor(
    private leaveConfigurationService: LeaveConfigurationService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.addCheckboxes();
  }

  isConfigured(index): boolean {
    return this.allLeaveComponents[index].code.toLowerCase() === 'lop';
  }

  onSubmit() {
    const selectedTypes = [];
    const removedTypes = [];
    let componentCount = 0;

    this.addForm.get('types').value.forEach((type, i) => {
      const currentLeaveComponent = this.assignedLeaveComponents.find(e => e.id === this.allLeaveComponents[i].id);

      if (type && !currentLeaveComponent) {
        const selectedType = {
          leaveStructureId: this.leaveStructure.id,
          leaveComponentId: this.allLeaveComponents[i].id,
          isConfigured: this.isConfigured(i),
          createdBy: this.currentUserId,
          modifiedBy: this.currentUserId
        };
        selectedTypes.push(selectedType);
      } else if (!type && currentLeaveComponent) {
        removedTypes.push({
          leaveStructureId: this.leaveStructure.id, leaveComponentId: this.allLeaveComponents[i].id
        });
      }
      if (type) {
        componentCount++;
      }
    });

    if (componentCount === 0) {
      this.isEmpty = true;
    } else {
      this.leaveConfigurationService.add(this.leaveStructure.id, selectedTypes, removedTypes).subscribe(() => {

        if (selectedTypes.length === 0 && this.leaveStructure.isConfigured) {
          this.router.navigate(['settings/leave/leave-structure'], {
            queryParams: {
              leaveStructureId: this.leaveStructure.id
            }
          });
        } else {
          this.router.navigate(['settings/leave/' + this.leaveStructure.id + '/leave-configuration/']);
        }
        this.activeModal.close('submit');

      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('Unable to assign the leave components');
        });
    }
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      types: new FormArray([])
    });
  }

  private addCheckboxes() {

    this.allLeaveComponents.forEach((o) => {

      this.isMatch = this.assignedLeaveComponents.some((el) => {
        return el.id === o.id;
      });

      (this.addForm.controls.types as FormArray).push(new FormControl(this.isMatch));

    });
  }
}
