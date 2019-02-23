import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GithubUser {
    name: string;
    company: string;
    login: string;
    avatar_url: string;
}

@Injectable({ providedIn: 'root' })
export class GithubService {

    constructor(private readonly http: HttpClient) { }

    getUser(username: string): Observable<GithubUser> {
        return this.http.get<GithubUser>(`https://api.github.com/users/${username}`);
    }
}
