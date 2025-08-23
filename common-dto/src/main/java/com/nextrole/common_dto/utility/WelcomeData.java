package com.nextrole.common_dto.utility;

import java.time.LocalDateTime;

import com.nextrole.common_dto.dto.AccountType;

public class WelcomeData {

    public static String getWelcomeMessage(String name, LocalDateTime timestamp, String userId, AccountType accountType) {
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
                        background-color: #4caf50;
                        color: white;
                        text-align: center;
                        padding: 15px 0;
                        font-size: 22px;
                        font-weight: bold;
                        border-top-left-radius: 8px;
                        border-top-right-radius: 8px;
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
                        color: #2e7d32;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">Welcome to NextRole 🎉</div>
                    <p>Hi <strong>%s</strong>,</p>
                    <p>We’re excited to have you on board! Your account has been created successfully.</p>
                    
                    <div class="details">
                        <p><span class="highlight">User ID:</span> %s</p>
                        <p><span class="highlight">Account Type:</span> %s</p>
                        <p><span class="highlight">Created On:</span> %s</p>
                    </div>
                    
                    <p>You can now explore all the features available with your account.</p>
                    <p>If you need any help, feel free to reach out to our support team.</p>
                    
                    <p>Cheers,<br>The NextRole Team</p>
                </div>
            </body>
            </html>
        """.formatted(name, userId, accountType, timestamp);
    }

}
