const validLogin = {
 "email": "guilherme@guilherme.com",
 "password": "secret_admin"
};
const user = {
    username: 'Guilherme',
    role: 'guilherme',
    email: 'guilherme@guilherme.com',
   };
   const userNoPass = {
    "email": "guilherme@guilherme.com",
   }
   const invalidPassword = {
    "email": "guilherme@guilherme.com",
    "password": "12345678"
   }
   
   const invalidEmail = {
    "email": "guilherme@guilherme",
    "password": "secret_admin"
   }
   
   
   const userRegistered = { ...user, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };
   
   export { validLogin, userRegistered, userNoPass, invalidEmail, invalidPassword }