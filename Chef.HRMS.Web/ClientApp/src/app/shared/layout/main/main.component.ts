import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { mobileNavigation } from './../../../store/navigation';
import { APP_CONFIG } from './../../../app.config';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './../../../services/auth/auth.service';
import { filter } from 'rxjs/operators';
import { FeaturesService } from '@shared/services/features.service';

@Component({
  selector: 'smart-main',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class MainComponent implements OnInit {

  app = APP_CONFIG.app;
  isLoggedIn: boolean;
  isAtAuth: boolean;
  features = [];
  subFeatures = [];
  userid: any;
  constructor(
    private store: Store<any>,
    private featuresService: FeaturesService,
    private router: Router,
    private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAtAuth = this.router.url.startsWith('/auth');
    if (this.isLoggedIn && !this.isAtAuth) {
      if (localStorage.getItem("token")) {
        this.authService.getCurrentUser().subscribe((res) => {
          if (res) {
         
            this.userid = res.id
            this.featuresService.getById(this.userid)
            .subscribe(res => {
              if (res) {
                res = res.flatMap(feature => (
                  [
                    feature.featureName.toLowerCase(),
                    `${feature.featureName.toLowerCase()}-${feature.subFeatureName.toLowerCase()}`
                  ]
                ));
              }
    
    
              this.features = res.filter((feature, i) => i % 2 === 0);
              this.subFeatures = res.filter((feature, i) => i % 2 === 1);
    
              localStorage.setItem('features', this.features.join(','));
              localStorage.setItem('subFeatures', this.subFeatures.join(','));
            });
            // this.getempid()
          }
        });
      }
    
    }

  }
  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAtAuth = this.router.url.startsWith('/auth');
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(res => {
        this.isAtAuth = this.router.url.startsWith('/auth');
      });


  }


  closeMobileNav($event: MouseEvent) {
    $event.preventDefault();
    this.store.dispatch(mobileNavigation({ open: false }));
  }

}
