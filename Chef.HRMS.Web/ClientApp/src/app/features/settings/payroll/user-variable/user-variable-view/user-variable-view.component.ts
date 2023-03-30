import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserVariableGroup } from '../user-variable-list/user-variable.model';


@Component({
  selector: 'hrms-user-variable-view',
  templateUrl: './user-variable-view.component.html',
  styleUrls: ['./user-variable-view.component.scss']
})
export class UserVariableViewComponent implements OnInit {
  @Input() userDetails: UserVariableGroup;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}



