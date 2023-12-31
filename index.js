//  Déclaration de(s) dépendances

const axios = require('axios'); // Utilisation de axios 

// Déclaration des variables

let tid;        // Token d'authentification
let apikey;     // clé API
let service;    // service id 
 
//------------------------ Fonction de connexion ---------------------------- 

async function Signin(user, password) {
  const datas = {
    user: user,
    password: password
  };

  const headers = {
    'Authorization': `Token ${tid}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  try {
    const response = await axios.post('https://kaliapay.com/api/signin-users/', datas, { headers });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

//------------------ Fonction pour effectuer un paiement --------------- 

async function initialize(amount, custom_data) {
  const requestPayment = {
    apikey: apikey,
    service: service,
    amount: amount,
    custom_data: custom_data
  };

  const headers = {
    'Authorization': `Token ${tid}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  try {
    const response = await axios.post('https://kaliapay.com/api/generate-mobpay-qrcode/', requestPayment, { headers });
    const responseData = response.data;
    return {
      responseData
    };
  } catch (error) {
    throw new Error(error);
  }
}

//-------------- Fonction pour les détails d'une commande -------------- 

async function getPaymentDetails(reference) {
  const headers = {
    'Authorization': `Token ${tid}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  try {
    const response = await axios.get(`https://kaliapay.com/api/get-express-transaction-details/${reference}/`, { headers });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

//-------------------------------------------------------------------------

function setTid(value) {
  tid = value;
}

function setApiKey(value) {
  apikey = value;
}

function setService(value) {
  service = value;
}

//---------------------- Export des différents fonctions ------------------------

module.exports = {
  
  setTid,
  setApiKey,
  setService,
  initialize,
  getPaymentDetails,
  Signin

};
