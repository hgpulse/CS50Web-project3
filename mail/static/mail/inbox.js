



document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  
  // Send mail: Select the form om submit
  //document.querySelector('form').onsubmit = send_mail;

  // By default, load the inbox
  load_mailbox('inbox');
 
})

function showPage(page) {
  document.querySelectorAll('div').forEach(div => {
    div.style.display = 'none';

  })

  document.querySelector(`#${page}`).style.display = 'block';
}


function compose_email() {
  
  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  

  
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  
  
  // Show the mailbox and hide other views
  console.log(mailbox)
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#mail-view').style.display = 'none';
  document.querySelector(`#emails-view`).style.display = 'block';

  // Show the mailbox name
  document.querySelector(`#emails-view`).innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
 
  //select the div output
  const app = document.querySelector(`#emails-view`);
  
  

  
  fetch(`/emails/${mailbox}`)

  .then(response => response.json())
  .then(emails => {
    for (const mail of emails) {
      //create the Div for mail preview
      let listItem = document.createElement('div');
      listItem.id = 'mail';
      // create archived Button
      var archiveBtn = document.createElement('button');
      archiveBtn.id = 'archiveBtn';
      
      //add button to each mail view
      
      if (mailbox == "inbox"){
        // Clean innerHTML on click
        

        archiveBtn.innerHTML = "Archive";
        archiveBtn.className = "btn btn-success";
        app.appendChild(archiveBtn);
        //listItem.append(archiveBtn);
        //add onclick event on archive button
        archiveBtn.addEventListener('click', function() {
        let archive = true;
        archive_mail(mail.id, archive)
        console.log('This button has been clicked!')
        });
        console.log("this was inbox");
        
      } else if (mailbox == "archive") {

        archiveBtn.innerHTML = "Restore";
        archiveBtn.className = "btn btn-warning";
        app.appendChild(archiveBtn)
        //listItem.append(archiveBtn);
        //add onclick event on archive button
        archiveBtn.addEventListener('click', function() {
        let restore = false;
        archive_mail(mail.id, restore)
        console.log('This button has been clicked!')
      });
        console.log("this was archived");
       
      } else {
        console.log("no button")
      }
      
      

      
      //add Onclick event on DIV
      listItem.addEventListener('click', function() {
        
        // Clean innerHTML on click
        const myNode = document.getElementById("mail-view");
        myNode.innerHTML = '';
        
      load_mail(mail.id)
      
      console.log(`element ID: ${mail.id} has been clicked!`)
      });
      listItem.appendChild(
        document.createElement('strong')
      ).textContent = mail.subject;
      listItem.append(
        ` send by ${
          mail.sender
        }`
      );
      listItem.appendChild(
        document.createElement('strong')
      ).textContent = ` at ${mail.timestamp}`;
      //set the style for each element
      listItem.style.border = "thick solid #0000FF";
      listItem.style.padding = "25px";
      listItem.style.margin = "5px";
      console.log(`mail ID : ${mail.id}`);
      console.log(`archive : ${mail.archived}`);
      console.log(`read : ${mail.read}`);
      // == undefined
      if (mail.read == true) {
        listItem.style.backgroundColor = "grey";
      }
      
      app.appendChild(listItem);
      
    }

    
  })
  
  .catch(console.error);
  
  return false
}

function load_mail(id) {

  //hide and show mail-view
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector(`#emails-view`).style.display = 'none';
  document.querySelector('#mail-view').style.display = 'block';

  //select the div output
  const app = document.querySelector(`#mail-view`);

  //get the email
  fetch(`/emails/${id}`)
  .then(response => response.json())
  .then(email => {
    // Print email
    console.log(email);
    //how to convert JSON response to javascript objct ?
    
    var mail = document.createElement('div');
    mail.id = 'mail-view-style';
    // create archived Button
    var replyBtn = document.createElement('button');
    replyBtn.id = 'replyBtn';
    replyBtn.className = "btn btn-success";
    replyBtn.innerHTML = "Reply";
    // add BTn to main div mail-view
    mail.appendChild(replyBtn)
    
    //Add click event for
    //add onclick event on archive button
    replyBtn.addEventListener('click', function() {
      // Clean innerHTML on click for mail-view
      const myNode = document.getElementById("mail-view");
      myNode.innerHTML = '';
      
      
      reply_email(id);
      console.log('Fire Reply view')
    });


    // set id to div 
    //mail.setAttribute("id", `${id}`);
    mail.appendChild(
        document.createElement('italic')
      ).textContent = 
      mail.append(
        ` FROM: ${email.sender}
          TO: ${email.recipients}
        Subject: ${email.subject} 
        Timestamp: ${email.timestamp}
        Body: ${email.body}`
      );

      //set the style for each element
      
      console.log(`archive : ${mail.archived}`);
      console.log(`read : ${mail.read}`);

      
      
      // == undefined
      
      app.appendChild(mail);
      
    // ... do something else with email ...
  });
  
  //mark email as read
  fetch(`/emails/${id}`, {
    method: 'PUT',
    body: JSON.stringify({read: true})
  })
  return true
  
}



function send_mail() {
  
  
  const recep = document.querySelector('#compose-recipients').value;
  const sub = document.querySelector('#compose-subject').value;
  const bod = document.querySelector('#compose-body').value;
  
  //alert(`Send mail, to ${recep} for ${sub} message:${bod}` )
  //store javascript data in a JSON 
  var mail = {recipients: recep, subject: sub, body: bod};
  
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify(mail)
  })
  .then(response => response.json())
  .then(result => {
      // Print result
      console.log(result);
  });
  // Show compose view and hide other views
  load_mailbox('sent')
  return false;
  
}

function archive_mail(id, status) {

  fetch(`/emails/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
        archived: status
    })
  })
  load_mailbox('inbox')
  return true;
}

function reply_email(id) {
  
  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#mail-view').style.display = 'none';
  
  
  document.querySelector('#compose-view').style.display = 'block';
  
  //select the div output
  const app = document.querySelector(`#compose-view`);
  
  //Change the Title of the page
  title = app.querySelector('h3');
  title.innerHTML = 'Reply Email';

  console.log(`Reply from this ID: ${id}`)



  //get Email data
  fetch(`/emails/${id}`)
  .then(response => response.json())
  .then(email => {
    //Pre-fill recepient
    var sender = document.querySelector('#compose-recipients');
    sender.value = email.sender;
    //Pre-fill subject
    var subject = document.querySelector('#compose-subject')
    console.log(`Subject Value:  ${email.subject}`)
    var subjectCheck = email.subject;
    var resultRe = subjectCheck.includes("RE: ")
    console.log(resultRe)
    //check if subject contain RE: 
    if (resultRe) {
      subject.value = `${email.subject}`;
    }
    else {
      subject.value = `RE: ${email.subject}`;
    }
    console.log(`Subject Value:  ${email.subject}`)
    //Pre-fill Body
    var body = document.querySelector('#compose-body')
    body.value = ` 
    
    On ${email.timestamp} ${email.sender} wrote:
    ${email.body}`;
  
  // Print email
  console.log(email);
  
  // ... do something else with email ...
  });

  // Clear out composition fields
//   document.querySelector('#compose-recipients').value = '';
//   document.querySelector('#compose-subject').value = '';
//   document.querySelector('#compose-body').value = '';
}