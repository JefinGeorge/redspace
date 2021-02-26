import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { SwapiService } from "../../app/app.service";

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {

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
