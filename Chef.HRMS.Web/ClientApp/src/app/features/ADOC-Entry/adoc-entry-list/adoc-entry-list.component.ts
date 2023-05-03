
import { Component, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { AdocEntryCreateComponent } from '../adoc-entry-create/adoc-entry-create.component';
import { AdocEntryEditComponent } from '../adoc-entry-edit/adoc-entry-edit.component';
import { AdocEntryViewComponent } from '../adoc-entry-view/adoc-entry-view.component';
import { AdocEntryService } from '../adoc-entry-service';
import { AdocEntry } from '../adoc-entry.model';
import { EmployeeService } from '@features/employee/employee.service';

@Component({
  selector: 'hrms-adoc-entry-list',
  templateUrl: './adoc-entry-list.component.html',
  styleUrls: ['./adoc-entry-list.component.scss'],
})
export class AdocEntryListComponent implements OnInit {
  Codes: string[];
  Names: string[];
  adocEntryList;
  employeeList;

  constructor(
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private adocEntryService: AdocEntryService,
    private employeeService: EmployeeService,

  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.adocEntryService.getAll()
      .subscribe((result) => {
        this.adocEntryList = result
        if(this.adocEntryList.status==null){
          this.adocEntryList.status='-'
        }
      })
  }
 


  openCreate() {
    debugger
    const modalRef = this.modalService.open(AdocEntryCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name = this.Names;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAll()
      }
    });
  }


  openEdit(listItem: AdocEntry) {
    const modalRef = this.modalService.open(AdocEntryEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.listItem = listItem;
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name = this.Names;
    console.log('code', this.Codes);
    console.log('name', this.Names);

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAll()
      }
    });
  }
  openView(listItem: AdocEntry) {
    const modalRef = this.modalService.open(AdocEntryViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.documentTypeDetails = listItem;
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name = this.Names;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAll();
      }
    });
  }

  delete(listItem: AdocEntry) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.adocEntryService.delete(listItem.id).subscribe(() => {
          this.toastr.showSuccessMessage('The Item deleted successfully!');
          this.getAll()
        });
      }
    });
  }
}
