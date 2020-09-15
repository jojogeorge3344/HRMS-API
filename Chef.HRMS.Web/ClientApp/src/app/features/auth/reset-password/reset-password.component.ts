import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MustMatch } from '@shared/utils/utils.functions';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'hrms-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  passwordForm:FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }
  

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      email: ['',[Validators.email, Validators.required]],
      password: ['',[ Validators.required]], 
      confirmPassword: ['',[ Validators.required]], 
      
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }
  onSubmit(){
    console.log(this.passwordForm.value);
    this.authService.resetPassword(
      {
        email:this.passwordForm.value.email,
      password:this.passwordForm.value.password
      })
      .subscribe(res=>{
        console.log(res)
      })

  }

}
