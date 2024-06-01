import axios from 'axios';
import { SERP_API_ROUTE } from '@/constants';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const queryText = searchParams.get('queryText');

  if (!queryText) {
    return new Response('Missing query text', { status: 400 });
  }

  try {
    const serpResponse = await axios.get(`${SERP_API_ROUTE}/search.json`, {
      params: {
        api_key: process.env.SERP_API_KEY,
        q: queryText,
        engine: 'google_images',
        ijn: 0,
      },
    });
    return new Response(JSON.stringify(serpResponse.data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response('Failed to fetch image results', { status: 400 });
  }
}
