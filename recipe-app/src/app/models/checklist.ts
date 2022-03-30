export class Checklist {
    public id? : number;
    public name? : string;
    public description? : string;
    constructor(id?:number,name?:string,description?:string){
        this.id = id;
        this.description = description;
        this.name = name;
    }
}
