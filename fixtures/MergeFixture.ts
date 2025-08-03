import { expect as defaultExpect, mergeTests } from "@playwright/test";

import { test as pages} from '../fixtures/PageFixture';
import { test as testData } from '../fixtures/TestDataFixture';

export const test = mergeTests(pages, testData);

export const expect = defaultExpect;