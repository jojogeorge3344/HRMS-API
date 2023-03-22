import { Component, OnInit,Input } from '@angular/core';
import { ReligionGroup } from '../religion.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hrms-religion-view',
  templateUrl: './religion-view.component.html',
  styleUrls: ['./religion-view.component.scss']
})
export class ReligionViewComponent implements OnInit {

  @Input() relDetails: ReligionGroup;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
