import { Component } from '@angular/core';
import { UserModel } from '../models/user-model';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'statemodels';

    constructor(private readonly model: UserModel) {
        this.model.loadUser("corycook");
    }

    readonly login = this.model.getLogin();
    readonly name = this.model.getName();
    readonly loading = this.model.getLoading();
    readonly avatarUrl = this.model.getAvatarUrl();
}
