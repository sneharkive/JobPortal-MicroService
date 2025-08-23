package com.nextrole.common_dto.utility;

import java.time.LocalDateTime;

public class AccountDeletedData {

    public static String getAccountDeletedMessage(String name, LocalDateTime deletedAt, String userId) {
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
                        background-color: #d32f2f;
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
                        color: #d32f2f;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">Account Deleted</div>
                    <p>Hi <strong>%s</strong>,</p>
                    <p>We’re writing to let you know that your account has been <span class="highlight">deleted successfully</span>.</p>
                    
                    <div class="details">
                        <p><span class="highlight">User ID:</span> %s</p>
                        <p><span class="highlight">Deleted On:</span> %s</p>
                    </div>
                    
                    <p>If you deleted your account, no further action is required.</p>
                    <p>If you did <strong>not</strong> request this deletion, please contact our support team immediately.</p>
                    
                    <p>Thanks for being with us,<br>The NextRole Team</p>
                </div>
            </body>
            </html>
        """.formatted(name, userId, deletedAt);
    }

}

