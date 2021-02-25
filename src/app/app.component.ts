import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { SwapiService } from "../app/app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  posts: any = [];
  title = 'Red Space';
  selectedPeople: any = 'Sample';
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public SwapiService: SwapiService
  ) {}
 
  ngOnInit() {
    this.SwapiService.getPosts(1);
    this.postsSub = this.SwapiService
      .getPostUpdateListener()
      .subscribe((postData: { posts: any;}) => {
        this.posts = postData.posts.posts;
      });
  }

  selectChangeHandler (event: any) {
    // Monitor select box changes
    this.SwapiService.getPosts(event.target.value);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
