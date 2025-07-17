exports.handler = async (event) => {
  const TELEGRAM_BOT_TOKEN = '7608906465:AAH36EqbcFIBtRfZLnmPVD0yu3byxzqKJ6w';
  const TELEGRAM_CHAT_ID = '-1002329884512';

  try {
    const data = JSON.parse(event.body);

    // Get the current date and time
    const now = new Date();

    // Extract year, month, date, and day information
    const shortYear = now.getFullYear().toString().slice(-2); // Last two digits of the year (e.g., 25 for 2025)
    const monthNo = now.getMonth() + 1; // JavaScript months are 0-based, so add 1
    const date = now.getDate(); // Day of the month
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const shortDay = days[now.getDay()]; // Get the short day name

    // Generate a random 4-character alphanumeric string
    const randomString = Math.random().toString(36).substring(2, 6).toUpperCase();

    // Create the ticket ID based on the new format
    const ticketID = `${shortYear}${monthNo}/${date}-${shortDay}ID-${randomString}`;

    // Generate the message to send to Telegram
    const message = `
<b>🚀 New Feedback</b>
---------------------------
<b>🎫 Ticket ID:</b> ${ticketID}
---------------------------
<b>🙎‍♂️ Name:</b> ${data.name}
<b>🌍 State/Country:</b> ${data.state_country}
<b>🌟 Telegram:</b> ${data.telegram}
<b>⭐ Ratings:</b> ${data.phone}
<b>📨 Feedback:</b> ${data.message}
    `;

    // Send message to Telegram
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    // Return the ticket ID in the response
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, ticketID }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
