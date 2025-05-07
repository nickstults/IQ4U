// netlify/functions/submitLead.js
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

    // Send data to Convoso API or another API (this can be expanded as per your needs)
    try {
      const response = await fetch('https://api.convoso.com/v1/leads/sg19yks0iek24aeebmmgebhsuwxsmpd4&amp;', {
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
