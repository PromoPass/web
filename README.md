# web 

This is the web interface for providers. It should boast security + ease. Also the front facing part of our server. The backend (located at promopass.root.sx) is important for our mobile app to grab data from.

## Stage 1 
- Create Ad
- Register/Login
- View Ad History

### Todo
* Add create ad functionality
* Typecheck ALL OF the forms
* Update database to use slim framework on fendatr.com (will later be query.promopass.root.sx)

### Later TODOs 

#### Register/Login
- Since BASIC functionality is working, let's defer these tasks to a later time:
  - Add caching to the database (UserCache) after they log in. Reason: security and less calls to userapp (we are using essentially no calls right now besides login/register)
  - I'm sure there was more, just forgot. 
#### Edit Profile 
- Add profile functionality to edit profile (edit email, password, first name, last name).
