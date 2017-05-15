import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainMenuRoute } from '@ericsson/oden/components/main-menu/main-menu-route.model';
import { Http, Response } from '@angular/http';

/**
 * This is an example service on how to get routes from a service.
 */
@Injectable()
export class RouteLoaderServiceMock {

    constructor(private _http: Http) {}

    /**
     * A mock up of how to do a get-request for the rest
     * @returns {Observable<R>}
     */
    getRoutes(): Observable<Array<MainMenuRoute>> {
        return this._http.get('assets/routes.json').map((resp: Response) => this._map_to_routes(resp));
    }

    /**
     * Creates and return a MainMenuRoute
     * @param obj
     * @returns {MainMenuRoute}
     * @private
     */
    private _map_to_route(obj: any): MainMenuRoute {
        return new MainMenuRoute(obj);
    }

    /**
     * Creates and return a MainMenuRoute array
     * @param response
     * @returns {Array<MainMenuRoute>}
     * @private
     */
    private _map_to_routes(response: Response): Array<MainMenuRoute> {
        let routes: Array<MainMenuRoute> = response.json().map((route: any) => this._map_to_route(route));
        return routes;
    }
}
