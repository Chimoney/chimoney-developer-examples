
Welcome to the starter code template for the Interledger Summit Hackathon. This README will guide you through the different use cases and API steps to help you easily integrate the different Interledger endpoints into your hackathon project.

You can find the code for integrating specific use case flows under the `src` folder. 

## 1. Seamless International E-commerce

**Problem Statement:**
- International transactions are slow, costly, and prone to pricing inconsistencies.
- Users are confused by foreign currencies during checkout, leading to high cart abandonment rates.

**Proposed Solution:**
Implement a “Pay with Open Payments” flow.

### Flow Using Chimoney Interledger enabled API:
1. **Sub-account Setup:**
   - Create Interledger-enabled sub-accounts for both the customer and the merchant using the Chimoney API.
   - [Create Sub-account Endpoint](https://api-v2-sandbox.chimoney.io/api-docs/#/SubAccount/post_v0_2_sub_account_create)

2. **Issue Payment Pointers:**
   - Generate payment pointers for both the customer and the merchant.
   - [Issue Payment Pointer Endpoint](https://api-v2-sandbox.chimoney.io/api-docs/#/Account/post_v0_2_accounts_issue_wallet_address)

3. **Initiate Payment Request:**
   - When the customer selects "Pay with Open Payments," trigger the **Initiate Payment Request** endpoint with the Interledger option.
   - [Initiate Payment Request Endpoint](https://api-v2-sandbox.chimoney.io/api-docs/#/Payouts/post_v0_2_payouts_interledger_wallet_address)

4. **Interledger Process:**
   - The customer selects Interledger and enters their wallet address. They are redirected to the consent page.
   - Upon approval, funds are moved from the customer’s sub-account via their payment pointer to the merchant’s payment pointer.

5. **Settlement:**
   - The funds are settled in the merchant’s sub-account, completing the transaction.

---

## 2. Microfinance and Lending

**Problem Statement:**
- Lack of access to affordable loans for underserved individuals, with rigid repayment schedules and high transaction costs.

**Proposed Solution:**
Develop a flexible micro-loan platform  to manage loans with real-time payments and flexible repayment schedules.

### Flow Using Chimoney Interledger enabled API:
1. **Sub-account Setup:**
   - Create Interledger-enabled sub-accounts for the borrower and lender upon their registration.
   - [Create Sub-account Endpoint](https://api-v2-sandbox.chimoney.io/api-docs/#/SubAccount/post_v0_2_sub_account_create)

2. **Issue Payment Pointers:**
   - Generate payment pointers for both the borrower and the lender.
   - [Issue Payment Pointer Endpoint](https://api-v2-sandbox.chimoney.io/api-docs/#/Account/post_v0_2_accounts_issue_wallet_address)

3. **Loan Request Submission:**
   - Create a form for the borrower to submit loan requests, including fields for loan amount, purpose, and Interledger Wallet Address.
   - Trigger the **Initiate Payment Request** endpoint when the borrower submits the request.
   - [Initiate Payment Request Endpoint](https://api-v2-sandbox.chimoney.io/api-docs/#/Payouts/post_v0_2_payouts_interledger_wallet_address)

4. **Loan Approval and Disbursement:**
   - The lender reviews the loan request. If approved, they initiate the loan payment via the **Pay with Interledger** option.
   - The lender approves the transaction, and funds are transferred from the lender’s sub-account to the borrower’s sub-account via their payment pointers.

---

## 3. Global Remittances for Migrant Workers

**Problem Statement:**
- Migrant workers face high fees and delays when sending money back home to their families, with no real-time status tracking of payments.

**Proposed Solution:**
Build a remittance application for instant cross-border transfers with transparent fee breakdowns.

### Flow Using Chimoney Interledger enabled API:
1. **User Registration and Wallet Setup:**
   - Both the sender and receiver sign up on the remittance platform. Each user is issued an Interledger-enabled sub-account and a wallet address.
   - [Create Sub-account Endpoint](https://api-v2-sandbox.chimoney.io/api-docs/#/SubAccount/post_v0_2_sub_account_create)

2. **Payment Initiation by Sender:**
   - The sender initiates a transfer by sending funds to the recipient’s Interledger Wallet Address using the **Payout to Interledger Wallet Address** endpoint.
   - [Payout to Interledger Wallet Address Endpoint](https://api-v2-sandbox.chimoney.io/api-docs/#/Payouts/post_v0_2_payouts_interledger_wallet_address)

3. **Payment Receipt and Settlement:**
   - The receiver receives the payment via their Interledger Wallet Address, and the amount is credited and settled into their sub-account.

---

### Flow Using Chimoney Interledger enabled API:

**Problem Statement:**
- High fees and lack of transparency in donation use can discourage donors from contributing, especially internationally.

**Proposed Solution:**
Create a donation platform for secure and transparent donations, with real-time updates for donors.

### Flow Using Chimoney API:
1. **User and Organization Wallet Setup:**
   - When donors and charities sign up, each receives an Interledger-enabled sub-account and wallet address.
   - [Create Sub-account Endpoint](https://api-v2-sandbox.chimoney.io/api-docs/#/SubAccount/post_v0_2_sub_account_create)
   - [Issue Payment Pointer Endpoint](https://api-v2-sandbox.chimoney.io/api-docs/#/Account/post_v0_2_accounts_issue_wallet_address)

2. **Donation Process:**
   - The donation page displays a list of charities with donation buttons.
   - When a donor selects an organization and enters the donation amount, the platform retrieves the charity’s Interledger Wallet Address and processes the donation.
   - The **Payout to Interledger Wallet Address** endpoint is triggered to transfer the donation to the charity’s wallet.
   - [Payout to Interledger Wallet Address Endpoint](https://api-v2-sandbox.chimoney.io/api-docs/#/Payouts/post_v0_2_payouts_interledger_wallet_address)

3. **Settlement:**
   - The donation amount is settled in the charity’s sub-account.

---

Happy building!
