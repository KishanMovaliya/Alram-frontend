import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogserviceService } from 'src/app/service/blogservice.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  BlogId;
  blogvalues;
  getblogid: any
  useridget: any;
  commentForm: FormGroup;
  submitted = false
  currentUser: any;
  emailget: any;
  public now: Date = new Date();
  getsingleBlog:any=[]
  username:any

  constructor(private route: ActivatedRoute, public blogservice: BlogserviceService,
    private toastr: ToastrService, public formBuilder: FormBuilder) {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.emailget = this.currentUser?.userCredentials?.email
    this.useridget = this.currentUser?.userCredentials?._id
    this.username = this.currentUser?.userCredentials?.name

    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.BlogId = params.get("id");
      this.getBlog();
    })
    this.createCommentForm()
  }

  getBlog() {
    this.blogservice.getsingleblog(this.BlogId).subscribe(m => {
      this.blogvalues = [m]
      this.blogvalues.map(a=>{
         this.getsingleBlog=a.data
         setInterval(() => {
          this.getsingleBlog
        }, 1);
      })
    })
  }

  //----------------Create Blog Form----------------------------
  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required]],
      userId: ['',],
      currentTime: [''],
      name:['']
    });
  }

  //-----------return form control--------------------------------
  get myForm() {
    return this.commentForm.controls;
  }



 


  //-----------add Comment ----------------------------------------------
  addcomment(id) {
    this.submitted = true
    this.getblogid = id
    this.commentForm.value.userId = this.useridget
    this.commentForm.value.currentTime = this.now
    this.commentForm.value.name=this.username
    if (this.commentForm.valid) {
      this.blogservice.addcomment(this.getblogid, this.commentForm.value).subscribe(res => {
        if (res) {
          this.toastr.success("successfully  Comment add")
          this.commentForm.reset();
        } else {
          this.toastr.error("unsuccessfully  Comment add")
        }
      })
    } else {
      this.toastr.error('Invalid Form')
    }
  }
}
