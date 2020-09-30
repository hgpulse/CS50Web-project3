



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
  //set the style to the selected div
  //app.style.border = "thick solid #0000FF";
  
  fetch(`/emails/${mailbox}`)

  .then(response => response.json())
  .then(emails => {
    for (const mail of emails) {
      let listItem = document.createElement('div');
      listItem.addEventListener('click', function() {
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
      console.log(`archive : ${listItem.archived}`);
      console.log(`read : ${listItem.read}`);
      // == undefined
      if (listItem.read == null) {
        listItem.style.backgroundColor = "white";
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

    
      const mailDiv = document.createElement('div');
      mailDiv.setAttribute("id", "mail");
      let title = document.createElement('h4');

      title.appendChild(
        document.createElement('italic')
      ).textContent = 
      title.append(
        ` ${
          email.sender
        } sent to 
        ${email.recipients}
        ${email.subject} at ${email.timestamp}`
      );

      //set the style for each element
      title.style.border = "thick solid #0000FF";
      title.style.padding = "25px";
      title.style.margin = "5px";
      console.log(`archive : ${title.archived}`);
      console.log(`read : ${title.read}`);

      let body = document.createElement('p');
      body.appendChild(
        document.createElement('italic')
      ).textContent = ` Body: ${email.body}`;
      body.style.border = "thick solid #0000FF";
      body.style.padding = "25px";
      body.style.margin = "5px";
      // == undefined
      
      app.appendChild(title);
      app.appendChild(body);
    

    // ... do something else with email ...
  });

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


