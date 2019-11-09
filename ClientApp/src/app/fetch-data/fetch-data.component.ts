import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  private myCountInput: any;
  private myReverseInput: any;
  private myDuplicateInput: any;
  public reveresedString: any;
  public distinctString: any;
  public characterCount : CharacterCount[];
  private REST_API_SERVER = "https://localhost:5001/weatherforecast/";
  constructor(public http: HttpClient, private dataService: DataServiceService) {
    
  }
  ngOnInit()
  {
    this.http.get<WeatherForecast[]>(this.REST_API_SERVER + 'Get').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
  GetCountOfCharacters()
  {
    let params = new HttpParams();
    params = params.append("input", this.checkForNull(this.myCountInput));
    
    this.http.get<CharacterCount[]>(this.REST_API_SERVER + 'GetCountCharacter', {
      params : params
    }).subscribe(result => {
      debugger;
      this.characterCount = result;
    })
  }
  
  getReversedString()
  {
    let reversedUrl = this.REST_API_SERVER + 'GetReverse?input=' + this.checkForNull(this.myReverseInput);
    this.dataService.sendReverseRequest(reversedUrl).subscribe((data: any) =>{
      this.reveresedString = data;
    });
  }

  avoidDuplicate()
  {
    let duplicateUrl = this.REST_API_SERVER + 'GetDuplicate?input=' + this.checkForNull(this.myDuplicateInput);
    this.dataService.sendDuplicateRequest(duplicateUrl).subscribe((data: any) =>{
      this.distinctString = data;
    });
  }
  checkForNull(value :any)
  {
    if(value === '' || value === undefined || value === null)
    {
      return "";
    }else{
      return value;
    }
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
interface CharacterCount {
  character: string;
  count: number;
}