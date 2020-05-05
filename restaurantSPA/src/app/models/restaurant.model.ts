import { Time } from '@angular/common';

export interface RestaurantResponse {
    id: number;
    Name: string;
    Type: string;
    CreatedAt: Time
    UpdatedAt: Time
}