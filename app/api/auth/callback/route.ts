import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.json(
      { error: `HubSpot Auth Failed: ${error}` },
      { status: 400 }
    );
  }

  if (!code) {
    return NextResponse.json(
      { error: 'Missing authorization code.' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch('https://api.hubapi.com/oauth/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.HUBSPOT_CLIENT_ID!,
        client_secret: process.env.HUBSPOT_CLIENT_SECRET!,
        redirect_uri: 'https://portal-pulse-khaki.vercel.app/api/auth/callback',
        code,
      }),
    });

    const tokenData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: tokenData.message || 'Failed token exchange' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      message: 'HubSpot OAuth connection successful!',
      portalId: tokenData.hub_id,
      accessToken: tokenData.access_token,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error during auth' },
      { status: 500 }
    );
  }
}
