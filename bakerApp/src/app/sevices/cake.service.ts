import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Cake } from '../models/cake';
import { catchError, map, mergeMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CakeService {
  public masterData:any[]=[];
  constructor(private http:HttpClient) {
    this.loadUsers();
   }
  private cake_url="  http://localhost:3000/cakes";
  private users_url="http://localhost:3000/users";

  getCakes(): Observable<any> {
    return this.http.get(this.cake_url);
  }
  getCake(id?:number) : Observable<Cake>{
    console.log(id);
    return this.http.get<Cake>(`${this.cake_url}/${id}`);
  }
  addUsers(userdata:any){
    return this.http.post(this.users_url,userdata)
  }
  addItemToUserCart(userId: number, cartItem: any): Observable<any> {
    const userUrl = `${this.users_url}/${userId}`;
  
    return this.http.get<any>(userUrl).pipe(
      mergeMap((user) => {
        if (!user.items) {
          user.items = [];
        }
  
  
        user.items.push(cartItem);
  
        
        return this.http.put(userUrl, user).pipe(
          catchError((error) => {
            console.error('Error updating user data:', error);
            return throwError('Error updating user data');
          })
        );
      }),
      catchError((error) => {
        console.error('Error fetching user data:', error);
        return throwError('Error fetching user data');
      })
    );
  }
  
  checkUserAuthentication(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.users_url).pipe(
      map((users) => {
        
        const authenticatedUser = users.find(
          (user) => user.email === email && user.password === password
        );
        return !!authenticatedUser; 
      })
    );
  }
  getUserDataByEmail(email: string): Observable<any> {
    return this.http.get<any[]>(this.users_url).pipe(
      map((users) => {
        return users.find((user) => user.email === email);
      })
    );
  }
  // Add this method to your CakeService
// updateUserData(userId: number, userData: any): Observable<any> {
//   const userUrl = `${this.users_url}/${userId}`;
//   return this.http.put(userUrl, userData);
// }
 updateUserData(userId: string, updatedUserData: any): Observable<any> {
    // Create the URL for updating user data with the specific order
    const updateUserUrl = `${this.users_url}?orders=${userId}`;

    // Make a PUT request to update the user data
    return this.http.put(updateUserUrl, updatedUserData);
  }
// Update user data for Buy Now
updateUserForBuyNow(userData: any): Observable<any> {
  const userUrl = `${this.users_url}/${userData.id}`; // Assuming you have an 'id' property in the userData
  return this.http.put(userUrl, userData);
}
   
getCurrentUserOrders(userId: number): Observable<any[]> {
  const userUrl = `${this.users_url}/${userId}`;
  return this.http.get<any>(userUrl).pipe(
    map((user) => user.orders || []) // Assuming orders is an array in the user's data
  );
}

getAllUsers(): Observable<any[]> {
  return this.http.get<any[]>(this.users_url);

}
// loadUsers() {
//   this.http.get<any[]>(this.users_url).subscribe((data) => {
//     this.masterData= data;
//     console.log('master User Array:', this.masterData);
//   });
// }
loadUsers(): Observable<any[]> {
  return this.http.get<any[]>(this.users_url);
}
}
