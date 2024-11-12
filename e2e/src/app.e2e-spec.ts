import { browser, by, element } from 'protractor';
import { AppPage } from './app.po';

describe('Login Tests', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should show error when both email and password are empty', async () => {
    await page.navigateToLogin();
    await page.clickLoginButton();
    const toastMessage = await page.getToastMessage();
    expect(toastMessage).toEqual('Por favor, ingresa el email y la contraseña');
  });

  it('should show error when email is empty', async () => {
    await page.navigateToLogin();
    await page.enterPassword('somepassword');
    await page.clickLoginButton();
    const toastMessage = await page.getToastMessage();
    expect(toastMessage).toEqual('Por favor, ingresa el email');
  });

  it('should show error when password is empty', async () => {
    await page.navigateToLogin();
    await page.enterEmail('test@duocuc.cl');
    await page.clickLoginButton();
    const toastMessage = await page.getToastMessage();
    expect(toastMessage).toEqual('Por favor, ingresa la contraseña');
  });

  it('should navigate to the correct page for valid student credentials', async () => {
    await page.navigateToLogin();
    await page.enterEmail('student@duocuc.cl');
    await page.enterPassword('validpassword');
    await page.clickLoginButton();

    // Verifica que la ruta sea la correcta
    expect(await browser.getCurrentUrl()).toContain('/home-alumno');
  });

  it('should navigate to the correct page for valid professor credentials', async () => {
    await page.navigateToLogin();
    await page.enterEmail('professor@profesor.duocuc.cl');
    await page.enterPassword('validpassword');
    await page.clickLoginButton();

    // Verifica que la ruta sea la correcta
    expect(await browser.getCurrentUrl()).toContain('/home');
  });

  it('should navigate to the correct page for valid admin credentials', async () => {
    await page.navigateToLogin();
    await page.enterEmail('admin@admin.cl');
    await page.enterPassword('validpassword');
    await page.clickLoginButton();

    // Verifica que la ruta sea la correcta
    expect(await browser.getCurrentUrl()).toContain('/home-admin');
  });

  it('should show error for invalid credentials', async () => {
    await page.navigateToLogin();
    await page.enterEmail('invalid@duocuc.cl');
    await page.enterPassword('wrongpassword');
    await page.clickLoginButton();

    const toastMessage = await page.getToastMessage();
    expect(toastMessage).toEqual('Credenciales incorrectas');
  });

  it('should open password recovery modal', async () => {
    await page.navigateToLogin();
    await page.clickForgotPassword();

    // Aquí debes agregar una verificación para comprobar que el modal está presente.
    const modal = element(by.css('ion-modal'));
    expect(modal.isPresent()).toBeTruthy();
  });
});
