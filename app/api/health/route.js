export async function GET() {
  return Response.json({ status: 'ok', app: 'Inspired to Succeed', timestamp: new Date().toISOString() });
}
