import { Component } from '@angular/core';
import { UserModel } from '../models/user-model';

@Component({
    selector: 'app-root',
    template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center">
      <p>{{username | async}}</p>
      <img [src]="(user | async).avatar_url">
      <p>Name: {{(user | async).name}}</p>
    </div>
  `,
    styles: [],
})
export class AppComponent {
    title = 'models';
    user = this.userModel.getUser();
    username = this.userModel.getUsername();

    constructor(private readonly userModel: UserModel) {
        userModel.loadUser('corycook');
    }
}
