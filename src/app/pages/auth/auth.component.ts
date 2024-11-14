import { Component } from '@angular/core';
import { FormComponent } from "../../components/auth/form/form.component";
import { UserService } from '../../services/api/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  constructor(
    private userSvc: UserService,
    private router: Router
  ){}

  getDNI(dni: string){
    this.userSvc.authUser({dni})
    .subscribe((res: any) => {
      if(res.status == "Ok"){
        localStorage.setItem('userData', JSON.stringify(res.data));
        this.router.navigateByUrl('dashboard')
      }
    })
  }
}
