import { Component } from "@angular/core";
import { GithubService } from "../services/github.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-root",
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center">
      <p>
        Github Username:
        <input (change)="loadUser($event.target.value)" />
      </p>
      <div *ngIf="(user | async) as user">
        <p>{{ user.login }}</p>
        <img [src]="user.avatar_url" />
        <p>Name: {{ user.name }}</p>
      </div>
      <p style="color: red" *ngIf="(errorMessage | async) as error">
        {{ error }}
      </p>
    </div>
  `,
  styles: []
})
export class AppComponent {
  user = this.github.user;
  errorMessage = this.github.errorMessage;

  constructor(private readonly github: GithubService) {
    github.loadUser("google");
  }

  loadUser(username: string) {
    this.github.loadUser(username);
  }
}
