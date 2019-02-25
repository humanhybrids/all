
import { GithubService, GithubUser } from '../services/github.service';
import { Injectable } from '@angular/core';
import { ModelState } from '../model_lib/model_state';
import { StateFactory } from '../model_lib/state_factory';
import { first } from 'rxjs/operators';

interface UserModelState {
    user: GithubUser;
    loading: boolean;
    errorMessage?: string;
}

const initialState: UserModelState = {
    user: { name: '', company: '', login: '', avatar_url: '' },
    loading: false,
};

/**
 * The primary data model for fetching and querying data for a single
 * Github user.
 */
@Injectable({ providedIn: 'root' })
export class UserModel {
    private readonly state: ModelState<UserModelState>;

    constructor(stateFactory: StateFactory, private readonly service: GithubService) {
        // It would be better if the ModelState could be injected directly and
        // we didn't have to create it here.
        this.state = stateFactory.createModelState(this, initialState);
    }

    loadUser(username: string) {
        const state = this.state.getState();
        this.state.push({ ...state, loading: true }, 'load-user'); // 'load-user' is a descriptive tag used for debugging
        this.service.getUser(username).pipe(first()).subscribe((user?: GithubUser) => {
            this.state.push({ user, loading: false }, 'load-user-success');
        }, error => {
            this.state.push({ ...state, loading: false, errorMessage: error.message }, 'load-user-error');
        });
    }

    getUsername() {
        return this.state.select(state => state.user.login);
    }

    getUser() {
        return this.state.select(state => state.user);
    }

    getLoading() {
        return this.state.select(state => state.loading);
    }
}
