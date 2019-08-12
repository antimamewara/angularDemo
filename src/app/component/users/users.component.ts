import { Inject, Component, OnInit } from '@angular/core';
import { IUserService } from '../../iservices/iuser';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userData: any;
  username: string;
  userData1;
  constructor(
    @Inject('IUserService') private userService: IUserService
  ) { }

  ngOnInit() {
    this.getUsers();
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
        if (db.objectStoreNames['2'] === 'users') {
          const transaction = db.transaction('users', 'readonly');
          const productsStore = transaction.objectStore('users');
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
   * @method getUsers()
   * @desc used to get All Users.
 */
  getUsers(): void {
    this.userService.getUser().subscribe(
      resp => {
        if (resp) {
          this.userData = resp;
        }
      }, error => { this.getLocalData(); });
  }

  /*
 * @method getSearchesUsers()
 * @desc used to get filter Users.
*/
  getSearchesUsers(name): void {
    if (name) {
      this.userService.getSearchesUsers(name).subscribe(
        resp => {
          this.userData = resp.items;
        });
    } else {
      this.getUsers();
    }
  }
}
