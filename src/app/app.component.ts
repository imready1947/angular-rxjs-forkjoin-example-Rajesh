import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, zip } from 'rxjs';

interface User {
  id: number;
}

interface Post {
  id: number;
}

@Component({
  selector: 'my-app',
  template: ` 
    RXJS EXAMPLE. See Console
    <div *ngIf="data">
      <pre>First User email: {{data[0][0].email}}</pre>
      <pre>First Post title: {{data[1][0].title | json}}</pre>
      {{dd | json}}
    </div>
  `,
})
export class AppComponent {
  USERS = 'https://jsonplaceholder.typicode.com/users/';
  POSTS = 'https://jsonplaceholder.typicode.com/posts/';
  data: [User[], Post[]];
  dd: any;
  constructor(http: HttpClient) {
    const users = http.get<User[]>(this.USERS);
    const posts = http.get<Post[]>(this.POSTS);

    forkJoin([users, posts]).subscribe((res) => {
      this.data = res;
      console.log('User and Post', res);
      this.dd = res;
    });
  }
}
