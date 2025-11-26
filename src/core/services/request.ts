import axios, {AxiosInstance} from "axios";
import {environment} from '@core/environments/environment';
import {Injectable} from '@angular/core';
import GeneralResponse from '@core/types/GeneralResponse';

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
    const res = await this.agent.post(route, data);
    if(res.status >= 400 && res.status < 500){
      return {
        error: true,
        message: res.data.message,
        description: res.data.description,
        data: res.data.data
      } as GeneralResponse<any>;
    }
    return {
      error: false,
      message: res.data.message,
      description: res.data.description,
      data: res.data.data
    } as GeneralResponse<T>;
  }
}
