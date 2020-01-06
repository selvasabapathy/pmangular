import { Component, OnInit } from '@angular/core';
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

  user: User = new User(0,0,'','');
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
      this.userService.editUser(this.user.userId, this.user).subscribe(
        response => {
          this.refreshUsers();
        }
      )  
    }
  }

  editUser(userId: number) : void {
    console.log(`Edit user: ${userId}`);
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
    this.userService.retrieveAllUsers().subscribe(
      response => {
        console.log(`Users from service: ${response}`);
        this.users = response;
      }
    )
  }
}
