
# Playwright-Sauce-Lab

## Overview

Playwright-Sauce-Lab is an automation framework designed with maintainability and scalability in mind, using the Page Object Model, fixtures, and modular utilities to support robust test automation for web applications.

Key benefits:
- Run tests across Chromium, Firefox, and WebKit browsers
- Integrate with Sauce Labs for parallel and remote execution
- Organize code with reusable page objects and fixtures
- Manage test data and credentials securely

---

## Features
- Cross-browser testing (Chromium, Firefox, WebKit)
- Page Object Model structure
- Fixtures for test data and page setup
- JSON-based test data management
- Logging and test result reporting


## Project Structure

```
├── fixtures/           # Test and page fixtures
├── logs/               # Log files for test runs and errors
├── pages/              # Page Object Model classes
├── playwright-report/  # Playwright HTML reports
├── resources/          # Test data (JSON)
├── test-results/       # Screenshots and test artifacts
├── tests/              # Test specs
├── utils/              # Utility modules (logger, file reader, etc.)
├── playwright.config.ts# Playwright configuration
├── package.json        # Project dependencies and scripts
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone 'https://github.com/DiliDiliDili/Playwright-Sauce-Lab.git'
cd Playwright-Sauce-Lab
```

2. Install dependencies
```bash
npm install
```

3. Install Playwright browsers
```bash
npx playwright install
```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests with browser UI visible:
```bash
npm run test:headed
```

Run tests with Playwright UI mode:
```bash
npm run test:ui
```

Debug tests:
```bash
npm run test:debug
```

View test report:
```bash
npm run report
```
Open `playwright-report/index.html` for a detailed report.


### Configuration
Edit `playwright.config.ts` to set up browsers, Sauce Labs credentials, and other settings as needed.


## Utilities
- **Logger**: Custom logging for test runs (`utils/Logger.ts`)
- **Test Data**: JSON files in `resources/` for credentials and product lists
- **Fixtures**: Shared setup/teardown logic in `fixtures/`


## Extending the Framework

To add new features or support additional test scenarios:

1. **Add New Page Objects:**
   - Create a new file in the `pages/` directory for each new page or component.
   - Implement reusable methods for interacting with page elements.

2. **Create/Update Fixtures:**
   - Add or modify fixtures in the `fixtures/` directory to handle new setup or teardown logic.
   - Use fixtures to share state or data between tests.

3. **Add Test Data:**
   - Store new test data in JSON files under `resources/`.
   - Use the utility functions in `utils/jsonFileReader.ts` to load data into your tests.

4. **Write New Tests:**
   - Place new test files in the `tests/` directory.
   - Import page objects and fixtures as needed for your scenarios.

5. **Enhance Utilities:**
   - Add new utility functions to `utils/` for logging, reporting, or data handling.

6. **Update Configuration:**
   - Modify `playwright.config.ts` to add new projects, browsers, or Sauce Labs settings as required.

---
