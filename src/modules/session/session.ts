import { Component } from "@angular/core";
import SessionService from "./services/session";
import SessionLayout from "./layouts/session";

@Component({
  imports: [SessionLayout],
  selector: "fm-session",
  templateUrl: "./templates/session.html",
  standalone: true,
})
export default class SessionView {
  constructor(public session: SessionService) { }
}
