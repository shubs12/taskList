import { Component, OnInit ,ViewChild, Input} from '@angular/core';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import  { Comment } from '../shared/comment';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev:string;
  next:string;
  comment:Comment;
  CommentForm:FormGroup;
  

  @ViewChild('fform') CommentFormDirective: { resetForm: () => void; };
  
  formErrors: any = {
    'author': ''
  };
  validationMessages: any = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
    },
    'comment': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
    }
  }

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {
      this.createForm();
    }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);

    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack():void{
    this.location.back();
  }
  createForm() {
    this.CommentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      comment: ['', [Validators.required, Validators.minLength(2)] ],
      rating: [5],
      date : new Date().toLocaleDateString()
    });
    this.CommentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    if (!this.CommentForm) { return; }
    const form = this.CommentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.CommentForm.value;
    console.log(this.comment);
    this.CommentForm.reset({
      author: '',
      comment: '',
      value:0,
    });
    this.CommentFormDirective.resetForm();
}
}