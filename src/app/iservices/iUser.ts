
import { BehaviorSubject } from 'rxjs';
export interface IUserService {
    getUserById(id): any;
    getSearchesUsers(data): any;
    getUser(): any;
    getFollowers(name): any;
    getRepositories(name): any;
}
