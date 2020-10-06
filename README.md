# CS50Web-project3
Design a front-end for an email client that makes API calls to send and receive emails.

<a data-id="" href="#specification">Specification</a></h2>

<p>Using JavaScript, HTML, and CSS, complete the implementation of your single-page-app email client. You must fulfill the following requirements:</p>

<ul class="fa-ul">
  <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span><strong>Send Mail</strong>: When a user submits the email composition form, add JavaScript code to actually send the email.
    <ul class="fa-ul">
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>You’ll likely want to make a <code class="highlighter-rouge">POST</code> request to <code class="highlighter-rouge">/emails</code>, passing in values for <code class="highlighter-rouge">recipients</code>, <code class="highlighter-rouge">subject</code>, and <code class="highlighter-rouge">body</code>.</li>
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>Once the email has been sent, load the user’s sent mailbox.</li>
    </ul>
  </li>
  <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span><strong>Mailbox</strong>: When a user visits their Inbox, Sent mailbox, or Archive, load the appropriate mailbox.
    <ul class="fa-ul">
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>You’ll likely want to make a <code class="highlighter-rouge">GET</code> request to <code class="highlighter-rouge">/emails/&lt;mailbox&gt;</code> to request the emails for a particular mailbox.</li>
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>When a mailbox is visited, the application should first query the API for the latest emails in that mailbox.</li>
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>When a mailbox is visited, the name of the mailbox should appear at the top of the page (this part is done for you).</li>
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>Each email should then be rendered in its own box (e.g. as a <code class="highlighter-rouge">&lt;div&gt;</code> with a border) that displays who the email is from, what the subject line is, and the timestamp of the email.</li>
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>If the email is unread, it should appear with a white background. If the email has been read, it should appear with a gray background.</li>
    </ul>
  </li>
  <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span><strong>View Email</strong>: When a user clicks on an email, the user should be taken to a view where they see the content of that email.
    <ul class="fa-ul">
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>You’ll likely want to make a <code class="highlighter-rouge">GET</code> request to <code class="highlighter-rouge">/emails/&lt;email_id&gt;</code> to request the email.</li>
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>Your application should show the email’s sender, recipients, subject, timestamp, and body.</li>
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>You’ll likely want to add an additional <code class="highlighter-rouge">div</code> to <code class="highlighter-rouge">inbox.html</code> (in addition to <code class="highlighter-rouge">emails-view</code> and <code class="highlighter-rouge">compose-view</code>) for displaying the email. Be sure to update your code to hide and show the right views when navigation options are clicked.</li>
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>See the hint in the Hints section about how to add an event listener to an HTML element that you’ve added to the DOM.</li>
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>Once the email has been clicked on, you should mark the email as read. Recall that you can send a <code class="highlighter-rouge">PUT</code> request to <code class="highlighter-rouge">/emails/&lt;email_id&gt;</code> to update whether an email is read or not.</li>
    </ul>
  </li>
  <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span><strong>Archive and Unarchive</strong>: Allow users to archive and unarchive emails that they have received.
    <ul class="fa-ul">
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>When viewing an Inbox email, the user should be presented with a button that lets them archive the email. When viewing an Archive email, the user should be presented with a button that lets them unarchive the email. This requirement does not apply to emails in the Sent mailbox.</li>
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>Recall that you can send a <code class="highlighter-rouge">PUT</code> request to <code class="highlighter-rouge">/emails/&lt;email_id&gt;</code> to mark an email as archived or unarchived.</li>
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>Once an email has been archived or unarchived, load the user’s inbox.</li>
    </ul>
  </li>
  <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span><strong>Reply</strong>: Allow users to reply to an email.
    <ul class="fa-ul">
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>When viewing an email, the user should be presented with a “Reply” button that lets them reply to the email.</li>
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>When the user clicks the “Reply” button, they should be taken to the email composition form.</li>
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>Pre-fill the composition form with the <code class="highlighter-rouge">recipient</code> field set to whoever sent the original email.</li>
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>Pre-fill the <code class="highlighter-rouge">subject</code> line. If the original email had a subject line of <code class="highlighter-rouge">foo</code>, the new subject line should be <code class="highlighter-rouge">Re: foo</code>. (If the subject line already begins with <code class="highlighter-rouge">Re: </code>, no need to add it again.)</li>
      <li data-marker="*"><span class="fa-li"><i class="fas fa-circle"></i></span>Pre-fill the <code class="highlighter-rouge">body</code> of the email with a line like <code class="highlighter-rouge">"On Jan 1 2020, 12:00 AM foo@example.com wrote:"</code> followed by the original text of the email.</li>
