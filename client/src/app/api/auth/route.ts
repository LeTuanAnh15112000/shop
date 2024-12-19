import { decodeJWT } from "@/lib/utils";

// gắn sessionToken vào cookies
type PayloadJWT = {
  iat: number;
  exp: number;
  tokenType: string;
  userId: number;
};
export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res.sessionToken as string;
  if (!sessionToken) {
    return Response.json(
      { message: "Không nhận được session token" },
      {
        status: 400,
      }
    );
  }
  const payload = decodeJWT<PayloadJWT>(sessionToken);
  const expiresDate = new Date(payload.exp * 1000).toUTCString();
  console.log(expiresDate);
  return Response.json(res, {
    status: 200,
    headers: { 'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax, Secure` },
  });
}
