// netlify/functions/submitLead.js

const fetch = require('node-fetch');  // Ensure fetch is imported for server-side use.

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

    // Prepare the Convoso API endpoint URL with your parameters
    const convosoUrl = `https://api.convoso.com/v1/leads/insert?auth_token=sg19yks0iek24aeebmmgebhsuwxsmpd4&adaptor_id=&list_id=9733&check_dup=0&check_dup_archive=0&check_dnc=0&check_wireless=0&hopper=1&hopper_priority=99&hopper_expires_in=0&update_if_found=&update_order_by_last_called_time=DESC&blueinkdigital_token=&reject_by_carrier_type=&filter_phone_code=&lead_id=0&phone_code=1&created_by=&email=${data.email}&last_modified_by=&owner_id=&first_name=${data.first_name}&last_name=${data.last_name}&phone_number=${data.Primary_Phone}&alt_phone_1=&alt_phone_2=&address1=${data.address}&address2=&city=&state=&province=&postal_code=${data.zip}&country=&gender=&date_of_birth=${data.dob_month}-${data.dob_day}-${data.dob_year}&note=&publisher=`;

    // Send the data to Convoso API
    try {
      const response = await fetch(convosoUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      // Return the response data
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
