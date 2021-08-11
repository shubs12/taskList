import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dishes: Dish[] = DISHES;
  selectedDish!: Dish;

    
  constructor() { }

  ngOnInit(): void {
  }
  
  onSelect(dish: Dish){
    this.selectedDish = dish;
  }

}
