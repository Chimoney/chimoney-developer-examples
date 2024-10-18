if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const CHIMONEY_API = "https://api-v2-sandbox.chimoney.io/";
const API_KEY = process.env.API_KEY || "0000";

class ChimoneyControlller {
  /**
   * Initiates a payment with the specified details.
   * 
   * @param {Object} req - The request object.
   * @param {Object} req.body - The request body containing payment details.
   * @param {number} req.body.valueInUSD - The value of the payment in USD.
   * @param {Object} req.body.meta - Additional metadata for the payment.
   * @param {string} req.body.payerEmail - The email address of the payer.
   * @param {string} req.body.redirect_url - The URL to redirect to after payment.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - Returns a JSON response indicating the status of the payment initiation.
   */
  static async initiatePayment(req, res) {
    try {
      const { valueInUSD, meta, payerEmail, redirect_url } = req.body;

      const response = await fetch(`${CHIMONEY_API}v0.2/payment/initiate`, {
        method: "POST",
        headers: {
          "X-API-KEY": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          valueInUSD,
          meta,
          payerEmail,
          redirect_url,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          throw err;
        });

      if (response.status === "success") {
        return res.status(200).json({
          status: "success",
          message: "payment initated successful",
          data: response?.data,
          code: 200,
        });
      } else {
        return res.status(400).json({
          status: "failed",
          message: "payment initation failed",
          data: response?.data,
          code: 400,
        });
      }
    } catch (error) {
      console.log({ error });
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  /**
   * Verifies the payment status using the provided payment ID.
   * 
   * @param {Object} req - The request object.
   * @param {Object} req.body - The request body containing the payment ID.
   * @param {string} req.body.id - The payment ID to verify.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - Returns a JSON response indicating the status of the payment verification.
   */
  static async verifyPayment(req, res) {
    const { id } = req.body;

    try {
      const response = await fetch(`${CHIMONEY_API}v0.2/payment/verify`, {
        method: "POST",
        headers: {
          "X-API-KEY": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          throw err;
        });

      return res.status(200).json({
        status: "success",
        data: response?.data,
        code: 200,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  /**
   * Receives and processes webhooks from Chimoney for different events.
   * 
   * @param {Object} req - The request object.
   * @param {Object} req.body - The request body containing webhook data.
   * @param {string} req.body.eventType - The type of event triggered.
   * @param {string} req.body.issueID - The unique identifier for the issue.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - Returns a JSON response indicating the success of the webhook processing.
   */
  static async recieveWebhook(req, res) {
    try {

    // verify webhook coming from chimoney address
    console.log("body", req.body);
    const { eventType, issueID } = req.body;

    switch (eventType) {
      case "chimoney.payment.completed":
        // Event is sent when Chimoney Wallet Payment is confirmed
        console.log("Payment completed ", "ISSUE ID", issueID);
        break;

      case "charge.card.completed":
        // Event is sent when Card Payment is confirmed
        console.log("Card Payment Completed ", "ISSUE ID", issueID);
        break;

      case "payout.wallet.completed":
        /// Event is sent after Wallet is funded which occurs after
      console.log("Payout from wallet completed ", "ISSUE ID", issueID);
      break;

      case "chimoney.payment.failed":
        // Event is sent when: Card Payment fails: You will likely never receive this event as the Card Processor handles errors in real-time and shows it to the user.
        console.log("Payment failed ", "ISSUE ID", issueID);
        break;

      case "chimoney.redeem.completed":
        // Event is sent when redeem is completed after paying with chimoney
        console.log("Redeem Completed ", "ISSUE ID", issueID);
       break;

      default:
        break;
    }

    return res.status(200).json({
      status: "success",
      code: 200,
    });

  } catch (error) {
    return res.status(200).json({
      message: "failed"
    });
  }
  }
}

module.exports = ChimoneyControlller;