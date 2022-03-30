import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  session?: any;
  constructor(private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any) {
    console.log(data)
    const result = this.http.request(method, url, {
      withCredentials:true,
      body: data,
      responseType: 'json',
      observe: 'response',
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    }).catch(e => {
      console.log(e)
    });
  }
  // ADD ${environment.serverUrl} for testing
  createAccount(event:any) {
    return this.request('POST', `/register`,event);
  }
  loginAccount(event : any) {
    return this.request('POST', `/auth`, event);
  }
  createRecipe(event:any){
    return this.request('POST',  `/addRecipe`, event)
  }
  createChecklist(event:any){
    return this.request('POST',  `/addChecklist`, event)
  }
  getRecipes(event:any){
    return this.request('GET',  `/userRecipe`, event)
  }
  getrecipes(event:any){
    return this.request('GET',  `/userChecklist`, event)
  }
  setRecipeItems(event:any){
    return this.request('POST',  `/recipeItem`, event)
  }
  getRecipeItems(event:any){
    return this.request('POST',  `/recipeItems`, event)
  }
  updateRecipeItems(event:any){
    return this.request('PUT',  `/recipeItem`, event)
  }
  updateRecipeInfo(event:any){
    return this.request('PUT',  `/updateRecipe`, event)
  }
}
// createAccount(event:any) {
//   return this.request('POST', `/register`,event);
// }
// loginAccount(event : any) {
//   return this.request('POST', `/auth`, event);
// }
// createRecipe(event:any){
//   return this.request('POST',  `/addRecipe`, event)
// }
// createChecklist(event:any){
//   return this.request('POST',  `/addChecklist`, event)
// }
// getRecipes(event:any){
//   return this.request('GET',  `/userRecipe`, event)
// }
// getrecipes(event:any){
//   return this.request('GET',  `/userChecklist`, event)
// }