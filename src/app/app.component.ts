import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { SwapiService } from "../app/app.service";
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  posts: any = [];
  selected = 1;
  title = 'Red Space : Programming Challenge';
  selectedPeople: any = 'Sample';
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public SwapiService: SwapiService
  ) {}
 
  ngOnInit() {
    this.SwapiService.getPosts(this.selected);
    this.postsSub = this.SwapiService
      .getPostUpdateListener()
      .subscribe((postData: { posts: any;}) => {
        this.posts = postData.posts.posts;
      });
  }

  selectChangeHandler(event: any) {
    // Monitor select box changes
    this.SwapiService.getPosts(event.value);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
