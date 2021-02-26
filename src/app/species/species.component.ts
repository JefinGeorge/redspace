import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { SwapiService } from "../../app/app.service";

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements OnInit {

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
