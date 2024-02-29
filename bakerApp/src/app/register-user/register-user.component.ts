import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CakeService } from '../sevices/cake.service';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export function customEmailValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value as string;

  // Define your custom email format using a regular expression
  const customEmailPattern =/^[a-zA-Z0-9._%+-]+@[a-zA-Z][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!customEmailPattern.test(email)) {
    return { customEmail: true }; // Validation failed
  }

  return null; // Validation passed
}
export function textOnlyValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const textPattern = /^[a-zA-Z\s]*$/; // Regular expression for letters and spaces

  if (!textPattern.test(value)) {
    return { textOnly: true };
  }

  return null;
}
// export function notEqualValidator(control: AbstractControl): ValidationErrors | null {
//   const firstName = control.get('firstName')?.value;
//   const lastName = control.get('lastName')?.value;

//   if (firstName === lastName) {
//     return { notEqual: true };
//   }
  

//   return null;
// }
export function notEqualValidator(control: AbstractControl): ValidationErrors | null {
  const firstName = control.parent?.get('firstName')?.value;
  const lastName = control.value;

  if (firstName === lastName) {
    return { notEqual: true };
  }

  return null;
}

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit{
  ngOnInit(): void {
    
  }
  constructor(private _fb:FormBuilder,private _snackbar:MatSnackBar ,private _cakeservice:CakeService,private _route:Router){}
  RegistrationForm = this._fb.group({
    user_role:['user'],
    firstName:['',[Validators.required,Validators.minLength(2),textOnlyValidator]],
    lastName:['',[Validators.required,textOnlyValidator,notEqualValidator]],
    email:['',[Validators.required,customEmailValidator]],
    password:['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    conformPassword:['',[Validators.required,this.passwordsMatchValidator]],
    gender:[''],
    age:[0,[Validators.required,Validators.min(18)]],
    phoneNumber:['',[Validators.required,Validators.pattern(/^[789]\d{9,9}$/)]],
    address :this._fb.group({
      street:['',],
      city:[''],
      state:[''],
      zipCode:['',Validators.pattern(/^\d{5}(?:\d{1})?$/)]

    }),
    items:[],
    orders:[],

  }
  )


  get firstName(){
    return this.RegistrationForm.get("firstName")
  }
  get lastName(){
    return this.RegistrationForm.get("lastName")
  }
  get email(){
    return this.RegistrationForm.get("email")
  }
  get password(){
    return this.RegistrationForm.get("password")
  }
  get conformPassword(){
    return this.RegistrationForm.get("conformPassword")
  }
  get age(){
    return this.RegistrationForm.get("age")
  }
  get phoneNumber(){
    return this.RegistrationForm.get("phoneNumber")
  }
  get zipCode(){
    return this.RegistrationForm.get("address.zipCode")
  }
  get address(){
    return this.RegistrationForm.get("address")
  }
  get gender(){
    return this.RegistrationForm.get("gender")
  }
  onSubmit() {
    this.RegistrationForm.patchValue({ items: [] });
    this.RegistrationForm.patchValue({ orders: [] });
    this._cakeservice.addUsers(this.RegistrationForm.value).subscribe(
      (data:any)=>{
         console.log(this.RegistrationForm.value);
         
           // console.log('User data set:', data);
          
         
          this._snackbar.open('Congrats!!You have submiited the form!!', 'success', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary'],
           verticalPosition:'top'
      })
      setTimeout(() => {
        this._route.navigate(['/login']); // Replace 'login' with the actual route path to your login page
      }, 3000); 

    },
    (error)=>{
      alert("Error While registering the usesr")

    })
    
   
   
  }
  passwordsMatchValidator(control: AbstractControl) {
    const password = control.parent?.get('password').value;
    const confirmPassword = control?.value;

    if (password !== confirmPassword) {
      return { passwordsNotMatch: true };
    }

    return null;
  }
  canExist():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.RegistrationForm.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?')
        ? true
        : false;
    }
    return true;
  }

}
