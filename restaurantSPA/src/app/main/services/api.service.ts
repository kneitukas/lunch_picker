import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';


@Injectable({providedIn: 'root'})
export class ApiService {
    url = 'http://localhost:8080'
    constructor(private http: HttpClient, private auth:AuthService) { }
    

    createRestaurant(data: any) {
        return this.http.post(`${this.url}/restaurant`, data)
    }

    getRestaurants() {
        return this.http.get(this.url + '/restaurant')
    }

    getRestaurantById(id) {
        return this.http.get(this.url + `/restaurant/${id}`)
    }

    buildHeader() {  
        const head =  {
            headers: new HttpHeaders({
                'content-type': 'application/json',
                'Authorization': this.auth.token
            })
        }
        return head
    }
}