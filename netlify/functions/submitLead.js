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
      const response = await fetch('https://api.convoso.com/v1/leads/insert?auth_token=sg19yks0iek24aeebmmgebhsuwxsmpd4&adaptor_id=&list_id=9733&check_dup=0&check_dup_archive=0&check_dnc=0&check_wireless=0&hopper=1&hopper_priority=99&hopper_expires_in=0&update_if_found=&update_order_by_last_called_time=DESC&blueinkdigital_token=&reject_by_carrier_type=&filter_phone_code=&lead_id=0&phone_code=1&created_by=&email=&last_modified_by=&owner_id=&first_name=&last_name=&phone_number=&alt_phone_1=&alt_phone_2=&address1=&address2=&city=&state=&province=&postal_code=&country=&gender=&date_of_birth=&note=&publisher=', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

      const responseData = await response.json();
console.log(responseData); // Log the response for debugging
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
