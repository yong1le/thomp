"use client";

import { autoSignIn, confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ConfirmPage = () => {
  // The signin/signup page sets username in session storage. If it is not here,
  // it means we shouldn't be on this page.
  const { push } = useRouter();
  useEffect(() => {
    if (!sessionStorage.getItem("username")) {
      push("/");
    }
  }, []);

  const tag = useRef(null);
  const confirmation = useRef(null);

  const [resendEnabled, setResendEnabled] = useState(true);
  const [countDown, setCountdown] = useState(60);

  async function handleSignUpConfirmation(confirmationCode) {
    const username = sessionStorage.getItem("username");
    try {
      const { userId, nextStep } = await confirmSignUp({
        username,
        confirmationCode,
      });

      if (
        nextStep.signUpStep === "DONE" ||
        nextStep.signUpStep === "COMPLETE_AUTO_SIGN_IN"
      ) {
        // TODO: Store information in db
        sessionStorage.removeItem("username");
        await autoSignIn();
        push("/");
      }
    } catch (e) {
      sessionStorage.removeItem("username");
      console.log(e);
    }
  }

  async function resendConfirmationCode() {
    const username = sessionStorage.getItem("username");
    try {
      await resendSignUpCode({ username });
      tag.current.innerHTML =
        "Confirmation code sent. Please check your inbox.";

      // Disable link for 60 seconds
      setResendEnabled(false);
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(countdownInterval);
            setResendEnabled(true);
            return 60;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <form
        className="flex flex-col"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSignUpConfirmation(confirmation.current.value);
        }}
      >
        <h2 className="text-2xl self-center mb-4" ref={tag}>
          Confirmation Code
        </h2>
        <input
          className="text-lg mb-4 py-2 px-3 border border-gray-300 rounded"
          type="text"
          name="confirmation"
          ref={confirmation}
          placeholder="Confirmation Code"
        />
        <input
          className="self-center cursor-pointer bg-gray-200 p-3 rounded"
          type="submit"
          value="Sign In"
        />
        {resendEnabled ? (
          <p
            onClick={async () => await resendConfirmationCode()}
            className="mt-3 text-sm self-center cursor-pointer hover:text-gray-400"
          >
            Resend confirmation code
          </p>
        ) : (
          <p className="mt-3 text-sm self-center text-gray-400">
            Resend again in {countDown} seconds
          </p>
        )}
      </form>
    </div>
  );
};

export default ConfirmPage;
