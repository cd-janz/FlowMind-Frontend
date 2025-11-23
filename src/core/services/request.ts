import axios, {AxiosInstance} from "axios";
import {environment} from '@core/environments/environment';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export default class RequestService{
  private agent: AxiosInstance;
  constructor() {
    this.agent = axios.create({
      baseURL: environment.apiBaseURL,
      timeout: 10000,
      timeoutErrorMessage: "Request has taken more than expected",
      adapter: "fetch",
    })
  }
  async withoutAuthPost<T>(route: string, data: any){
    return this.agent.post(route, data);
  }
}
