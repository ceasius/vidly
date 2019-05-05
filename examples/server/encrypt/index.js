const castle = require('./castle');

//the message that has to be protected
const data = 'this is a private message.';
//the secret keys
const key = '5ebe2294ecd0e0f08eab7690d2a6ee69';

console.log('original:', data);
const encrypted = castle.encrypt(data, key);
console.log('encrypted:', encrypted);
const decrypted = castle.decrypt(encrypted, key);
console.log('decrypted:', decrypted);
