package com.nextrole.common_dto.utility;

import java.time.LocalDateTime;

public class PasswordChangedData {

    public static String getPasswordChangedMessage(String name, LocalDateTime changedAt, String userId) {
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
                        background-color: #2e7d32;
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
                        color: #2e7d32;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">Password Changed Successfully</div>
                    <p>Hi <strong>%s</strong>,</p>
                    <p>Your password was changed successfully. Here are the details:</p>
                    
                    <div class="details">
                        <p><span class="highlight">Changed On:</span> %s</p>
                        <p><span class="highlight">UserID:</span> %s</p>
                    </div>
                    
                    <p>If you did not make this change, please <strong>reset your password immediately</strong> or contact our support team.</p>
                    
                    <p>Stay safe,<br>The NextRole Team</p>
                </div>
            </body>
            </html>
        """.formatted(name, changedAt, userId);
    }

}
