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
          this.addToIndexedDb(resp, 'users');
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
          this.addToIndexedDb(resp, 'usersbyid');
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
          this.addToIndexedDb(resp, 'followers');
          return resp;
        }
      }));
  }

  /**
 * @method getRepositories()
 * @desc used to get all Repositories details.
 * @param  :username.
 */

  getRepositories(username): any {
    return this.apiService.getApi('users/' + username + '/repos').pipe(
      map((resp) => {
        if (resp) {
          this.addToIndexedDb(resp, 'repositories');
          return resp;
        }
      }));
  }
  /**
 * @method addToIndexedDb()
 * @desc used to add data to indexDb.
 * @param  :data.
 */
  private addToIndexedDb(data, storeName) {
    let db;
    let store;
    let transaction;
    let productsStore;
    if (self.indexedDB) {
      const request = self.indexedDB.open('EXAMPLE_DB', 2);
      request.onsuccess = function (event) {
        // get database from event
        db = event.target['result'];
        if (storeName === 'repositories') {
          transaction = db.transaction('repositories', 'readwrite');
          // // get store from transaction
          productsStore = transaction.objectStore('repositories');
        } else if (storeName === 'followers') {
          transaction = db.transaction('followers', 'readwrite');
          // // get store from transaction
          productsStore = transaction.objectStore('followers');
        } else if (storeName === 'usersbyid') {
          transaction = db.transaction('usersbyid', 'readwrite');
          // // get store from transaction
          productsStore = transaction.objectStore('usersbyid');
        } else {
          transaction = db.transaction('users', 'readwrite');
          // // get store from transaction
          productsStore = transaction.objectStore('users');
        }

        // put products data in productsStore
        data.forEach(function (product) {
          const db_op_req = productsStore.add(product);
          db_op_req.onsuccess = function (e) {
          };
        });
      };
      request.onupgradeneeded = function (e) {
        db = e.target['result'];
        store = db.createObjectStore('users', { keyPath: 'id' });
        store.createIndex('products_id_unqiue', 'id', { unique: true });
        store = db.createObjectStore('repositories', { keyPath: 'id' });
        store.createIndex('products_id_unqiue1', 'id', { unique: true });
        store = db.createObjectStore('followers', { keyPath: 'id' });
        store.createIndex('products_id_unqiue2', 'id', { unique: true });
        store = db.createObjectStore('usersbyid', { keyPath: 'id' });
        store.createIndex('products_id_unqiue3', 'id', { unique: true });
      };
    }
  }
}
