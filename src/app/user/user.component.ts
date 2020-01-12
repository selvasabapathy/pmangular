import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material';

import { UserService } from '../service/user.service';

export class User {
  constructor(public userId: number, public employeeId: number, public firstName: string, public lastName: string) {}
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  addOrUpdateButtonText: string = 'Add';

  user: User;
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log(`UserComponent - ngOnInit`);
    this.refreshUsers();
  }

  addUser() : void {
    console.log(`Add user: ` + this.user);
    if (this.user.userId === 0) {
      this.userService.addUser(this.user).subscribe(
        response => {
          this.refreshUsers();
        }
      )  
    } else {
      console.log(`Update user: ` + this.user);
      this.addOrUpdateButtonText = 'Add';
      this.userService.editUser(this.user.userId, this.user).subscribe(
        response => {
          this.refreshUsers();
        }
      )  
    }
  }

  editUser(userId: number) : void {
    console.log(`Edit user: ${userId}`);
    this.addOrUpdateButtonText = 'Update';
    this.user = this.users.find(user => user.userId === userId);
  }

  deleteUser(userId: number) : void {
    console.log(`Delete user with UserID: ${userId}`);
    this.userService.deleteUser(userId).subscribe(
      response => {
        this.refreshUsers();
      }
    )
  }

  refreshUsers() : void {
    this.addOrUpdateButtonText = 'Add';
    this.user = new User(0,0,'','');
    this.userService.retrieveAllUsers().subscribe(
      response => {
        console.log(`Users from service: ${response}`);
        this.users = response;
      }
    )
  }

  sortUsers(sort: Sort) {
    const data = this.users;
    if (!sort.active || sort.direction === '') {
      this.users = data;
      return;
    }

    this.users = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'employeeId': return this.compare(a.employeeId, b.employeeId, isAsc);
        case 'firstName': return this.compare(a.firstName, b.firstName, isAsc);
        case 'lastName': return this.compare(a.lastName, b.lastName, isAsc);
        default: return 0;
      }
    });
  }
  
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
