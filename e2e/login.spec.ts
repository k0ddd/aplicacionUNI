import { test, expect } from '@playwright/test';

test.describe('Login tests', () => {

  test('Profesor login test', async ({ page }) => {
    // Navega a la página de login
    await page.goto('http://localhost:8100/login');

    // Ingresa las credenciales del Profesor
    await page.fill('ion-item ion-label:has-text("Email") + ion-input input', 'kwest@profesor.duocuc.cl');
    await page.fill('ion-item ion-label:has-text("Contraseña") + ion-input input', '123456789');

    // Click "Ingresar"
    await page.click('ion-button:has-text("Ingresar")');

    // URL Cambia
    await expect(page).toHaveURL('http://localhost:8100/home/historial-clases');

    await expect(page).toHaveTitle(/Ionic App/);
  });

  test('Alumno login test', async ({ page }) => {

    await page.goto('http://localhost:8100/login');


    await page.fill('ion-item ion-label:has-text("Email") + ion-input input', 'cj@duocuc.cl');
    await page.fill('ion-item ion-label:has-text("Contraseña") + ion-input input', '123456789');

    await page.click('ion-button:has-text("Ingresar")');

    await expect(page).toHaveURL('http://localhost:8100/home-alumno/historial-asistencia');

    await expect(page).toHaveTitle(/Ionic App/);
  });

  test('Administrador login test', async ({ page }) => {

    await page.goto('http://localhost:8100/login');

    await page.fill('ion-item ion-label:has-text("Email") + ion-input input', 'admin@admin.cl');
    await page.fill('ion-item ion-label:has-text("Contraseña") + ion-input input', 'admin');

    await page.click('ion-button:has-text("Ingresar")');

    await expect(page).toHaveURL('http://localhost:8100/home-admin/crear-clase');

    await expect(page).toHaveTitle(/Ionic App/);
  });

});
