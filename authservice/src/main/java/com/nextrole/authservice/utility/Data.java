package com.nextrole.authservice.utility;

public class Data {

public static String getMessageBody(String otp, String name) {
    return """
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f7;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    background-color: #ffffff;
                    max-width: 600px;
                    margin: 40px auto;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 30px;
                }
                .header {
                    background-color: #4a90e2;
                    color: white;
                    text-align: center;
                    padding: 15px 0;
                    font-size: 20px;
                    font-weight: bold;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }
                .otp {
                    font-size: 28px;
                    font-weight: bold;
                    letter-spacing: 6px;
                    color: #4a90e2;
                    text-align: center;
                    margin: 20px 0;
                }
                p {
                    font-size: 15px;
                    color: #333333;
                    line-height: 1.6;
                }
                .highlight {
                    color: #6a1b9a;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">OTP Verification</div>
                <p>Hi <strong>%s</strong>,</p>
                <p class="highlight">Your One-Time Password (OTP) for verifying your action is:</p>
                <div class="otp">%s</div>
                <p>This OTP is valid for <strong>10 minutes</strong>. Please do not share this code with anyone.</p>
                <p class="highlight">If you did not request this, please ignore this email or contact support immediately.</p>
                <p>Thanks,<br>The NextRole Team</p>
            </div>
        </body>
        </html>
    """.formatted(name, otp);
}

}