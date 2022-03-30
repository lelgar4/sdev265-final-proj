import { Component, Injector, OnInit } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { UserModule } from 'src/app/modules/user/user.module';
import { UserRoutingModule } from 'src/app/modules/user/user-routing.module';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private server: ServerService, private _router: Router) {

  }

  ngOnInit(): void {
  }

  loginUser(username: string, password: string) {
    this.server.loginAccount({
      username: username,
      password: password,
    }).then((e: any) => {
      if (e.body.status === 'ok') {
        this._router.navigateByUrl('/user', { state: { user: e.body.user } })
      } else {

      }
    })
  }
  registerUser(username: string, password: string, confirmPassword: string,email:string) {
    if (password === confirmPassword) {
      this.server.createAccount({
        username: username,
        password: password,
        email:email
      }).then((e: any) => {
        if (e.body.status === 'ok') {
          this._router.navigateByUrl('/user', { state: { user: e.body.user } })
        } else {

        }
      })
    }
  }
}
