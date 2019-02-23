
import { GithubService, GithubUser } from '../services/github.service';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

interface State {
    user: GithubUser;
    loading: boolean;
}

const initialState: State = {
    user: { name: '', company: '', login: '', avatar_url: '' },
    loading: false,
};

@Injectable({ providedIn: 'root' })
export class UserModel {
    private readonly state = new BehaviorSubject<State>(initialState);

    constructor(private readonly service: GithubService) { }

    loadUser(username: string) {
        const state = this.state.getValue();
        this.state.next({ ...state, loading: true });
        this.service.getUser(username).subscribe(user => {
            this.state.next({ user, loading: false });
        });
    }

    getUser() {
        return this.state.pipe(map(state => state.user));
    }

    getLogin() {
        return this.state.pipe(map(state => state.user.login));
    }

    getName() {
        return this.state.pipe(map(state => state.user.name));
    }

    getAvatarUrl() {
        return this.state.pipe(map(state => state.user.avatar_url));
    }

    getLoading() {
        return this.state.pipe(map(state => state.loading));
    }
}
