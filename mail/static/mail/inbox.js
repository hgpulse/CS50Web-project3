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
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#mailbox-view').style.display = 'none';

  
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
 
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#mailbox-view').style.display = 'block';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
 
  //select the div output
  const app = document.querySelector('#mailbox-view');
  //set the style to the selected div
  //app.style.border = "thick solid #0000FF";
  
  fetch(`/emails/${mailbox}`)

  .then(response => response.json())
  .then(emails => {
    for (const mail of emails) {
      let listItem = document.createElement('div');
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
      console.log(listItem.read);
      if (listItem.read == false) {
        listItem.style.backgroundColor = "red";
      } 
      app.appendChild(listItem);
    }
  })
  .catch(console.error);
  return false
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

