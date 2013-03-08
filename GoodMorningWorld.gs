// ============================================================
// GoodMorningWorld by ModMonstR.com
// AS-IS, NO WARRANTY
// This work is licensed under a Creative Commons Attribution 3.0 Unported License
// http://creativecommons.org/licenses/by/3.0/
// ============================================================
// Overview:
// 1. Gets all current day's Calendar Events from the Default Calendar
// 2. Saves an overview of the events in a Google Document with current date embedded in the filename
// 3. Shortens the URL of the Google Document
// 4. Emails the shortened URL to the user that ran this script
//
// For more information, see the companion presentation:
// http://goo.gl/2dGhW
// ============================================================
function goodMorningWorld() {
 //Prepare Date
 var today = new Date();
 var todayString = today.getFullYear().toString() + lPad(1+today.getMonth())+lPad(today.getDate());
 //Get today's events from the default Calendar
 var cal = CalendarApp.getDefaultCalendar().getEventsForDay(today);
 //Create a Google Document, filename starts with the current date
 var doc = DocumentApp.create(todayString+'-Good Morning');
 //Header part of the document
 doc.appendParagraph("Good Morning World");
 doc.appendParagraph("Below are the activities for today, " + today);
 doc.appendHorizontalRule()
 //Iterate through the Calendar and write to the Document
 var i = 0;
 for(i = 0;i<cal.length;i++){
 doc.appendParagraph(basicTime(cal[i].getStartTime()) + ' to ' + basicTime(cal[i].getEndTime()) + ' - ' + cal[i].getTitle() + ' in ' + cal[i].getLocation());
 }
 //Save and close the Document
 doc.saveAndClose();
 // Get the URL of the document
 var url = doc.getUrl();
 // Shorten the URL
 var toShorten = UrlShortener.newUrl().setLongUrl(url)
 var shortUrl = UrlShortener.Url.insert(toShorten);
// Get the email address of the active user - that's you
 var emailAddress = Session.getActiveUser().getEmail();
 // Send yourself an email with a link to the document
 GmailApp.sendEmail(emailAddress,
 'Today\'s Calendar Events',
 'Attached is a link to Document containing today\'s activities ' +
 shortUrl.getId());
}
function basicTime(t){
 var output = lPad(t.getHours()) + ":" + lPad(t.getMinutes());
 return output;
}
function lPad(i){
 return i<10?"0"+i:i;
 }