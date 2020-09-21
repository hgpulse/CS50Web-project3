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

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  //console.log(mailbox);
  
  fetch(`/emails/${mailbox}`)

  .then(response => response.json())
  .then(emails => {
    // Print emails
    //console.log(emails);
    //Do something with emails ...
    
      emails.forEach(element => {
        
        console.log(element)
      });
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

