import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dishes: Dish[]=[];
  errMess: string;
    
  constructor(private dishService: DishService,
    @Inject('BaseUrl') public BaseUrl: any) { }

  ngOnInit(): void {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }
  

}
