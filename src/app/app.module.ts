import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './component/users/users.component';
import { routes } from './routes/route';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { ApiService } from './services/api.service';
import { UserinfoComponent } from './component/userinfo/userinfo.component';
import { MatGridListModule } from '@angular/material';
import { FollowersListComponent } from './component/followers-list/followers-list.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
// import { DexieModule, DexieConfig } from 'ngx-dexie';
// const config: DexieConfig = {
//   databaseName: 'AppDatabase', // your database name here
//   schema: {
//     data: '++id,name'
//   } // any schema of your choice
// };

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserinfoComponent,
    FollowersListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    ScrollingModule,
    Ng2SearchPipeModule,
    FormsModule,
    RouterModule.forRoot(routes),
    // DexieModule.forRoot(config)
  ],
  entryComponents: [
    FollowersListComponent
  ],
  providers: [
    UserService,
    { provide: 'IUserService', useClass: UserService },
    ApiService,
    { provide: 'IApiService', useClass: ApiService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
