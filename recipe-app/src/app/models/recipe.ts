export class Recipe {
    public id? : number;
    public name? : string;
    public description? : string;
    public instructions? : string;
    constructor(id?:number,name?:string,description?:string,instructions?:string){
        this.id = id;
        this.description = description;
        this.instructions = instructions;
        this.name = name;
    }
}
