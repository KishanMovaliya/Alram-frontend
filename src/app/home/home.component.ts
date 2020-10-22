import { Component, OnInit } from '@angular/core';
import { AuthapiService } from '../service/authapi.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { SnoozeService } from '../service/snooze.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  submitted = false
  currentUser: any;
  emailget: any
  clockForm: FormGroup;
  isRepeatAlarm = false;
  selectedItemsList = [];
  checkedIDs = [];
  getemail: any = []
  getShedule: any = []
  public isCollapsed = true;
  public isCollapsedd = true;
  idget = ''
  getchecked: any
  selection = []
  showMyContainer: boolean = false;
  index: ''
  open = false
  indexvalue = null;
  public status: Boolean
  valueChange = "";
  collection = []
  mySubscription: any;
  showSpinner: boolean = true;

  getstop = []
  getSheduleSnooze: any = []
  onSnoozelimit: any;
  idgets = '';

  //-----------Option days----------------------------------------
  days = [
    {
      day: 'Everyday',
      id: -1,
    },
    {
      day: 'Sunday',
      id: 0,
    },
    {
      day: 'Monday',
      id: 1,
    },
    {
      day: 'Tuesday',
      id: 2,
    },
    {
      day: 'Wednesday',
      id: 3,
    },
    {
      day: 'Thursday',
      id: 4,
    },
    {
      day: 'Friday',
      id: 5,
    },
    {
      day: 'Saturday',
      id: 6,
    }
  ];

  constructor(public authService: AuthapiService,
    public formBuilder: FormBuilder, public router: Router, public Authservice: SnoozeService) {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.emailget = this.currentUser.userCredentials.email
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });

    //-----------for day list-----------------------------
    for (let i = 1; i <= 10; i++) {
      this.collection.push(`${i}`);
    }
  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.createalaramForm()

    //--------------------get the Email shedule----------------------------
    this.authService.getemailshedules().subscribe((res: any) => {
      this.getemail = [res];
      this.getemail.map(ress => {
        this.getShedule = ress.data
        this.getShedule.map(a => {
          this.idget = a._id
        })
        this.showSpinner = false

      })
    }
    )

    //-----------------------Getsnooze limits-----------------------------------
    //   this.Authservice.getsnoozeshedules().subscribe((res: any) => {
    //     this.getstop = [res];
    //     this.getstop.map(ress => {
    //       this.getSheduleSnooze = ress.data
    //       this.getSheduleSnooze.map(a => {
    //         this.onSnoozelimit=a.limitsend
    //         this.idgets = a._id
    //       })
    //     })
    //   }
    //   )
  }


  //----------------Create Alaram Form----------------------------
  createalaramForm() {
    this.clockForm = this.formBuilder.group({
      date: [''],
      time: [''],
      day: [''],
      status: [''],
      stepday: ['']
    });
  }

  //-----------Chnage stepdays-------------------------------------
  changedays(e) {

    this.daysstep.setValue(e.target.value, {
      onlySelf: true
    })
  }
  //-----------get step day value-------------------------------------
  get daysstep() {
    return this.clockForm.get('stepday');
  }

  //-----------on off value changes----------------------------------------
  onValueChange(value) {
    this.valueChange = value;
    console.log("valuchanges", this.valueChange)
  }

  //-----------on off status-----------------------------------------------
  getid(id) {
    this.idget = id
    this.clockForm.value.status = this.valueChange
    if (this.idget === id) {
      this.authService.updateStatus(this.idget, this.clockForm.value)
        .subscribe(res => {
        })
    }
  }



  //-----------index get for collapsed-------------------------------
  clickselect(i) {
    this.indexvalue = i;
    this.showMyContainer = !this.showMyContainer
  }

  //-------------day selection ---------------------------------------
  getSelection(item) {
    return this.selection.findIndex(s => s.id === item.id) !== -1;
  }

  //-----------Change Handler---------------------------------------
  changeHandler(item: any, event: KeyboardEvent) {
    const id = item.id;

    const index = this.selection.findIndex(u => u.id === id);
    if (index === -1) {
      // ADD TO SELECTION
      // this.selection.push(item);
      this.selection = [...this.selection, item];
    } else {
      // REMOVE FROM SELECTION
      this.selection = this.selection.filter(user => user.id !== item.id)
      // this.selection.splice(index, 1)
    }
  }




  //-------------- update clock-----------------------------------------
  onSubmit() {
    this.submitted = true
    this.clockForm.value.day = this.selection
    this.clockForm.value.status = this.valueChange
    console.log(this.clockForm.value)
    this.authService.updateshedule(this.idget, this.clockForm.value)
      .subscribe(res => {
        this.router.navigate(['/'])
      })

  }

  //-----------Submit form for new time add------------------------------------

  onSubmits() {
    this.submitted = true;
    this.clockForm.value.day = this.selection
    this.clockForm.value.email = this.emailget
    this.status = true
    this.clockForm.value.status = this.status

    if (this.clockForm.valid) {
      this.authService.createemailshedule(this.clockForm.value).subscribe(
        (data: any) => {
          Swal.fire("SuccessFully Create Email Shedule User")
          this.router.navigate(['/'])
          this.ngOnInit();
        },
        function (err: HttpErrorResponse) {
          if (err.error.msg) {
            Swal.fire('Oops...', err.error.msg);
          } else {
            Swal.fire('Oops...', 'Something went wrong!', 'error');
            // this.snackBar.open('Something Went Wrong!');
          }
        }
      );
    } else {
      Swal.fire("Please check Your fields")
    }

  }

  deleteshed(id) {
    this.idget = id
    this.authService.deleteshedule(this.idget).subscribe((data) => {
    })
  }

  //-------------delete shedule-----------------------------------------
  removeshedule(shedule, index) {
    Swal.fire({
      title: 'Are you sure want to Delete Employee?',

      text: 'Delete The Employee !',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Yes, Delete it!',

      cancelButtonText: 'No, keep it'

    }).then((result) => {
      if (result.value) {
        this.authService.deleteshedule(shedule._id).subscribe((data) => {
          this.getShedule.splice(index, 1);
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(

          'Cancelled',

          'welcomeback :)',

          'error'

        )

      }

    })
  }

}
