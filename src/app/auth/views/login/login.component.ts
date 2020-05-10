import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LoginPresenter } from './login.presenter';
import { TextField } from 'tns-core-modules/ui/text-field';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { SimpleModalComponent } from '~/app/shared/simple-modal/simple-modal.component';

@Component({
  selector: 'app-login',
  moduleId: module.id,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginPresenter],
})
export class LoginComponent implements OnInit {
  private userTextField: TextField;
  private passwordTextField: TextField;

  constructor(
    private presenter: LoginPresenter,
    private router: RouterExtensions,
    private page: Page,
    private modalService: ModalDialogService,
    private vcRef: ViewContainerRef
  ) {
    this.presenter.setView(this);
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    this.userTextField = <TextField>this.page.getViewById('userTextField');
    this.passwordTextField = <TextField>(
      this.page.getViewById('passwordTextField')
    );
  }

  onLoginButtonTapped() {
    this.presenter.auth({
      username: this.userTextField.text,
      password: this.passwordTextField.text,
    });
  }

  onErrorAuth(response) {
    this.modalService
      .showModal(SimpleModalComponent, {
        viewContainerRef: this.vcRef,
        fullscreen: false,
        context: {
          image: 'error',
          title: 'Error en login',
          description: 'Verifique sus datos',
          buttonText: 'Cerrar',
        },
      })
      .then(() => {});
  }

  onSuccessAuth(response) {
    this.router.navigate(['home'], { clearHistory: true });
  }
}
