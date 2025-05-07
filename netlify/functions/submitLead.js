const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const {
      first_name,
      last_name,
      address,
      email,
      phone_number,
      date_of_birth,
      ip_address,
      timestamp,
      zip = "", // fallback below if blank
    } = body;

    const convosoBaseURL = "https://api.convoso.com/v1/leads/insert";

    // fallback to use digits from address if zip missing
    const postal_code = zip || (address.match(/\d{5}/) || [])[0] || "";

    const convosoParams = new URLSearchParams({
      auth_token: "sg19yks0iek24aeebmmgebhsuwxsmpd4",
      list_id: "9689",
      check_dup: "0",
      check_dup_archive: "0",
      check_dnc: "0",
      check_wireless: "0",
      hopper: "1",
      hopper_priority: "99",
      update_order_by_last_called_time: "DESC",
      phone_code: "1",
      first_name: first_name || "",
      last_name: last_name || "",
      phone_number: phone_number || "",
      address1: address || "",
      postal_code: postal_code,
      email: email || "",
      date_of_birth: date_of_birth || "",
      publisher: "healthquotepros"
    }).toString();

    const fullURL = `${convosoBaseURL}?${convosoParams}`;
    console.log("🚨 Final Convoso URL:", fullURL);

    // Make the request to Convoso API from the server
    const response = await fetch(fullURL, { method: "POST" });
    const json = await response.json();

    console.log("✅ Convoso response:", json);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, convoso: json }),
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow any origin to access this API
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    };
  } catch (error) {
    console.error("❌ Convoso Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow any origin to access this API
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    };
  }
};
