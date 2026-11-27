import { faker } from '@faker-js/faker';

export class UserFactory {
  static createUser(overrides = {}) {
    const fullName = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password({ length: 6 });

    const defaultUser = {
      fullName,
      email,
      password,
    };

    return { ...defaultUser, ...overrides };
  }
}
