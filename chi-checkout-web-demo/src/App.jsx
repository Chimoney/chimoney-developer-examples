import { useState } from "react";
import "./App.css";
import Check from "./assets/check.png";
const CHIMONEY_API = "http://localhost:3000/api/"; // start server from chimoney-test-node

function App() {
  const [valueInUSD, setValueInUSD] = useState(1);
  const [payerEmail, setPayerEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  let searchParams = new URLSearchParams(window.location.search);
  let isSuccess = searchParams.has("status");
  let issueID = searchParams.get("issueID");

  const payWithChimoney = async () => {
    setIsSubmitted(true);
    try {
      const response = await fetch(`${CHIMONEY_API}pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          valueInUSD,
          meta: {},
          payerEmail,
          redirect_url: "http://localhost:5173", /// Update Redirect URL
        }),
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          throw err;
        });

      if (response.code === 200 && response.status === "success") {
        setIsSubmitted(false);
        // redirect to payment link

        window.location.href = response?.data?.paymentLink;
      }
    } catch (error) {
      // set payment failed state
    }
  };
  return (
    <>
      {isSuccess ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: 'center',
            gap: "1rem",
            width: 500,
          }}
        >
          <strong> Payment Successful</strong>
          <strong> ISSUE ID : {issueID} </strong>

          <img
            style={{
              width: "100px",
            }}
            src={Check}
            alt="success"
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: 500,
          }}
        >
          <input
            type="number"
            placeholder="Amount in USD"
            value={valueInUSD}
            onChange={(e) => setValueInUSD(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={payerEmail}
            onChange={(e) => setPayerEmail(e.target.value)}
          />

          <button disabled={!payerEmail} onClick={payWithChimoney}>
            {isSubmitted ? "Processing...." : "Pay With Chimoney"}
          </button>
        </div>
      )}
    </>
  );
}

export default App;
