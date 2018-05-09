# TripcentsApp

How to Run TripcentsApp:

1) Connect to local mongodb: 
  mongod

2) Install dependencies: 
  npm install

3) Run application:
  npm start


Test Authentication Using Postman:
Make a POST request to localhost:3000/signup sending a JSON object with an email and password field. 
  ex: 
  
    {
      "email": "myemail@email.com",
      "password": "password"
    }
  
  You should see this message if request completed successfully:
  
    {
      "message": "user created"
    }

Make a POST request to localhost:3000/signin sending your credentials. 
  ex:
  
    {
      "email": "myemail@email.com",
      "password: "password"
    }
  
  You should see a response like this that shows the password has been hashed and a JWT token has been generated:
  
    {
      "email": "myemail@myemail.com",
      "password": "password",
      "user": {
      "_id": "5af25160ea07a4a8d6fee71b",
      "email": "joanna@joanna.com",
      "password": "$2b$10$jxfub1PjDnyMYkjdwWH16esudy2/5syCooK5mjcdH5BolIuQVMIAK",
      "__v": 0
    },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW5uYUBqb2FubmEuY29tIiwidXNlcklkIjoiNWFmMjUxNjBlYTA3YTRhOGQ2ZmVlNzFiIiwiaWF0IjoxNTI1ODMwMDM0LCJleHAiOjE1MjU4MzM2MzR9.rgfOlgIODoP9QGf6G0atyQIQvMnzcTRxWusVPwCUskc"
    }
  
  Copy the token.
  
  3) Make a POST request to localhost:3000/profile. Within the headers, create a header with a key called authorization. In its value field input "Bearer {paste token here, be sure not to include brackets around it}"
  
  You should see a response like this:
  
    {
      "hi": "you are authorized to see this page"
    }
  
  To test that the token is authorizing the signed in user to access /profile, change the token to a random value and try to make a POST request to localhost:3000/profile again. You should see this:
  
    {
      "message": "Authorization failed"
    }
  
  Try changing the token back to the value used before. You should be authorized to view the page again because the token has been verified. Once again, you should see this:
  
    {
      "hi": "you are authorized to see this page"
    }

  
