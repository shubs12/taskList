import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dishes: Dish[]=[];
  selectedDish: Dish;

    
  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.dishes=this.dishService.getDishes();
  }
  
  onSelect(dish: Dish){
    this.selectedDish = dish;
  }


}
