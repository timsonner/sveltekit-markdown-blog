import { json } from '@sveltejs/kit';

export function GET(event) {
  const headers = {};
  
  // Iterate through all headers and store them in the 'headers' object
  event.request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return json(headers);
}
