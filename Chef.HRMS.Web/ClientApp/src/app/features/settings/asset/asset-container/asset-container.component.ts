import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hrms-asset-container',
  templateUrl: './asset-container.component.html'
})
export class AssetContainerComponent implements OnInit {

  tabs = [
    { title: 'Asset Type', fragment: 'asset-type' },
    { title: 'Metadata', fragment: 'asset-metadata' },
    { title: 'Assets', fragment: 'asset-assets' }
  ];

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
