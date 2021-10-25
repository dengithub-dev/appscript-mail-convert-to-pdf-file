 //spreadsheet id and sheet name
  var ss = SpreadsheetApp.openById("your_spreadsheet_id").getSheetByName("name_of_your_sheet");
  //provide string for Gmail search
  var thread = GmailApp.search("is:unread in:inbox");
  for (var x = 0; x < thread.length; x++) {
    var messages = thread[x].getMessages();
    var subject = thread[x];
    var pdf_format;
   
    for (var y = 0; y < messages.length; y++) {
      //remove the comment if you want to get the pdf file attached with the mail
      //var attach = messages[y].getAttachments();
      var body = messages[y].getBody();
      var sender = messages[y].getFrom();
      var to = messages[y].getTo();
      
      //pdf format
      pdf_format = "Sender: " + sender + "<br>";
      pdf_format += "Recipient: " + to + "<br>";
      pdf_format += body;
      
      //get folder ID for the destination of pdf file
      var folder = DriveApp.getFolderById('your_folder_id');
      var filename = messages[y].getSubject();
      
      //convert the search mail to pdf
      var tempFile = DriveApp.createFile("temp.html", pdf_format, "text/html");
      folder.createFile(tempFile.getAs("application/pdf")).setName(filename + ".pdf");
      tempFile.setTrashed(true);
      
      //get attachment file and save them too in the respective folder
      //for (var att = 0; att < attach.length; att++) {
        //folder.createFile(attach[att]).setName(filename + " [attach file]");    
      //}
      
      //get pdft converted file url
      var pdf_url = tempFile.getUrl();
      //append data of the converted mail to pdf
      ss.appendRow([new Date(), filename, to, sender, pdf_url]);
    }
  }
