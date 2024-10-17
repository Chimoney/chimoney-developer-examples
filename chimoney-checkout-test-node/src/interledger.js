const fetch = require("node-fetch");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const CHIMONEY_API = "https://api-v2-sandbox.chimoney.io/";
const API_KEY = process.env.API_KEY || "0000";

class InterledgerController {
  /**
 * Creates an Interledger-enabled sub-accounts in Chimoney.
 * 
 * @async
 * @function createSubaccount
 * @param {Object} params - The parameters for creating a subaccount.
 * @param {string} params.name - The full name of the user.
 * @param {string} params.email - The email address of the user, must be unique.
 * @param {string} params.firstName - The first name of the user.
 * @param {string} params.lastName - The last name of the user.
 * @param {string} params.phoneNumber - The phone number of the user, must be a valid phone number.
 * @param {Object} [params.meta={}] - Additional metadata for the subaccount.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the subaccount creation fails.
 */
 createSubaccount = async ({ name, email, firstName, lastName, phoneNumber, meta = {} }) => {
  try {
    const response = await fetch(`${CHIMONEY_API}v0.2/sub_account/create`, {
      method: "POST",
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        firstName,
        lastName,
        phoneNumber,
        meta
      })
    });

    const data = await response.json();
    if (response.ok) {
        return res.status(200).json({
          status: "success",
          message: "Subaccount created successfully",
          data: response?.data,
          code: 200,
        });
    } else {
      return res.status(400).json({
          status: "failed",
          message: "Subaccount creation failed",
          data: response?.data,
          code: 400,
        });
    }
  } catch (error) {
    return res.status(400).json({
        message: error.message,
      });
  }
};


/**
 * Issues an Interledger wallet address (ILP address) and payment pointer for the specified user.
 * 
 * @async
 * @function issueInterledgerWalletAddress
 * @param {Object} params - The parameters for issuing the Interledger wallet address.
 * @param {string} params.userID - The user ID for whom the wallet address is being issued.
 * @param {string} params.ilpUsername - The Interledger Protocol (ILP) username for the wallet address.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if issuing the wallet address fails.
 */
  issueInterledgerWalletAddress = async ({ userID, ilpUsername }) => {
  try {
    const response = await fetch(`${CHIMONEY_API}v0.2/accounts/issue_wallet_address`, {
      method: "POST",
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userID,
        ilpUsername
      })
    });

    const data = await response.json();
      if (response.ok) {
         return res.status(200).json({
          status: "success",
          message: "Interledger wallet address issued successfully:",
          data: response?.data,
          code: 200,
        });
    } else {
           return res.status(400).json({
          status: "failed",
          message:"Failed to issue Interledger wallet address:",
          data: response?.data,
          code: 400,
        });
    }
  } catch (error) {
     return res.status(400).json({
        message: error.message,
      });
  }
};

}

module.exports = InterledgerController;
