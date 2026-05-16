# Saucedemo E2E Tests

Automated tests for [saucedemo.com](https://www.saucedemo.com/) using Playwright and TypeScript.

## Test scenarios

### Auth
- Successful login
- Invalid login
- Empty username field
- Empty password field
- Locked out user login

### Cart
- Add one item to cart
- Add several items to cart
- Delete items on products page
- Delete items on cart page and continue shopping
- Check icon for items in cart
- Go to cart and check the list of added items

### Checkout
- Successful order checkout
- Continue checkout with empty fields
- Total price and amount of items check
## Project structure

```
+-- poms/pages/         # Page Object Models
   +-- LoginPage.ts
   +-- ProductsPage.ts
   +-- CartPage.ts
   +-- CheckoutPage.ts
   +-- CheckoutOverviewPage.ts
   +-- CheckoutCompletePage.ts
+-- tests/              # Test specs
   +-- auth.spec.ts
   +-- cart.spec.ts
   +-- checkout.spec.ts
+-- .env                # Environment variables (not committed)
+-- playwright.config.ts
```

## Setup

```bash
npm install
npx playwright install
```

Create a `.env` file:

```
BASE_URL=https://www.saucedemo.com/
STANDARD_USER=standard_user
PASSWORD=secret_sauce
```

## Run tests

```bash
# all tests
npx playwright test

# specific browser
npx playwright test --project=chromium

# specific test file
npx playwright test tests/auth.spec.ts

# debug mode
npx playwright test --debug

# show report
npx playwright show-report
```

## Tech stack

- Playwright
- TypeScript
- Page Object Model pattern
- dotenv for environment variables
- Faker.js for test data generation