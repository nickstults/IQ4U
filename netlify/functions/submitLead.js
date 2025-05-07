// netlify/functions/submitLead.js
const fetch = require('node-fetch');  // Make sure to import node-fetch or similar package

exports.handler = async function(event, context) {
  if (event.httpMethod === 'POST') {
    const data = JSON.parse(event.body);
    
    // Validate incoming data
    if (!data.first_name || !data.last_name || !data.email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields.' }),
      };
    }

    try {
      // Send data to Convoso API using server-side proxy (no CORS issues)
      const response = await fetch('https://api.convoso.com/v1/leads/insert?auth_token=sg19yks0iek24aeebmmgebhsuwxsmpd4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Lead submitted successfully', data: responseData }),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Something went wrong.' }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }
};
