export class Cuisine {
    Id: number;
    Description: string;
    Name: string;
    IsActive: boolean;
    CreatedDate: Date;
    RestaurantIds: any[] = [];
    RestaurantNameWithCommaSeperated: string;
    LastModifiedDate: Date;
    CreatedUserId: number;
    LastModifiedUserId: number;
    CreatedUserUsername: string;
    LastModifiedUsername: string;
}
