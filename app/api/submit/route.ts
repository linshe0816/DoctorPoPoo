import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();

    if (!body.data || body.data.length > 20) {
        return NextResponse.json({ message: '輸入無效或超過 20 字！' }, { status: 400 });
    }

    return NextResponse.json({ message: `資料提交成功：${body.data}` });
}
