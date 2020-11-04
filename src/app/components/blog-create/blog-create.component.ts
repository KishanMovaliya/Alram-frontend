import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(public blogservice:BlogserviceService,public formBuilder: FormBuilder,
     private toastr: ToastrService) {

    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.emailget = this.currentUser?.userCredentials?.email
    this.useridget = this.currentUser?.userCredentials?._id

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

  get myForm() {
    return this.blogcreateForm.controls;
  }

createBlog(){
  this.submitted = true
  this.blogcreateForm.value.email =this.emailget
  this.blogcreateForm.value.userId = this.useridget
  if(this.blogcreateForm.invalid){
    return 
  }
  if(this.blogcreateForm.valid){
        this.blogservice.createblog(this.blogcreateForm.value).subscribe(res=>{
          this.toastr.success('SuccessFully update!', 'Time!');
          console.log(this.blogcreateForm.value)
        })
  }else{
    this.toastr.error("wrong")
  }
}

}
