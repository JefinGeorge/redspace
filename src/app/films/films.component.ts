import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { SwapiService } from "../../app/app.service";

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  posts: any = [];
  private postsSub: Subscription;

  constructor(
    public SwapiService: SwapiService
  ) {}

  ngOnInit() {
    this.postsSub = this.SwapiService
      .getPostUpdateListener()
      .subscribe((postData: { posts: any;}) => {
        this.posts = postData.posts.posts;
      });
  }

}
