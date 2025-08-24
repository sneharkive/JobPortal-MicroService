const formateDate = (dateString:string) => {
  const date = new Date(dateString);
  const options = { year: 'numeric' as const, month: 'short' as const };
  return date.toLocaleDateString('en-US', options);
}

function timeAgo(inputTime:string) {
    const time = new Date(inputTime);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - time.getTime()) / 1000);

    if (isNaN(seconds)) return "Invalid date";

    const intervals = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
    };

    if (seconds < 5) return "just now";
    if (seconds < 60) return `${seconds} seconds ago`;

    for (const [unit, value] of Object.entries(intervals)) {
        const count = Math.floor(seconds / value);
        if (count >= 1) {
            if (unit === "day" && count === 1) return "yesterday";
            return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
        }
    }
}


  const getBase64 = (file:any) => {
    return new Promise ((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
  }


  const formatInterviewDateTime = (date: Date | null): string => {
  if (!date || isNaN(date.getTime())) return "";

  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};


const openBase64InNewTab = (base64Data: string) => {
  try {
    const cleanedBase64 = base64Data.split(",").pop() || base64Data;
    const byteCharacters = atob(cleanedBase64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" }); // ✅ Ensure MIME type is correct
    const blobUrl = URL.createObjectURL(blob);

    // Open in new tab
    const newTab = window.open(blobUrl, "_blank");
    if (!newTab) {
      alert("Popup blocked! Please allow popups for this site.");
    }
  } catch (error) {
    console.error("Failed to open PDF:", error);
  }
};


export {formateDate, timeAgo, getBase64, formatInterviewDateTime, openBase64InNewTab};