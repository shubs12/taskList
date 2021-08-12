import { Component, OnInit , Input} from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';



@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input()
  dish: Dish;
  constructor() { }
  ngOnInit(): void {
  }

}
