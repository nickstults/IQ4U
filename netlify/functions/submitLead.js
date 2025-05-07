const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  const data = JSON.parse(event.body);

  const requestData = {
    auth_token: 'sg19yks0iek24aeebmmgebhsuwxsmpd4',  // Add your actual API token here
    list_id: '9733',  // Your list ID
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone_number: data.Primary_Phone,
    address: data.address,
    zip: data.zip,
    // Add other form fields as necessary
  };

  try {
    const response = await fetch('https://api.convoso.com/v1/leads/insert?auth_token=sg19yks0iek24aeebmmgebhsuwxsmpd4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Lead submitted successfully!" }),
      };
    } else {
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: result.message }),
      };
    }
  } catch (error) {
    console.error("Error submitting lead:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
