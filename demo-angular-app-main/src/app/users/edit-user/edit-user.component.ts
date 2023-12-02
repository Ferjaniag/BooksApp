import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { FormBuilder } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(
    private activatedRoute : ActivatedRoute,
    private service : UserService,
    private formBuilder : FormBuilder,
    private router : Router){}

  user? : User;
  //Reactive Form
  editForm = this.formBuilder.group({
    name : '',
    email : '',
    password : ''
  });
  



  editUser = ()=>{
    //console.log(this.editForm);
    const values = this.editForm.value;
    this.service.editUser(
      new User(this.user!.id, values.name!, values.email!, values.password!)
    ).subscribe(
      user => this.router.navigate(['/users'])
    );
  }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params=>{
        //this.book = this.service.getBookById(+params['id']);
        this.service.getUserById(+params['id']).subscribe(
          user=> {
            this.user = user;

            //console.log(this.book);
            this.editForm.setValue({
              name : this.user.name,
              email : this.user.email,
              password : this.user.password + ''
            })
          }
        )
      }
    )

  }

}

