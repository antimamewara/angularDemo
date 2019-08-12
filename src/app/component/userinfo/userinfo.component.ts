import { Inject, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUserService } from '../../iservices/iuser';
import { FollowersListComponent } from '../../component/followers-list/followers-list.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
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
* @method getAllData()
* @desc used to get indexDb data Users.
*/
  getAllData(): any {
    const data1 = [];
    const request = self.indexedDB.open('EXAMPLE_DB', 2);
    return Observable.create(obs => {
      request.onsuccess = function (event) {
        const db = event.target['result'];
        // // get store from transaction
        if (db.objectStoreNames['3'] === 'usersbyid') {
          const transaction = db.transaction('usersbyid', 'readonly');
          const productsStore = transaction.objectStore('usersbyid');
          const data = productsStore.getAll();
          data.onsuccess = function () {
            obs.next(data.result);
          };
        }
      };
    });
  }


  /*
   * @method getLocalData()
   * @desc used to get local data Users.
  */
  getLocalData(): void {
    this.getAllData().subscribe((res) => {
      this.userData = res;

    });
  }

  /*
  * @method getUsersInfo()
  * @desc used to get  Users info by its id.
*/
  getUsersInfo(name): void {
    this.getLocalData();
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
