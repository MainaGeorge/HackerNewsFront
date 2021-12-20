import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiDataService } from '../APIService/api-data.service';

@Injectable({
  providedIn: 'root'
})
export class CoreServicesService {

  constructor(private http: HttpClient, private apiService: ApiDataService) { }

  public getStory(storyId:number){
    return this.apiService.getStoryById(storyId).pipe(
      
    )
  }

}
