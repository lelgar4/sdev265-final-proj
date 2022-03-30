export class RecipeItem {
    public id? : number;
    public recipeId? : number;
    public ingredient : string;
    public measurement : string;
    public preparation : string;

    constructor(id:number,recipeId:number,measurement:string,ingredient:string,preparation:string){
        this.id = id;
        this.recipeId = recipeId;
        this.measurement = measurement;
        this.ingredient = ingredient;
        this.preparation = preparation;
    }
}
