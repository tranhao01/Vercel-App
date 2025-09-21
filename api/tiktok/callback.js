export default async function handler(req, res) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    const { code, state } = req.body || {};
    if (!code) return res.status(400).json({ error: "Missing code" });
    const client_key = process.env.TIKTOK_CLIENT_KEY;
    const client_secret = process.env.TIKTOK_CLIENT_SECRET;
    const redirect_uri = process.env.TIKTOK_REDIRECT_URI; // https://vercel-app-woad-nine.vercel.app/auth/callback
    const tokenResp = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_key,
        client_secret,
        code,
        grant_type: "authorization_code",
        redirect_uri
      })
    });
    const tokenJson = await tokenResp.json();
    if (!tokenResp.ok) return res.status(400).json({ error: "Token exchange failed", details: tokenJson });
    // TODO: lưu tokenJson (access_token, refresh_token, expires_in...) vào DB/session
    return res.status(200).json({ ok: true, token: tokenJson });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Server error" });
  }
}