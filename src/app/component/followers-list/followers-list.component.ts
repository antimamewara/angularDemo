import { Inject, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IUserService } from '../../iservices/iuser';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-followers-list',
  templateUrl: './followers-list.component.html',
  styleUrls: ['./followers-list.component.css'],
  // changeDetection: ChangeDetectionStrategy.Default
})
export class FollowersListComponent implements OnInit {
  followerList: any;
  RepositoriesList: any;
  userName: string;
  type: string;
  constructor(
    @Inject('IUserService') private userService: IUserService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.userName = this.data.userName;
    this.type = this.data.type;
    this.getLocalRepositoriesData();
    this.getFollowers();
    this.getRepositories();
  }

  /*
* @method getLocalFollowers()
* @desc used to get Followers from Local indexdb.
*/
  getLocalFollowers(): any {
    const data1 = [];
    const request = self.indexedDB.open('EXAMPLE_DB', 2);
    return Observable.create(obs => {
      request.onsuccess = function (event) {
        const db = event.target['result'];
        // // get store from transaction
        if (db.objectStoreNames['0'] === 'followers') {
          const transaction = db.transaction('followers', 'readwrite');
          const productsStore = transaction.objectStore('followers');
          const data = productsStore.getAll();
          data.onsuccess = function () {
            obs.next(data.result);
          };
        }
      };
    });
  }

  getLocalFollowersData(): any {
    this.getLocalFollowers().subscribe((res) => {
      this.followerList = res;
    });
  }


  /*
   * @method getFollowers()
   * @desc used to get All Followers.
 */
  getFollowers(): void {
    this.getLocalFollowersData();
    this.userService.getFollowers(this.userName).subscribe(
      resp => {
        this.followerList = resp;
      });
  }


  /*
* @method getLocalRepositories()
* @desc used to get Repositories from Local indexdb.
*/
  getLocalRepositories(): any {
    const data1 = [];
    const request = self.indexedDB.open('EXAMPLE_DB', 2);
    return Observable.create(obs => {
      request.onsuccess = function (event) {
        const db = event.target['result'];
        // // get store from transaction
        if (db.objectStoreNames['1'] === 'repositories') {
          const transaction = db.transaction('repositories', 'readwrite');
          const productsStore = transaction.objectStore('repositories');
          const data = productsStore.getAll();
          data.onsuccess = function () {
            obs.next(data.result);
          };
        }
      };
    });
  }

  getLocalRepositoriesData(): any {
    this.getLocalRepositories().subscribe((res) => {
      this.RepositoriesList = res;
    });
  }

  /*
  * @method getRepositories()
  * @desc used to get All Repositories.
*/
  getRepositories(): void {

    this.userService.getRepositories(this.userName).subscribe(
      resp => {

        this.RepositoriesList = resp;
      });
  }
}
