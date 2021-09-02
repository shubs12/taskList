import { Component, OnInit,Inject } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: leader[]=[];
  
  constructor( private leaderService: LeaderService,
    @Inject('BaseUrl') public BaseUrl: any) { }

  ngOnInit(): void {
    // this.leaders=
    this.leaderService.getLeaders()
    .subscribe((leaders)=> this.leaders = leaders);
  }

}
