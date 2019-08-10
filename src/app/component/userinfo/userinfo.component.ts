import { Inject, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUserService } from '../../iservices/iuser';
import { FollowersListComponent } from '../../component/followers-list/followers-list.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  userName: string;
  userData: any;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    @Inject('IUserService') private userService: IUserService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userName = params['id'];
      }
    });
    this.getUsersInfo(this.userName);
  }

  /*
  * @method getUsersInfo()
  * @desc used to get  Users info by its id.
*/
  getUsersInfo(name): void {
    this.userService.getUserById(name).subscribe(
      resp => {
        this.userData = resp;
      });
  }

  /*
    * @method openDialog()
    * @desc used to open Followers dialog.
  */
  openDialog(name) {
    this.dialog.open(FollowersListComponent, {
      data: {
        userName: name,
        type: 'followers'
      }
    });
  }

  /*
  * @method viewRepositories()
  * @desc used to open repositories dialog.
*/
  viewRepositories(name) {
    this.dialog.open(FollowersListComponent, {
      data: {
        userName: name,
        type: 'repositories'
      }
    });
  }

}
