/**
 * Service base on which all other services are based.
 * Handles the boiler plate code for communicating with the server
 */
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, Request, RequestMethod } from '@angular/http';
import { Location } from '@angular/common';

@Injectable()
export class BaseService {
    location:Location;    
    constructor(private http: Http) {}
    
    apiCall(url: string, verb: string, payload?: any, contentType?: string): Promise<any> {
        // defining headers for the request
        let headers = new Headers();
        headers.append('Content-Type', (contentType || 'application/json'));
        
        // defining options for the request
        let requestOptions = new RequestOptions({
          method: verb,
          url:  url,
          headers: headers
        });

        if (payload) {
            requestOptions.body = payload;
        }
        
    // passing request to the server and returing promise to be used further
    return this.http.request(new Request(requestOptions))
        .toPromise() //to convert Observable into Promise
        .then(response => {
            if( response.status === 201 ) {
                return response.text();
            } else if( response.status === 200 ) {
                if( verb.toLowerCase() === 'delete' ||  verb.toLowerCase() === 'put') {
                    return response.text();
                } else {
                   return response.json();
                }
            }
        })
        .catch(this.handleError);
    }
    
    // error handling
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.json());
    }
}
