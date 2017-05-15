import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { BaseService } from './base.service';
import { URLConfig }  from '../constants/index';

@Injectable()
export class DashboardDataService {
    constructor(
        private http: Http,
        private baseService: BaseService
    ) {}

    getCounters(tpg:string) : Promise<any> {
        return this.baseService.apiCall(URLConfig.endPointUrl+ `/counter`, 'GET');
    }

    get(tpg:string, id: string): Promise<any> {
        let apiURL = URLConfig.endPointUrl + `/${id}`;
        if( id === 'trsBreachingSLA' ) {
            apiURL = URLConfig.endPointLocalUrl + `/${id}.json`;
        }
        return this.baseService.apiCall(apiURL, 'GET');
    }
    getAll(key: string): Promise<any[]> {
        return this.baseService.apiCall(URLConfig.endPointUrl + '/' + key, 'GET');
    }

    fetch(tpg:string, id: string, record: any): Promise<any>  {
        return this.baseService.apiCall(URLConfig.endPointUrl+ `/${id}`, 'POST', JSON.stringify([record]));
    }

    delete(record: any): Promise<Response> {
        return this.baseService.apiCall(URLConfig.endPointUrl + `/${record.id}`, 'DELETE');
    }
}