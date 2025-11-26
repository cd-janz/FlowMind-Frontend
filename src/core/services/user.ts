import {Injectable, signal} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import BasicUser, {UserWithToken} from '@core/types/User';

@Injectable({providedIn: 'root'})
export default class UserService{
  private readonly token = new BehaviorSubject<string | null>(null);
  private readonly user = new BehaviorSubject<BasicUser | null>(null);
  constructor(private router: Router) {
    const userLoaded = localStorage.getItem('user');
    if(!userLoaded){
      this.router.navigate(['/session']).catch(()=> console.error('Error handling redirection'));
      return;
    }
    const user: UserWithToken = JSON.parse(userLoaded);
    this.token.next(user.token);
    this.user.next(user.user);
  }
  private async saveOnLocalStorage(user: UserWithToken): Promise<void> {
    localStorage.setItem('user', JSON.stringify(user));
  }
  public async saveUser(data: UserWithToken): Promise<void>{
    if(!data.token || !data.user) return;
    this.token.next(data.token);
    this.user.next(data.user);
    await this.saveOnLocalStorage(data);
    this.router.navigate(['/app']).catch(()=> console.error('Error handling redirection'));
    return;
  }
}
