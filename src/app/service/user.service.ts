import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user/user.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  addUser(user: User) {
    console.log(`Add user: ${user}`);
    return this.httpClient.post(`http://localhost:8080/users`, user);
  }

  editUser(userId: number, user: User) {
    console.log(`Edited user: ${user}`);
    return this.httpClient.put(`http://localhost:8080/users/${userId}`, user);
  }

  deleteUser(userId: number) {
    console.log(`Delete user with UserID: ${userId}`);
    return this.httpClient.delete(`http://localhost:8080/users/${userId}`);
  }

  retrieveUser(userId: number) {
    console.log(`Retrive user with UserID: ${userId}`);
    return this.httpClient.get<User>(`http://localhost:8080/users/${userId}`);
  }

  retrieveAllUsers() {
    console.log(`Retrive all users...`);
    return this.httpClient.get<User[]>(`http://localhost:8080/users`);
  }
}
