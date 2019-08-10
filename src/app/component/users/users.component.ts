import { Inject, Component, OnInit } from '@angular/core';
import { IUserService } from '../../iservices/iuser';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userData: any;
  constructor(
    @Inject('IUserService') private userService: IUserService
  ) { }

  ngOnInit() {
    this.getUsers();
  }


  /*
   * @method getUsers()
   * @desc used to get All Users.
 */
  getUsers(): void {


    // if (self.indexedDB) {
    //   console.log('IndexedDB is supported');
    //   const request = self.indexedDB.open('EXAMPLE_DB', 1);
    //   let db;
    //   request.onsuccess = function (event) {
    //     console.log('[onsuccess]', request.result);
    //     console.log(request.result);
    //   //  db = event.target.result; // === request.result
    //     db = event.target; // === request.result
    //     console.log(event);
    //   };
    //   request.onerror = function (event) {
    //     console.log('[onerror]', request.error);
    //   };
    //  // db.createObjectStore(storeName, options);

    //   request.onupgradeneeded = function(event) {
    //    //  db = event.srcElement.;
    //     const store = db.createObjectStore('products', {keyPath: 'id'});
    // };

    // }
    this.userService.getUser().subscribe(
      resp => {
        this.userData = resp;
      });
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
