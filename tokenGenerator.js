import jwt from 'jsonwebtoken';

export function createJWT(display_name, email){
    var genSub = "Moment-Guest-" + (Math.floor(Math.random()*7362592) + 10000000);

    //create JWT paylod
    var payload = {
      "sub": genSub,
      "name" : display_name,
      "email": email,
      "iss": process.env.GUEST_ISSUER_ID
    };
    //sign above payload
    var token = jwt.sign(
      payload,
      Buffer.from(process.env.GUEST_ISSUER_SECRET_KEY, 'base64'),
      { expiresIn: '12h' }
    );

  // send back the token to whoever called this function
  return token;

};