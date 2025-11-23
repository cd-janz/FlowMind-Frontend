import { Component } from '@angular/core';
import LoaderService from '@core/services/loader';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'fm-loader',
  standalone: true,
  template: `
    @if (loader.active$ | async; as $isLoading){
      @if ($isLoading) {
        <div class="container">
          <div class="loader">
            <div class="text">
              <div class="ball"></div>
            </div>
            <span><i></i></span>
          </div>
        </div>
      }
    }
  `,
  styles: [
    `
      .container {
        width: 100dvw;
        height: 100dvh;
        position: fixed;
        z-index: 1000;
        background-color: rgba(var(--bg), 0.7);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .loader {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .loader span {
        position: relative;
        width: 250px;
        height: 250px;
        background-color: #eaeef0;
        border: 6px solid #eaeef0;
        box-shadow: -8px -8px 15px rgba(255, 255, 255, 1),
        8px 8px 25px rgba(0, 0, 0, 0.15);
        border-radius: 50%;
        overflow: hidden;
      }

      .loader span:before {
        content: "LOADING";
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        color: #bbb9b9;
        letter-spacing: 3px;
        font-size: 23px;
        position: absolute;
        inset: 40px;
        background-color: #eaeef0;
        box-shadow: -8px -8px 25px rgba(255, 255, 255, 1),
        8px 8px 25px rgba(0, 0, 0, 0.15),
        inset 3px 3px 10px rgba(0, 0, 0, 0.1),
        inset -1px -1px 15px rgba(255, 255, 255, 1);
        border: 2px solid #eaeef0;
        border-radius: 50%;
        z-index: 1;
      }

      .loader span i {
        position: absolute;
        inset: 0;
        background: linear-gradient(#42abff, #ff4f8b, #ffeb4b);
        border-radius: 50%;
        filter: blur(5px);
        animation: animate 1s linear infinite;
      }

      @keyframes animate {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }

      .text {
        position: absolute;
        width: 350px;
        height: 350px;
        border-radius: 50%;
        animation: animateText 6s linear infinite;
      }

      @keyframes animateText {
        0% {
          transform: rotate(360deg);
        }

        100% {
          transform: rotate(0deg);
        }
      }

      .ball {
        width: 50px;
        height: 50px;
        background: linear-gradient(#42abff, #ff4f8b, #ffeb4b);
        border: 6px solid #dfdfdf;
        border-radius: 50%;
        box-shadow: -8px -8px 15px rgba(255, 255, 255, 1),
        8px 8px 25px rgba(0, 0, 0, 0.15);
        animation: rotate 3s infinite linear;
      }
    `,
  ],
  imports: [
    AsyncPipe
  ]
})
export default class LoaderComponent {
  loader: LoaderService;
  constructor(loader: LoaderService) {
    this.loader = loader;
  }
}
