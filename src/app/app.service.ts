import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: "root" })
export class SwapiService {
  private postsUpdated = new Subject<{ posts: any }>();
  
  constructor(private http: HttpClient, private router: Router) {}
 
  getPosts(peopleID: Number) {
    this.http
      .get<{ message: string; info: any; }>(
        BACKEND_URL + peopleID
      )
      .pipe(
        map(postData => {
          return {
            posts: {
                      name : postData.info.name,
                      height : postData.info.height,
                      mass : postData.info.mass,
                      hairColor : postData.info.hairColor,
                      skinColor : postData.info.skinColor,
                      gender : postData.info.gender,
                      birthYear : postData.info.birthYear,
                      homePlanet : postData.info.homePlanet,
                      species : postData.info.species,
                      films  : postData.info.films
                    }
               }
            })
        )
      .subscribe(transformedPostData => {
        this.postsUpdated.next({
          posts: transformedPostData,
        })
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
}