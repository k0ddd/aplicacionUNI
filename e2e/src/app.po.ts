import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToLogin() {
    return browser.get('/login'); // Ajusta la ruta según corresponda
  }

  enterEmail(email: string) {
    return element(by.css('ion-input[ngModel="email"] input')).sendKeys(email);
  }

  enterPassword(password: string) {
    return element(by.css('ion-input[ngModel="password"] input')).sendKeys(password);
  }

  clickLoginButton() {
    return element(by.css('ion-button')).click();
  }

  getToastMessage() {
    return element(by.css('.toast-message')).getText();  // Verifica si '.toast-message' es el selector correcto
  }

  clickForgotPassword() {
    return element(by.buttonText('¿HAS OLVIDADO TU CONTRASEÑA?')).click();
  }
}
