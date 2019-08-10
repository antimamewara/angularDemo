import { Inject, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IUserService } from '../../iservices/iuser';
import { MAT_DIALOG_DATA } from '@angular/material';
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
    console.log(this.data);
    this.userName = this.data.userName;
    this.type = this.data.type;
    this.getFollowers();
    this.getRepositories();
  }


  /*
   * @method getFollowers()
   * @desc used to get All Followers.
 */
  getFollowers(): void {
    this.userService.getFollowers(this.userName).subscribe(
      resp => {
        this.followerList = resp;
        //  console.log(resp);
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
        console.log(resp);
      });
  }
}
