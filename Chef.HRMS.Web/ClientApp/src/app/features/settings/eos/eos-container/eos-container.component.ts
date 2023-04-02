
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hrms-eos-container',
  templateUrl: './eos-container.component.html',
  styleUrls: ['./eos-container.component.scss']
})
export class EosContainerComponent implements OnInit {

  tabs = [
    { title: 'EOS', fragment: 'eos' },
    { title: 'EOS SLAB', fragment: 'eos-slab'},
  ];
  
  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}




