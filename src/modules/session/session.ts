import { Component } from "@angular/core";
import SessionLayout from "./layouts/session";
import SessionInputComponent from './components/SessionInput';
import SessionButtonComponent from './components/SessionButton';
import LoginRequestDTO from './types/LoginRequestDTO';
import RequestService from '@core/services/request';
import LoaderService from '@core/services/loader';
import ToasterService from '@core/services/toaster';
import {UserWithToken} from '@core/types/User';
import UserService from '@core/services/user';
import RegisterRequestDTO from './types/RegisterRequestDTO';
import {Router} from '@angular/router';
import {routes} from '@core/configs/app.routes';

@Component({
  imports: [SessionLayout, SessionInputComponent, SessionButtonComponent],
  selector: "fm-session",
  templateUrl: "./templates/session.html",
  styleUrls: ["./styles/login.scss", "./styles/register.scss"],
  standalone: true,
})
export default class SessionView {
  private _request: RequestService;
  private _loader: LoaderService;
  private _toaster: ToasterService;
  private _loginData: LoginRequestDTO = {} as LoginRequestDTO;
  private _register: RegisterRequestDTO = {} as RegisterRequestDTO;
  constructor(
    request: RequestService, loader: LoaderService, toaster: ToasterService,
    private readonly userService: UserService, private readonly router: Router
  ) {
    this._request = request;
    this._loader = loader;
    this._toaster = toaster;
  }
  handleLogin(value: string, field: string){
    if(field === 'password') this._loginData.password = value;
    else this._loginData.email = value;
  }
  handleRegister(value: string, field: string){
    if(field === 'name') this._register.firstName = value;
    else if(field === 'lastName') this._register.lastName = value;
    else if(field === 'email') this._register.email = value;
    else if(field === 'password') this._register.password = value;
    else if(field === 'phone') this._register.phoneNumber = value;
    else this._register.username = value;
  }
  async handleSubmit(){
    this._loader.subscribeToLoader();
    if(!this._loginData.email){
      this._toaster.add({
        code: "LOGINEERROR",
        title: "Email is missing",
        message: "You can't log in without provide an email",
        type: "error"
      })
    }
    else if(!this._loginData.password){
      this._toaster.add({
        code: "LOGINPERROR",
        title: "Password is missing",
        message: "You can't log in without provide a password",
        type: "error",
      })
      return ;
    }
    const response = await this._request.withoutAuthPost<UserWithToken>("/public/login", this._loginData);
    if(response.error) {
      this._loader.removeLoaderSubscription();
      this._toaster.add({type: "error", title: response.message, message: response.description, code: "LOGINBERROR"})
      return;
    }
    const data = response.data as UserWithToken;
    await this.userService.saveUser(data);
    this._loader.removeLoaderSubscription();
  }
  async handleRegisterSubmit(){
    this._loader.subscribeToLoader();
    if(!this._register.firstName || !this._register.lastName || !this._register.email || !this._register.phoneNumber || !this._register.password){
      this._toaster.add({
        code: "REGISFERROR",
        title: "Missing Fields",
        message: "You can't submit without fill all fields",
        type: "error"
      })
    }
    const response = await this._request.withoutAuthPost<null>("/public/create-user", this._register);
    if(response.error) {
      this._toaster.add({type: "error", title: response.message, message: response.description, code: "REGISBERROR"})
      this._loader.removeLoaderSubscription();
      return;
    }
    this._loader.removeLoaderSubscription();
    this._toaster.add({type: "success", title: response.message, message: response.description, code: "REGISBSUCCESS"})
    setTimeout(()=> {
      window.location.reload();
    }, 3000)
  }
  moveFloat(){
    const element = document.getElementById("float");
    if(!element) return;
    element.classList.toggle("right")
  }
}
