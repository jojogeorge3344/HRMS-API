import { Component, OnInit } from '@angular/core';
import { ReligionCreateComponent } from '../religion-create/religion-create.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import{ReligionService} from '../religion-detail.service'
import { ReligionGroup } from '../religion.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-religion-list',
  templateUrl: './religion-list.component.html',
  styleUrls: ['./religion-list.component.scss']
})
export class ReligionListComponent implements OnInit {

  religionDetails: ReligionGroup[] = [];
  groupCodes: string[];
  establishmentId: string[];
  groupNames: string[];

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
      // this.groupCodes = this.wpsDetails.map(a => a.groupCode.toLowerCase());
      // this.groupNames = this.wpsDetails.map(a => a.groupName.toLowerCase());
      // this.establishmentId = this.wpsDetails.map(a => a.establishmentId.toLowerCase());

    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Religion List Details');
    });
  }
  openCreate() {
    const modalRef = this.modalService.open(ReligionCreateComponent,
      {size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.groupCodes = this.groupCodes;
    modalRef.componentInstance.groupNames = this.groupNames;
    modalRef.componentInstance.establishmentId = this.establishmentId;
    modalRef.result.then((result) => {
        if (result == 'submit') {
         
        }
    });  }
}
