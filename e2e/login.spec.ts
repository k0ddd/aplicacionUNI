import { test, expect } from '@playwright/test';

test.describe('Login tests', () => {

  test('Profesor login test', async ({ page }) => {
    // Navega a la página de login
    await page.goto('http://localhost:8100/login');

    // Ingresar las credenciales del Profesor
    await page.fill('ion-item ion-label:has-text("Email") + ion-input input', 'kwest@profesor.duocuc.cl');
    await page.fill('ion-item ion-label:has-text("Contraseña") + ion-input input', '123456789');

    // Haz clic en el botón "Ingresar"
    await page.click('ion-button:has-text("Ingresar")');

    // Espera que la URL cambie a la página del Profesor
    await expect(page).toHaveURL('http://localhost:8100/home/historial-clases');

    // Verifica que el título o contenido en la página del Profesor sea el esperado
    await expect(page).toHaveTitle(/Ionic App/);
  });

  test('Alumno login test', async ({ page }) => {
    // Navega a la página de login
    await page.goto('http://localhost:8100/login');

    // Ingresar las credenciales del Alumno
    await page.fill('ion-item ion-label:has-text("Email") + ion-input input', 'cj@duocuc.cl');
    await page.fill('ion-item ion-label:has-text("Contraseña") + ion-input input', '123456789');

    // Haz clic en el botón "Ingresar"
    await page.click('ion-button:has-text("Ingresar")');

    // Espera que la URL cambie a la página del Alumno
    await expect(page).toHaveURL('http://localhost:8100/home-alumno/historial-asistencia');

    // Verifica que el título o contenido en la página del Alumno sea el esperado
    await expect(page).toHaveTitle(/Ionic App/);
  });

  test('Administrador login test', async ({ page }) => {
    // Navega a la página de login
    await page.goto('http://localhost:8100/login');

    // Ingresar las credenciales del Administrador
    await page.fill('ion-item ion-label:has-text("Email") + ion-input input', 'admin@admin.cl');
    await page.fill('ion-item ion-label:has-text("Contraseña") + ion-input input', 'admin');

    // Haz clic en el botón "Ingresar"
    await page.click('ion-button:has-text("Ingresar")');

    // Espera que la URL cambie a la página del Administrador
    await expect(page).toHaveURL('http://localhost:8100/home-admin/crear-clase');

    // Verifica que el título o contenido en la página del Administrador sea el esperado
    await expect(page).toHaveTitle(/Ionic App/);
  });

});
