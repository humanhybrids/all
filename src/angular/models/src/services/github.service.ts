import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { GlobalState } from "../state/global_state";
import { select } from "../state/select";

export interface GithubUser {
  name: string;
  company: string;
  login: string;
  avatar_url: string;
}

interface GithubState {
  user: GithubUser;
  loading: boolean;
  errorMessage?: string;
}

/**
 * Primary service for interfacing with Github API. */
@Injectable({ providedIn: "root" })
export class GithubService {
  private readonly github = this.state.getScope("github");
  readonly user = this.github.state.pipe(select(state => state.user));
  readonly loading = this.github.state.pipe(select(state => state.loading));
  readonly errorMessage = this.github.state.pipe(
    select(state => state.errorMessage)
  );

  constructor(
    private readonly http: HttpClient,
    private readonly state: GlobalState<{ github: GithubState }>
  ) {
    this.github.push(
      () => ({
        loading: false,
        user: { name: "", company: "", login: "", avatar_url: "" }
      }),
      "init"
    );
  }

  private getUser(username: string): Observable<GithubUser> {
    return this.http.get<GithubUser>(
      `https://api.github.com/users/${username}`
    );
  }

  loadUser(username: string) {
    this.github.push(state => ({ ...state, loading: true }), "load-user");
    this.getUser(username).subscribe(
      user =>
        this.github.push(
          () => ({
            user,
            loading: false
          }),
          "load-user-success"
        ),
      (error: HttpErrorResponse) =>
        this.github.push(
          state => ({
            ...state,
            loading: false,
            errorMessage: error.message
          }),
          "load-user-error"
        )
    );
  }
}
