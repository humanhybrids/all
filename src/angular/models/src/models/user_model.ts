
import { GithubService, GithubUser } from '../services/github.service';
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { ModelState } from '../model_lib/model_state';
import { StateFactory } from '../model_lib/state_factory';
import { first } from 'rxjs/operators';
import { ModelToken } from '../model_lib/model_state_provider';

interface UserModelState {
    user: GithubUser;
    loading: boolean;
    errorMessage?: string;
}

const initialState: UserModelState = {
    user: { name: '', company: '', login: '', avatar_url: '' },
    loading: false,
};

export const USER_MODEL_STATE =
    new ModelToken<UserModelState>('user_model', initialState);

/**
 * The primary data model for fetching and querying data for a single
 * Github user.
 */
@Injectable({ providedIn: 'root' })
export class UserModel {
    constructor(
        @Inject(USER_MODEL_STATE) private readonly state: ModelState<UserModelState>,
        private readonly service: GithubService) { }

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
