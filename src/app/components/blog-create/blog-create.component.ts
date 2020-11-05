import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogserviceService } from 'src/app/service/blogservice.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
})
export class BlogCreateComponent implements OnInit {
  blogcreateForm: FormGroup;
  currentUser: any;
  emailget: any;
  useridget: any;
  submitted = false
  username:any

  constructor(public blogservice:BlogserviceService,public formBuilder: FormBuilder,
     private toastr: ToastrService,public router: Router) {

    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.emailget = this.currentUser?.userCredentials?.email
    this.useridget = this.currentUser?.userCredentials?._id
    this.username = this.currentUser?.userCredentials?.name

   }

  ngOnInit(): void {
    this.createBlogForm()
  }


   //----------------Create Blog Form----------------------------
   createBlogForm() {
    this.blogcreateForm = this.formBuilder.group({
      email: ['',],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      userId: ['',],
    });
  }

  //------------------return control-----------------------------
  get myForm() {
    return this.blogcreateForm.controls;
  }


  //----------------create blog---------------------------------
createBlog(){
  this.submitted = true
  this.blogcreateForm.value.email =this.emailget
  this.blogcreateForm.value.userId = this.useridget
  this.blogcreateForm.value.authorName=this.username
  if(this.blogcreateForm.invalid){
    return 
  }
  if(this.blogcreateForm.valid){
        this.blogservice.createblog(this.blogcreateForm.value).subscribe(res=>{
          this.toastr.success('SuccessFully update!', 'Time!');
          this.router.navigate(['/getblog']);
        })
  }else{
    this.toastr.error("wrong")
  }
}

}
