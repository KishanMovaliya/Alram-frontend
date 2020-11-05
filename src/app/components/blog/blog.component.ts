import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BlogserviceService } from 'src/app/service/blogservice.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  
})
export class BlogComponent implements OnInit {
  getblogs: any = []
  getallblog: Observable<any>;
  public isCollapsed = true;
  getblogid: any
  submitted = false
  selection = []
  searchText
  currentUser: any;
  emailget: any;
  useridget: any;
  username: any


  constructor(public blogservice: BlogserviceService, private toastr: ToastrService,
    public router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.emailget = this.currentUser?.userCredentials?.email
    this.useridget = this.currentUser?.userCredentials?._id
    this.username = this.currentUser?.userCredentials?.name

  }

  ngOnInit(): void {

    this.blogservice.getblog().subscribe(res => {
      this.getblogs = [res]
      this.getblogs.map(r => {
        this.getallblog = r.data
        this.getblogid = r._id
      })
    })

  }

  //-----------------navigate singel blog-----------------------
  getsingleblog(id) {
    this.getblogid = id
    this.router.navigate(['blogdetails', this.getblogid]);
  }


  //-----------like click button------------------------------------
  onlikeClick(id) {
    this.getblogid = id
    this.useridget
    this.blogservice.addlike(this.getblogid, { likes: this.useridget }).subscribe(res => {
      this.toastr.success("successfully  Like")
    })
  }

}
