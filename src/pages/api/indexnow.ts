import type { APIRoute } from 'astro';

// IndexNow API key — must match the key file at /public/[key].txt
const INDEXNOW_KEY = 'f8a2c1d4e6b3a7f9c2e5d8b1a4f7c0e3';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get('url');
  
  if (!targetUrl) {
    return new Response(JSON.stringify({ 
      message: 'IndexNow API endpoint. Pass ?url=https://gstcalculatoronline.in/your-page to submit for indexing.' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const payload = {
      host: 'gstcalculatoronline.in',
      key: INDEXNOW_KEY,
      keyLocation: `https://gstcalculatoronline.in/${INDEXNOW_KEY}.txt`,
      urlList: [targetUrl]
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return new Response(JSON.stringify({ 
      submitted: targetUrl, 
      status: response.status,
      message: response.status === 202 ? 'Submitted successfully' : 'Submission response received'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Submission failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Also handle POST for bulk submission
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const urlList = body.urls || [];
    
    if (!Array.isArray(urlList) || urlList.length === 0) {
      return new Response(JSON.stringify({ error: 'Pass { urls: [...] } in request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const payload = {
      host: 'gstcalculatoronline.in',
      key: INDEXNOW_KEY,
      keyLocation: `https://gstcalculatoronline.in/${INDEXNOW_KEY}.txt`,
      urlList: urlList.slice(0, 10000) // IndexNow limit
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return new Response(JSON.stringify({ 
      submitted: urlList.length,
      status: response.status
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
