import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/components/homePage';
import { RegisterPage } from '../pages/components/registerPage';

test ('register -> card payment check', async ({page}) => {
    
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);

  await homePage.startRegister();
  await registerPage.registration(fullName, email, password);
  expect(registerPage.registerStatus).toHaveText('Registration successful!');

})