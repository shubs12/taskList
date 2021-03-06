import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { leader } from '../shared/leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  lead:leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseUrl') public BaseUrl: any) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
    .subscribe((dish)=> this.dish = dish);

    // this.promotion = 
    this.promotionservice.getFeaturedPromotion()
    .subscribe((promotion) => this.promotion = promotion);

    // this.lead=
    this.leaderService.getFeaturedLeader()
    .subscribe((lead) => this.lead= lead);
  }

}
