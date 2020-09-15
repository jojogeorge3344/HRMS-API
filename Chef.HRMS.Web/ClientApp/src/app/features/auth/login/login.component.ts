import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from './../../../services/auth/auth.service';
import { MainComponent } from '@shared/layout/main/main.component';
import { FeaturesService } from '@shared/services/features.service';

@Component({
  selector: 'hrms-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';
  features: any;
  subFeatures: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private featuresService: FeaturesService,
    private router: Router,
    private viewContainerRef: ViewContainerRef) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event) => {
      location.reload();
      // this.getParentComponent().isLoggedIn = true
    });
  }

  ngOnInit(): void {
    // if(this.authService.isLoggedIn()){
    //   this.router.navigateByUrl('')
    // }
    this.errorMessage = '';
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],

    });
  }
  // getParentComponent(): MainComponent {
  //   // return this.viewContainerRef._data.componentView.component.viewContainerRef._view.component;

  // }
  onSubmit() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.featuresService.getById(res.employeeId).subscribe(response => {
            if (response) {
              response = response.flatMap(feature => (
                [
                  feature.featureName.toLowerCase(),
                  `${feature.featureName.toLowerCase()}-${feature.subFeatureName.toLowerCase()}`
                ]
              ));
            }
            this.features = response.filter((feature, i) => i % 2 === 0);
            this.subFeatures = response.filter((feature, i) => i % 2 === 1);

            localStorage.setItem('features', this.features.join(','));
            localStorage.setItem('subFeatures', this.subFeatures.join(','));
            this.router.navigateByUrl('');
          });
        }
      }, error => {
        this.errorMessage = (error.error && error.error.message) ? error.error.message : '';
      });
  }

}
