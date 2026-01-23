import SapioConfig from '@/config/sapioConfig';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const endpoint = SapioConfig.SAPIO_API_URL;
    const key = SapioConfig.SAPIO_WIDGET_API_KEY;

    const response = await fetch(`${endpoint}/widget/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        message: body.m,
        conversation_id: body.c,
        recaptcha_token: body.r,
      }),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Widget chat error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
