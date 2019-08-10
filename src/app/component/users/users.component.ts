import { Inject, Component, OnInit } from '@angular/core';
import { IUserService } from '../../iservices/iuser';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userData: any;
  userData1;
  username: string;
  constructor(
    @Inject('IUserService') private userService: IUserService
  ) { }

  ngOnInit() {
    this.getAllData();
    this.getUsers();
  }


  /*
* @method getAllData()
* @desc used to get indexDb data Users.
*/
  getAllData(): any {
    const request = self.indexedDB.open('EXAMPLE_DB', 1);
    request.onsuccess = function (event) {
      // get database from event
      const db = event.target['result'];
      // create transaction from database
      const transaction = db.transaction('products', 'readwrite');
      // // get store from transaction
      const productsStore = transaction.objectStore('products');
      // put products data in productsStore
      // get all product
      productsStore.getAll().onsuccess = function (e1) {
        this.userData1 = e1.target.result;
      };
    };
  }


  /*
   * @method getUsers()
   * @desc used to get All Users.
 */
  getUsers(): void {
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
