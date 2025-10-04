import { getCookie } from 'cookies-next';

export default async function FbEvent(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST request allowed' });
  }

  const {
    headers: { referer },
    body: { eventName, eventID, user, clientData }
  } = req;

  const { createHash } = require('crypto');
  const hash = (string) => createHash('SHA256').update(string).digest('hex');

  const url = `https://graph.facebook.com/v14.0/${process.env.PIXEL}/events?access_token=${process.env.FB_CAPI_TOKEN}`

  const userData = {
    em: user?.em ? [hash(user.em)] : undefined,
    ph: user?.ph ? [hash(user.ph)] : undefined,
    external_id: user?.externalID ? hash(user.externalID) : undefined,
    fbc: getCookie('_fbc', { req, res }) || undefined,
    fbp: getCookie('_fbp', { req, res }) || undefined,
    client_user_agent: req.headers['user-agent'],
    client_ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
  };

  const filteredUserData = Object.fromEntries(
    Object.entries(userData).filter(([_, value]) => value !== undefined)
  );

  const payload = {
    data: [
      {
        event_name: eventName,
        event_id: eventID,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: referer,
        user_data: filteredUserData,
        custom_data: clientData || {},
      },
    ],
    test_event_code: process.env.FB_CAPI_TEST_EVENT_CODE,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error('FB error', error);
    res.status(500).json({ error: 'Facebook API failed' });
  }
}