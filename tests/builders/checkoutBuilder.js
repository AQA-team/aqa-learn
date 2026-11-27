import { faker } from '@faker-js/faker';

export default class CheckoutBuilder {
  constructor() {
    this.checkout = {
      name: faker.person.firstName(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
    };
  }

  withName(name) {
    this.checkout.name = name;
    return this;
  }

  withAddress(address) {
    this.checkout.address = address;
    return this;
  }

  withPhone(phone) {
    this.checkout.phone = phone;
    return this;
  }

  withPaymentMethod(method) {
    this.checkout.paymentMethod = method;
    return this;
  }

  build() {
    return { ...this.checkout };
  }
}
