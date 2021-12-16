import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hrms-asset-assets-edit',
  templateUrl: './asset-assets-edit.component.html'
})
export class AssetAssetsEditComponent implements OnInit {
  
  editForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){

  }
}
