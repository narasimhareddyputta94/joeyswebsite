import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // basic validation + honeypot
    if (!body?.email || !body?.address) {
      return NextResponse.json({ error: "Missing email or address" }, { status: 400 });
    }
    if (body.middleName) return NextResponse.json({ ok: true }); // bot

    // Optional: forward to a webhook (Zapier/Make/Sheets)
    const webhook = process.env.LEADS_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...body,
          ts: new Date().toISOString(),
          source: "cumberlandbrooks.com",
        }),
      });
    }

    // Optional: send internal email via Resend (uncomment if you add RESEND_API_KEY)
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY!);
    // await resend.emails.send({
    //   from: "Leads <leads@cumberlandbrooks.com>",
    //   to: ["you@yourfirm.com"],
    //   subject: "New Lead",
    //   text: JSON.stringify(body, null, 2),
    // });

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
