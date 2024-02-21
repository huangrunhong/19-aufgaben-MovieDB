import { useState } from "react";
import { useParams } from "react-router-dom";

import "./VerifyEmail.scss";

const VerifyEmail = () => {
  const [sixDigitCode, setSixDigitCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { userId } = useParams();
  console.log(userId);

  async function verifyEmail(event) {
    event.preventDefault();
    if (!sixDigitCode) {
      setErrorMessage(
        "please enter your six digit code, we have sent you an email"
      );
      return;
    }
    fetch("http://localhost:9999/users/verifyEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, sixDigitCode }),
    })
      .then((res) => res.json())
      .then(({ success, result, message }) => {
        if (!success)
          return setErrorMessage(message || "Email verification failed");
        console.log({ result });
        setErrorMessage("");
        setSuccessMessage(
          "verification successful, you can now login to your account"
        );
      });
  }
  async function resentEmail() {
    fetch("http://localhost:9999/users/resentEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then(({ success, result, message }) => {
        if (!success) return setErrorMessage(message || "Email resent failed");
        setErrorMessage("Email was resent, please check your mail");
      });
  }

  return (
    <section className="verifyEmail">
      <article>
        {" "}
        <h1>Verify your Email</h1>
        <h4>
          please enter the 6-digit code we sent to your email to enable login
        </h4>
        <div>
          <form>
            <input
              type="text"
              placeholder="enter 6-digit verification code"
              value={sixDigitCode}
              onChange={(event) => setSixDigitCode(event.target.value)}
            />
          </form>
          <button onClick={verifyEmail}>Verify Email</button>
          {successMessage ? (
            <p style={{ color: "green" }}>{successMessage}</p>
          ) : (
            <p style={{ color: "orange" }}> {errorMessage} </p>
          )}
          {/* <p> {errorMessage} </p>
          <p>{successMessage} </p> */}
        </div>
        <button onClick={resentEmail}>Resent Email</button>
      </article>
    </section>
  );
};

export default VerifyEmail;
