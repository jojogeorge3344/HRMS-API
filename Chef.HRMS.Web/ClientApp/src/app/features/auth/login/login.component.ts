import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from './../../../services/auth/auth.service';
import { MainComponent } from '@shared/layout/main/main.component';
import { FeaturesService } from '@shared/services/features.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
@Component({
  selector: 'hrms-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';
  features: any;
  subFeatures: any;
 userid:any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private featuresService: FeaturesService,
    private router: Router,
    private toastr: ToasterDisplayService,
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
    // this.authService.removeToken();
    
    this.errorMessage = '';
    this.loginForm = this.formBuilder.group({
      username: [null],
      password: [null],
    });
  }
  // getParentComponent(): MainComponent {
  //   // return this.viewContainerRef._data.componentView.component.viewContainerRef._view.component;

  // }
  // onSubmit() {
  //   this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
  //     .subscribe(res => {
  //       if (res.token) {
  //         localStorage.setItem('token', res.token);
  //         this.featuresService.getById(res.employeeId).subscribe(response => {
  //           if (response) {
  //             response = response.flatMap(feature => (
  //               [
  //                 feature.featureName.toLowerCase(),
  //                 `${feature.featureName.toLowerCase()}-${feature.subFeatureName.toLowerCase()}`
  //               ]
  //             ));
  //           }
  //           this.features = response.filter((feature, i) => i % 2 === 0);
  //           this.subFeatures = response.filter((feature, i) => i % 2 === 1);

  //           localStorage.setItem('features', this.features.join(','));
  //           localStorage.setItem('subFeatures', this.subFeatures.join(','));
  //           this.router.navigateByUrl('');
  //         });
  //       }
  //     }, error => {
  //       this.errorMessage = (error.error && error.error.message) ? error.error.message : '';
  //     });
  // }


  onSubmit(): any {
    if (this.loginForm.value.username == null || this.loginForm.value.password == null ) {
      this.toastr.showErrorMessage(
        "Please Fill All Credentials"
      );
    }else{
      this.authService.login(this.loginForm.value)
      if(localStorage.getItem("token")){
        
        this.authService.getCurrentUser().subscribe((response)=>{
          
           if(response){
            this.router.navigate(['/']);
            this.userid= response.id
            setTimeout(()=>{                          
              this.getempid()
          }, 3000);
       
           }
        });
       
       
      }
    }
  
  } 
  getempid(){
    this.featuresService.getById(this.userid).subscribe(response => {
        
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
}
