const admin = require('firebase-admin');

require('dotenv').config();

admin.initializeApp({
    credential: admin.credential.cert(
        {
            "type": "service_account",
            "project_id": process.env.FIRESTORE_PROJECTID,
            "private_key_id": process.env.FIRESTORE_PRIVATEKEYID,
            "private_key": process.env.FIRESTORE_PRIVATEKEY.replace(/\\n/g, '\n'),
            "client_email": process.env.FIRESTORE_CLIENTMAIL,
            "client_id": process.env.FIRESTORE_CLIENTID,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": process.env.FIRESTORE_CLIENTX509
        }
    )
});

const db = admin.firestore();

const FieldValue = admin.firestore.FieldValue;

module.exports = { admin, db, FieldValue };
