import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: any = [];
  private postsUpdated = new Subject<{ posts: any }>();
  
  constructor(private http: HttpClient, private router: Router) {}
  
  getPosts(postsPerPage: number, currentPage: number) {
    this.http
      .get<{ pid: string }>(
        BACKEND_URL
      )
      .pipe(
        map(postData => {
              return {
                title: postData.title,
                content: postData.content,
                id: postData._id,
                imagePath: postData.imagePath,
                creator: postData.creator
              };
            })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData;
        this.postsUpdated.next({
          posts: [...this.posts],
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
}
