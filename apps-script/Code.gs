/**
 * BM TechX - Google Apps Script Lead Capture Webhook
 *
 * HOW TO DEPLOY:
 * 1. Open Google Sheets (https://sheets.new) and name it "BM TechX - Web Leads".
 * 2. In Google Sheets, click: Extensions > Apps Script.
 * 3. Replace all code in the Apps Script editor with this file.
 * 4. Click: Deploy > New deployment.
 * 5. Select type: Web app.
 * 6. Configuration:
 *    - Description: "BM TechX Lead Webhook v1"
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (allows website to POST leads without login)
 * 7. Click "Deploy", review permissions, and copy the Web App URL:
 *    (e.g., https://script.google.com/macros/s/AKfycbx.../exec)
 * 8. Paste this URL into your website's .env file:
 *    VITE_LEAD_ENDPOINT=https://script.google.com/macros/s/AKfycbx.../exec
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var contents = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(contents);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // Auto-initialize header row if the sheet is blank
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Received At (IST)",
        "Submitted At (ISO)",
        "Client Name",
        "WhatsApp Phone",
        "Business / Brand Name",
        "Selected Service",
        "Project Requirements / Notes",
        "Lead Source Tag"
      ]);

      // Style header
      var headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#12141D");
      headerRange.setFontColor("#FFE600");
      sheet.setFrozenRows(1);
    }

    var now = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");

    sheet.appendRow([
      now,
      data.submittedAt || new Date().toISOString(),
      data.name || "",
      "'" + (data.phone || ""), // prepended apostrophe preserves leading 0 or +
      data.business || "Not specified",
      data.service || "General Inquiry",
      data.notes || "",
      data.source || "techx-v2-web-quote"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", received: now }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "online",
      service: "BM TechX Lead Capture Engine",
      message: "Ready to accept POST requests with JSON payload."
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
