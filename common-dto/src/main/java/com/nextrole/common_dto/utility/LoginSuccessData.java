package com.nextrole.common_dto.utility;

import java.time.LocalDateTime;

public class LoginSuccessData {

    public static String getLoginSuccessMessage(String name, String userId, String email, LocalDateTime loginAt) {
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
                        background-color: #1976d2;
                        color: white;
                        text-align: center;
                        padding: 15px 0;
                        font-size: 22px;
                        font-weight: bold;
                        border-top-left-radius: 8px;
                        border-top-right-radius: 8px;
                    }
                    p {
                        font-size: 15px;
                        color: #333333;
                        line-height: 1.6;
                    }
                    .details {
                        margin: 20px 0;
                        padding: 15px;
                        background-color: #f9f9f9;
                        border-radius: 6px;
                        font-size: 15px;
                        color: #333333;
                        line-height: 1.6;
                    }
                    .highlight {
                        color: #1976d2;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">Login Successful</div>
                    <p>Hi <strong>%s</strong>,</p>
                    <p>You have successfully logged into your account. Here are your account details:</p>
                    
                    <div class="details">
                        <p><span class="highlight">User ID:</span> %s</p>
                        <p><span class="highlight">Email:</span> %s</p>
                        <p><span class="highlight">Login Time:</span> %s</p>
                    </div>
                    
                    <p>If this was you, no further action is required.</p>
                    <p>If you did <strong>not</strong> log in, please <strong>reset your password immediately</strong> or contact our support team.</p>
                    
                    <p>Stay secure,<br>The NextRole Team</p>
                </div>
            </body>
            </html>
        """.formatted(name, userId, email, loginAt);
    }

}
