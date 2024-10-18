const fetch = require("node-fetch");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const CHIMONEY_API = "https://api-v2-sandbox.chimoney.io/";
const API_KEY = process.env.API_KEY || "0000";

class InterledgerController {
  /**
   * Creates an Interledger-enabled sub-account in Chimoney.
   *
   * @async
   * @function createSubaccount
   * @param {Object} req - The request object.
   * @param {Object} req.body - The request body containing subaccount details.
   * @param {string} req.body.name - The full name of the user.
   * @param {string} req.body.email - The email address of the user, must be unique.
   * @param {string} req.body.firstName - The first name of the user.
   * @param {string} req.body.lastName - The last name of the user.
   * @param {string} req.body.phoneNumber - The phone number of the user, must be a valid phone number.
   * @param {Object} [req.body.meta={}] - Additional metadata for the subaccount.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - Returns a JSON response indicating the status of the subaccount creation.
   */
  static async createSubaccount(req, res) {
    try {
      const { name, email, firstName, lastName, phoneNumber, meta = {} } = req.body;

      const response = await fetch(`${CHIMONEY_API}v0.2/sub_account/create`, {
        method: "POST",
        headers: {
          "X-API-KEY": API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, firstName, lastName, phoneNumber, meta })
      });

      const data = await response.json();
      if (response.ok) {
        return res.status(200).json({
          status: "success",
          message: "Subaccount created successfully",
          data: data,
          code: 200
        });
      } else {
        return res.status(400).json({
          status: "failed",
          message: "Subaccount creation failed",
          data: data,
          code: 400
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }

  /**
   * Issues an Interledger wallet address (ILP address)  for the specified user.
   *
   * @async
   * @function issueInterledgerWalletAddress
   * @param {Object} req - The request object.
   * @param {Object} req.body - The request body containing wallet issuance details.
   * @param {string} req.body.userID - The user ID for whom the wallet address is being issued.
   * @param {string} req.body.ilpUsername - The Interledger Protocol (ILP) username for the wallet address.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - Returns a JSON response indicating the status of the wallet issuance.
   */
  static async issueInterledgerWalletAddress(req, res) {
    try {
      const { userID, ilpUsername } = req.body;

      const response = await fetch(`${CHIMONEY_API}v0.2/accounts/issue_wallet_address`, {
        method: "POST",
        headers: {
          "X-API-KEY": API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userID, ilpUsername })
      });

      const data = await response.json();
      if (response.ok) {
        return res.status(200).json({
          status: "success",
          message: "Interledger wallet address issued successfully",
          data: data,
          code: 200
        });
      } else {
        return res.status(400).json({
          status: "failed",
          message: "Failed to issue Interledger wallet address",
          data: data,
          code: 400
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }

  /**
   * Initiates a payout to an Interledger wallet address.
   *
   * @async
   * @function initiatePayout
   * @param {Object} req - The request object.
   * @param {Object} req.body - The request body containing payout details.
   * @param {string} req.body.subAccount - The subaccount identifier.
   * @param {boolean} req.body.turnOffNotification - Whether to turn off notifications for the payout.
   * @param {Array<Object>} req.body.interledgerWallets - An array of interledger wallet details.
   * @param {string} req.body.interledgerWallets[].interledgerWalletAddress - The Interledger wallet address (payment pointer).
   * @param {number} req.body.interledgerWallets[].valueInUSD - The amount to be paid in USD.
   * @param {string} req.body.interledgerWallets[].narration - A narration for the payout.
   * @param {string} req.body.interledgerWallets[].collectionPaymentIssueID - The unique identifier for the collection payment.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - Returns a JSON response indicating the status of the payout initiation.
   */
  static async initiatePayout(req, res) {
    try {
      const { subAccount, turnOffNotification, interledgerWallets } = req.body;

      const response = await fetch(`${CHIMONEY_API}v0.2/payouts/interledger-wallet-address`, {
        method: "POST",
        headers: {
          "X-API-KEY": API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ subAccount, turnOffNotification, interledgerWallets })
      });

      const data = await response.json();
      if (response.ok) {
        return res.status(200).json({
          status: "success",
          message: "Interledger payout initiated successfully",
          data: data,
          code: 200
        });
      } else {
        return res.status(400).json({
          status: "failed",
          message: "Interledger payout initiation failed",
          data: data,
          code: 400
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }
}

module.exports = InterledgerController;
