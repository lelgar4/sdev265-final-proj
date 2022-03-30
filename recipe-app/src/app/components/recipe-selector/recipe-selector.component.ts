import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeItem } from 'src/app/models/recipe-item';
import { ServerService } from 'src/app/server.service';


@Component({
  selector: 'app-recipe-selector',
  templateUrl: './recipe-selector.component.html',
  styleUrls: ['./recipe-selector.component.css']
})
export class RecipeSelectorComponent implements OnInit {
  measurementItem: string = '';
  ingredientsItem: string = '';
  preparedItem: string = '';
  steps: RecipeItem[] = [];
  selectedItem?: RecipeItem;
  recipeId: string = '';
  routeState: any;

  constructor(private _router: Router, private server: ServerService) {
    if (this._router) {
      if (this._router.getCurrentNavigation()?.extras.state) {
        this.routeState = this._router.getCurrentNavigation()?.extras.state;
        if (this.routeState) {
          this.recipeId = this.routeState.recipeId;
          localStorage.setItem("currentRecipe", this.recipeId as string);
        }
      }
    }
    if (localStorage.getItem("currentRecipe")) {
      this.recipeId = localStorage.getItem("currentRecipe") || '';
    }
  }

  ngOnInit(): void {
    this.server.getRecipeItems({
      recipeId:this.recipeId
    }).then((e: any) => {
      if (e.body.status === 'ok') {
        console.log(this.recipeId)

        console.log(e.body.steps)
        for (let step of e.body.steps) {
          console.log(step)
          this.steps?.push(new RecipeItem(step.recipeItem_id, step.recipeId, step.measurement, step.ingredient, step.preparation))
        }
        // this.recipes?.push(new Recipe())
        // this._router.navigateByUrl('/recipe-builder',{state:{user: e.body.user}})
      } else {

      }
    });
  }


  updateRecipeInformation(instructions:string){
    this.server.updateRecipeInfo({
      recipeId: this.recipeId,
      instructions: instructions,
      itemLength:this.steps.length
    }).then((e: any) => {
      if (e.body.status === 'ok') {
        console.log(e.body.item)
        this._router.navigateByUrl('/user')

      } else {

      }
    });
  }

  checkComplete(sectionItem: any) {
    console.log(sectionItem)
    switch (sectionItem.section) {
      case 'measurement':
        this.measurementItem = sectionItem.value;
        break;
      case 'ingredients':
        this.ingredientsItem = sectionItem.value;
        break;
      case 'prepared':
        this.preparedItem = sectionItem.value;
        break;
    }
  }

  changeItem(item: RecipeItem) {
    if (this.selectedItem === item) {
      this.selectedItem = undefined;
      this.measurementItem = '';
      this.ingredientsItem = '';
      this.preparedItem = '';
    } else {
      this.selectedItem = item;
      this.measurementItem = item.measurement;
      this.ingredientsItem = item.ingredient;
      this.preparedItem = item.preparation;
    }


  }

  generateIngredients() {
    console.log(this.measurementItem)
    let item = new RecipeItem(0, 0, '', '', '')
    if (this.selectedItem) {
      let itemIndex = this.steps.indexOf(this.selectedItem);
      console.log(itemIndex)
      this.server.updateRecipeItems({
        itemId: this.steps[itemIndex].id,
        measurement: this.measurementItem,
        preparation: this.preparedItem,
        ingredient: this.ingredientsItem
      }).then((e: any) => {
        if (e.body.status === 'ok') {
          let measurement = this.measurementItem;
          let prep = this.preparedItem;
          let ingredient = this.ingredientsItem;
          this.steps[itemIndex] = new RecipeItem(this.steps[itemIndex].id!, parseInt(this.recipeId), measurement, ingredient, prep);
          console.log(this.steps)
        } else {

        }
      });

    } else {
      this.server.setRecipeItems({
        measurement: this.measurementItem,
        preparation: this.preparedItem,
        ingredient: this.ingredientsItem,
        recipeId: this.recipeId
      }).then((e: any) => {
        if (e.body.status === 'ok') {
          let measurement = this.measurementItem;
          let prep = this.preparedItem;
          let ingredient = this.ingredientsItem;
          this.steps?.push(new RecipeItem(e.body.itemId, parseInt(this.recipeId), measurement, ingredient, prep))
          console.log(this.steps)
        } else {

        }
      });
    }

    this.selectedItem = undefined;
    // this.measurementItem = '';
    // this.ingredientsItem = '';
    // this.preparedItem = '';
  }
}
