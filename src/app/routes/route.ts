import { Routes } from '@angular/router';
import { UsersComponent } from '../component/users/users.component';
import { UserinfoComponent } from '../component/userinfo/userinfo.component';
import { FollowersListComponent } from '../component/followers-list/followers-list.component';
export const routes: Routes = [
    {
        path: '',
        component: UsersComponent
    },
    {
        path: 'users',
        component: UsersComponent
    },
    {
        path: 'users/:id',
        component: UserinfoComponent
    },
    {
        path: 'followers',
        component: FollowersListComponent
    }
];
