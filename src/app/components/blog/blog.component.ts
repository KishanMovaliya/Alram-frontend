import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlogserviceService } from 'src/app/service/blogservice.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  getblogs: any = []
  getallblog: any = []
  public isCollapsed = true;
  getblogid: any
  commentForm: FormGroup;
  submitted = false
  currentUser: any;
  emailget: any;
  useridget: any;

  constructor(public blogservice: BlogserviceService, private toastr: ToastrService,
    public formBuilder: FormBuilder) {
      this.currentUser = JSON.parse(localStorage.getItem('user'))
      this.emailget = this.currentUser?.userCredentials?.email
      this.useridget = this.currentUser?.userCredentials?._id
     }

  ngOnInit(): void {
    this.blogservice.getblog().subscribe(res => {
      this.getblogs = [res]
      this.getblogs.map(r => {
        this.getallblog = r.data
        this.getblogid = r._id
      })
    })
    this.createCommentForm()
  }

   //----------------Create Blog Form----------------------------
   createCommentForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required]],
      userId: ['',]
    });
  }

  get myForm() {
    return this.commentForm.controls;
  }

  onlikeClick() {
    this.toastr.success("successfully  like")
  }

  addcomment(id){
      this.submitted = true
      this.getblogid=id
      this.commentForm.value.userId=this.useridget
      console.log(this.getblogid,this.commentForm.value)
      if(this.commentForm.valid){
        this.blogservice.addcomment(this.getblogid,this.commentForm.value).subscribe(res=>{
          console.log(res)
        })
      }
      
  }

}
