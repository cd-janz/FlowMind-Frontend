import { Component } from "@angular/core";
import SessionLayout from "./layouts/session";
import SessionInputComponent from './components/SessionInput';
import SessionButtonComponent from './components/SessionButton';
import LoginRequestDTO from './types/LoginRequestDTO';
import RequestService from '@core/services/request';
import CheckboxComponent from '@core/components/Checkbox';
import LoaderService from '@core/services/loader';
import ToasterService from '@core/services/toaster';

@Component({
  imports: [SessionLayout, SessionInputComponent, SessionButtonComponent, CheckboxComponent],
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
  private _remember: boolean = false;
  constructor(request: RequestService, loader: LoaderService, toaster: ToasterService) {
    this._request = request;
    this._loader = loader;
    this._toaster = toaster;
  }
  handleEmail(value: string){
    this._loginData.email = value;
  }
  handlePassword(value: string){
    this._loginData.password = value;
  }
  handleRememberMe() {
    this._remember = !this._remember;
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
    const response = await this._request.withoutAuthPost("/public/login", this._loginData);
    if(response.status >= 400){
      console.error(response.statusText);
    }
    this._loader.removeLoaderSubscription();
  }
  moveFloat(){
    const element = document.getElementById("float");
    if(!element) return;
    element.classList.toggle("right")
  }
}
