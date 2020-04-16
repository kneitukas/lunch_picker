import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RestaurantComponent } from '../../pages/restaurant/restaurant.component';
import { ApiService } from '../api.service';

@Injectable()
export class RestaurantResolver implements Resolve<RestaurantComponent> {
    constructor(private api:ApiService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {

        return this.api.getRestaurantById(route.paramMap.get('id')); 
    }
}