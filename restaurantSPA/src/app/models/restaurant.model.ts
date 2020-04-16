import { Time } from '@angular/common';

export interface RestaurantResponse {
    ID: number;
    Name: string;
    Type: string;
    CreatedAt: Time
    UpdatedAt: Time
}