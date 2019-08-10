import { Inject, Injectable } from '@angular/core';
import { IUserService } from '../iservices/iuser';
import { map } from 'rxjs/operators';
import { IApiService } from './../iservices/iApi';
import { test } from '@angular-devkit/core/src/virtual-fs/host';
@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {
  db: any;
  allItems: any;
  constructor(
    @Inject('IApiService') private apiService: IApiService,
    // private dexieService: DexieService
  ) {
  }

  /**
  * @method getUser()
  * @desc used to get all user details.
  * @param  :null.
  */

  getUser(): any {
    return this.apiService.getApi('users').pipe(
      map((resp) => {
        if (resp) {
          this.addToIndexedDb(resp);
          return resp;
        }
      }));
  }

  /**
 * @method getSearchesUsers()
 * @desc used to get filter user details.
 * @param  :name.
 */

  getSearchesUsers(name): any {
    return this.apiService.getApi('search/users?q=' + name).pipe(
      map((resp) => {
        if (resp) {
          return resp;
        }
      }));
  }

  /**
 * @method getUserById()
 * @desc used to get  user details by its id.
 * @param  :User Id.
 */

  getUserById(name): any {
    return this.apiService.getApi('users/' + name).pipe(
      map((resp) => {
        if (resp) {
          return resp;
        }
      }));
  }

  /**
 * @method getFollowers()
 * @desc used to get all Followers details.
 * @param  :null.
 */

  getFollowers(username): any {
    return this.apiService.getApi('users/' + username + '/followers').pipe(
      map((resp) => {
        if (resp) {
          return resp;
        }
      }));
  }

  /**
 * @method getRepositories()
 * @desc used to get all Repositories details.
 * @param  :null.
 */

  getRepositories(username): any {
    return this.apiService.getApi('users/' + username + '/repos').pipe(
      map((resp) => {
        if (resp) {
          return resp;
        }
      }));
  }

  private addToIndexedDb(data) {
    let db;
    let store;
    let transaction;
    if (self.indexedDB) {
      const request = self.indexedDB.open('EXAMPLE_DB', 1);
      request.onupgradeneeded = function (e) {
        // console.log(e);
        db = e.target['result'];
        // console.log(db);
        store = db.createObjectStore('products', { keyPath: 'id' });
        store.createIndex('products_id_unqiue', 'id', { unique: true });
        transaction = db.transaction('products', 'readwrite');
      };
      request.onsuccess = function (event) {
        // get database from event
        db = event.target['result'];
        // create transaction from database
        transaction = db.transaction('products', 'readwrite');
        // // get store from transaction
        const productsStore = transaction.objectStore('products');
        // put products data in productsStore
        data.forEach(function (product) {
          const db_op_req = productsStore.add(product);
          db_op_req.onsuccess = function (e) {
          };
        });
      };
    }
  }


}
