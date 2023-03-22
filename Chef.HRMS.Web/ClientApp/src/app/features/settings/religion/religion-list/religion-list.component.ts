import { Component, OnInit } from '@angular/core';
import { ReligionCreateComponent } from '../religion-create/religion-create.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hrms-religion-list',
  templateUrl: './religion-list.component.html',
  styleUrls: ['./religion-list.component.scss']
})
export class ReligionListComponent implements OnInit {

  groupCodes: string[];
  establishmentId: string[];
  groupNames: string[];

  constructor(
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
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
