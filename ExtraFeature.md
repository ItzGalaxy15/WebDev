# Extra feature for backend

**Profile Pages + Messaging**

Users will have profile pages, that show info about them.

It will show their name, recurring days and office attendance status. It will also show their attended avents.

Profile pages are limited to logged in Users or Admins.

When a User views their own page, they will be able to change their details.

If a user visits another user page, they will be able to send a message to that person.


****
**Details**

Profile Controller & Service and Message Controller & Service are part of the extra feature.

- The database has a new table called Messages.
- All profile pages should be able to be retrieved
- A user should be able to change their name, email, password and recurring days
- All events a user attended, and their reviews for those events, should be shown on the profile page.
- A user should be able to send messages
- A user should be able to receive messages
- When visiting a profile page, it should know if it's the page of the logged in viewer or not
