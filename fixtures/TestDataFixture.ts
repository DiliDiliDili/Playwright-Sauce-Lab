import { test as base } from "@playwright/test";
import loginData from "../resources/loginCredentials.json";
import productData from "../resources/productList.json";

import { readJsonFile } from "../utils/jsonFileReader";

type TestData = {
  loginCredentials: typeof loginData;
  productList: typeof productData;
};

export const test = base.extend<TestData>({
  loginCredentials: async ({}, use) => {
    const loginData = readJsonFile("./resources/loginCredentials.json");
    // Use the login data in tests
    await use(loginData);
  },
  productList: async ({}, use) => {
    const productData = readJsonFile("./resources/productList.json");
    // Use the product data in tests
    await use(productData);
  },
});
