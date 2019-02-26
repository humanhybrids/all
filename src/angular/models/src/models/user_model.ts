import { GithubService, GithubUser } from "../services/github.service";
import { Injectable, Inject } from "@angular/core";
import { ModelState } from "../model_lib/model_state";
import { first, map, catchError } from "rxjs/operators";
import { ModelToken } from "../model_lib/model_state_provider";
import { Action } from "../model_lib/action";
import { of } from "rxjs";

interface UserModelState {
  user: GithubUser;
  loading: boolean;
  errorMessage?: string;
}

const initialState: UserModelState = {
  user: { name: "", company: "", login: "", avatar_url: "" },
  loading: false
};

export const USER_MODEL_STATE = new ModelToken<UserModelState>(
  "user_model",
  initialState
);

/**
 * The primary data model for fetching and querying data for a single
 * Github user.
 */
@Injectable({ providedIn: "root" })
export class UserModel {
  constructor(
    @Inject(USER_MODEL_STATE)
    private readonly state: ModelState<UserModelState>,
    private readonly service: GithubService
  ) {}

  @Action()
  loadUser(username: string) {
    this.state.push(state => ({ ...state, loading: true }), "load-user");
    return this.service.getUser(username).pipe(
      map((user: GithubUser) => {
        this.state.push(() => ({ user, loading: false }), "load-user-success");
      }),
      catchError(error => {
        this.state.push(
          state => ({
            ...state,
            loading: false,
            errorMessage: error.message
          }),
          "load-user-error"
        );
        return of(false);
      })
    );
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
