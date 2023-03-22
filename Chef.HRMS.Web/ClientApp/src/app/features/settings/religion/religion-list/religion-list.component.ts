import { Component, OnInit } from '@angular/core';
import { ReligionCreateComponent } from '../religion-create/religion-create.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import{ReligionService} from '../religion-detail.service'
import { ReligionGroup } from '../religion.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import{ReligionEditComponent} from '../religion-edit/religion-edit.component';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import{ReligionViewComponent} from '../religion-view/religion-view.component'
@Component({
  selector: 'hrms-religion-list',
  templateUrl: './religion-list.component.html',
  styleUrls: ['./religion-list.component.scss']
})
export class ReligionListComponent implements OnInit {

  religionDetails: ReligionGroup[] = [];
  Codes: string[];
  Names: string[];

  constructor(
    public modalService: NgbModal,
    private religionService:ReligionService,
    private toastr: ToasterDisplayService,
  ) { }

  ngOnInit(): void {
    this.getReligionlist()
  }

  getReligionlist() {
    this.religionService.getAll().subscribe(result => {
      this.religionDetails = result;
      this.Codes = this.religionDetails.map(a => a.code.toLowerCase());
      this.Names = this.religionDetails.map(a => a.name.toLowerCase());
      

    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Religion List Details');
    });
  }
  openCreate() {
    const modalRef = this.modalService.open(ReligionCreateComponent,
      {size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name= this.Names;
    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getReligionlist()
        }
    });  
  }
  openEdit(relDetails: ReligionGroup) {
    const modalRef = this.modalService.open(ReligionEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.relDetails= relDetails;
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name = this.Names;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getReligionlist()
      }
    });
  }
  openView(relDetails: ReligionGroup) {
    const modalRef = this.modalService.open(ReligionViewComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.relDetails = relDetails;
    modalRef.componentInstance.code = this.Codes;
    modalRef.componentInstance.name = this.Names;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getReligionlist();
      }
    });
  }

delete(relDetails: ReligionGroup) {
  const modalRef = this.modalService.open(ConfirmModalComponent,
    { centered: true, backdrop: 'static' });
  modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the Religion ${relDetails.name}`;
  modalRef.result.then((userResponse) => {
    if (userResponse == true) {
      this.religionService.delete(relDetails.id).subscribe(() => {
        this.toastr.showSuccessMessage('Religion deleted successfully!');
        this.getReligionlist()
      });
    }
  });
}
}
