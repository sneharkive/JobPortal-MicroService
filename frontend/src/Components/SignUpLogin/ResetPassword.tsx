import {
  Button,
  Modal,
  PasswordInput,
  PinInput,
  rem,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import {  sendOtp, verifyOtp } from "../../Service/AuthService";
import { changePass } from "../../Service/UserService";
import { signupValidation } from "../../Service/FormValidation";
import { IconLock } from "@tabler/icons-react";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../Service/NotificationService";
import { useInterval } from "@mantine/hooks";

const ResetPassword = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [resendLoader, setResendLoader] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => {
    if (seconds === 0) {
      setResendLoader(false);
      setSeconds(60);
      interval.stop();
    }
    else setSeconds((s) => s - 1);
  }, 1000);

  const handleSendOtp = () => {
    setOtpSending(true);
    sendOtp(email)
      .then((res) => {
        console.log(res);
        SuccessNotification(
          "OTP Sent Successfully",
          "Enter OTP to reset password."
        );
        setOtpSent(true);
        setOtpSending(false);
        setResendLoader(true);
        interval.start();
      })
      .catch((error) => {
        setOtpSending(false);
        console.log(error);
        ErrorNotification(
          "Error Sending OTP",
          error.response.data.errorMessage
        );
      });
  };

  const handleVerifyOtp = (otp: string) => {
    verifyOtp(email, otp)
      .then((res) => {
        setVerified(true);
        SuccessNotification("OTP Verified", "You can now reset your password.");
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        ErrorNotification(
          "Error Verifying OTP",
          error.response.data.errorMessage
        );
      });
  };

  const changeEmail = () => {
    setOtpSent(false);
    setEmail("");
    setResendLoader(false);
    setSeconds(60);
    setVerified(false);
    interval.stop();
    setOtpSending(false);
  };

  const resendOtp = () => {
    if(resendLoader) return;
    handleSendOtp();
  };

  const handleResetPassword = () => {
    changePass(email, password)
      .then((res) => {
        SuccessNotification(
          "Password Changed Successfully",
          "You can now login with your new password."
        );
        props.close();
      })
      .catch((error) => {
        console.log(error);
        ErrorNotification(
          "Error Changing Password",
          error.response.data.errorMessage
        );
      });
    setEmail("");
  };

  return (
    <Modal
      opened={props.opened}
      onClose={props.close}
      title="Reset Password"
      // centered
    >
      <div className="flex flex-col gap-8">
        <TextInput
          label="Email"
          placeholder="Your Email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          rightSection={
            <Button
              loading={otpSending && !otpSent}
              onClick={handleSendOtp}
              color="#FFD230"
              autoContrast
              variant="filled"
              disabled={!email || otpSent}
            >
              Get OTP
            </Button>
          }
          rightSectionWidth="xl"
        />

        {otpSent && !verified && (
          <PinInput
            onComplete={handleVerifyOtp}
            type="number"
            length={6}
            className="mx-auto"
            size="md"
            gap="lg"
          />
        )}
        {otpSent && !verified && (
          <div className="flex gap-4 justify-center">
            <Button
              fullWidth
              loading={otpSending}
              color="#FFD230"
              onClick={resendOtp}
              autoContrast
              variant="light"
            >
              {resendLoader ? seconds :"Resend"}
            </Button>
            <Button
              fullWidth
              color="#FFD230"
              onClick={changeEmail}
              autoContrast
              variant="filled"
            >
              Change Email
            </Button>
          </div>
        )}

        {verified && (
          <div className="flex flex-col gap-4">
            <PasswordInput
              error={passError}
              onChange={(e) => {
                setPassword(e.target.value);
                setPassError(signupValidation("password", e.target.value));
              }}
              name="password"
              value={password}
              withAsterisk
              leftSection={
                <IconLock style={{ width: rem(16), height: rem(16) }} />
              }
              label="Password"
              placeholder="Password"
            />

            <Button
              fullWidth
              autoContrast
              variant="filled"
              color="yellow.5"
              onClick={handleResetPassword}
            >
              Change Password
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ResetPassword;
