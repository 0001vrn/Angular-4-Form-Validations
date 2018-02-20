import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Employee } from '../models/employee.model';

import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class FormPoster{

    baseUrl = 'http://localhost:3100/';
    constructor(private http: Http) { }

    private extractData(res: Response){
        let body = res.json();
        return body.fields || {};
    }  
    
    private extractLanguages(res: Response){
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: any){
        console.error('Post form error: ', error);
        return Observable.throw(error.statusText);
    }
    
    getLanguages(): Observable<any>{
        let resourceUrl = 'getlanguages';
        return this.http.get(this.baseUrl+resourceUrl)
                    .delay(2000)
                    .map(this.extractLanguages)
                    .catch(this.handleError);
    }

    postEmployeeForm(employee: Employee):Observable<any>{
        let body = JSON.stringify(employee);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        let resourceUrl = this.baseUrl+'postemployee';
        return this.http.post(resourceUrl, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
    }
    
}