import { Inject, Injectable } from '@angular/core';
import { IUserService } from '../iservices/iuser';
import { map } from 'rxjs/operators';
import { IApiService } from './../iservices/iApi';
import { Observable } from 'rxjs';
import { Subscriber } from 'rxjs';
// import 'rxjs/add/observable/of';
import { of } from 'rxjs';
import { test } from '@angular-devkit/core/src/virtual-fs/host';
@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {
  db: any;
  allItems: any;
  //usersListFromDb: any;
  usersListFromDb: Observable<any>;
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

    const request = self.indexedDB.open('EXAMPLE_DB', 1);
    request.onsuccess = function (event) {
      // get database from event
      const db = event.target['result'];
      // create transaction from database
      const transaction = db.transaction('products', 'readwrite');
      // // get store from transaction
      const productsStore = transaction.objectStore('products');
      // get all product
      productsStore.getAll().onsuccess = function (e1) {
        console.log(this.usersListFromDb);
         this.usersListFromDb = (e1.target.result);
        // console.log(this.usersListFromDb);
        // this.usersListFromDb.pipe(map((res) => {
        //   return res;
        // }));
        console.log(Observable.create(this.usersListFromDb));
        // this.usersListFromDb = of(e1.target.result).pipe(map((res) => {
        //   return res;
        // }
        // ));
        // console.log(of(e1.target.result).pipe(map(o => (o))));
       
        // return new Observable((subscriber: Subscriber<test>) =>
        //   subscriber.next(e1.target.result)).map(o => JSON.stringify(o))
        // return of(e1.target.result).pipe(map(o => (o)));

          return Observable.create(this.usersListFromDb);
      };
    };

    // console.log(this.apiService.getApi('users'));

    // console.log(this.apiService.getApi('users').pipe(
    //   map((resp) => {
    //     if (resp) {
    //       console.log(resp);
    //       this.addToIndexedDb(resp);
    //       return resp;
    //     }
    //   })));
    return this.apiService.getApi('users').pipe(
      map((resp) => {
        if (resp) {
          console.log(resp);
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
          // this.addToIndexedDb(resp);
          return resp;
        }
        // else {
        //   resp = this.getAllData();
        //   return resp;
        // }
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

        store.getAll.onsuccess = function (event) {
          console.log('[Transaction - GET] product with id 1', event.target.result);
        };

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

  getAllData() {
    const request = self.indexedDB.open('EXAMPLE_DB', 1);
    // console.log(request);
    request.onsuccess = function (event) {

      // get database from event
      const db = event.target['result'];
      // create transaction from database
      const transaction = db.transaction('products', 'readwrite');
      // // get store from transaction
      const productsStore = transaction.objectStore('products');
      // console.log(productsStore);
      // console.log(productsStore.getAll());
      // console.log(productsStore.getAll()['result']);
      // put products data in productsStore
      // get all product
      productsStore.getAll().onsuccess = function (e1) {
        console.log('[Transaction - GET] product with id 1', (e1.target.result));
        this.usersListFromDb = e1.target.result;
        return (this.usersListFromDb);
        // console.log('[Transaction - GET] product with id 1', e1.target.result);
      };

    };
  }

}
