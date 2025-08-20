package com.nextrole.profileservice.dto;

public enum MediaContentType {
    IMAGE_JPEG("image/jpeg"),
    IMAGE_PNG("image/png"),
    PDF("application/pdf");

    private final String mimeType;

    MediaContentType(String mimeType) {
        this.mimeType = mimeType;
    }

    public String getMimeType() {
        return mimeType;
    }
}
