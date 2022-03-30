export class ChecklistItem {
    public id? : number;
    public isComplete?:boolean;
    public recipeId? : number;
    public ingredient? : string;
    public measurement? : string;
    public preparation? : string;

    constructor(id?:number,recipeId?:number,ingredient?:string,measurement?:string,preparation?:string,isComplete?:boolean){
        this.id = id;
        this.recipeId = recipeId;
        this.measurement = measurement;
        this.preparation = preparation;
        this.isComplete = isComplete;
    }
}
