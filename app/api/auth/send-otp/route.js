import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendOTPEmail } from '@/lib/mailer';
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
export async function POST(req) {
    try {
        const { email } = await req.json();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
        }
        const normalizedEmail = email.toLowerCase();
        // Rate limit: max 3 OTPs per 10 minutes
        const recentOtps = await prisma.otpCode.count({
            where: {
                email: normalizedEmail,
                createdAt: { gt: new Date(Date.now() - 10 * 60 * 1000) },
            },
        });
        if (recentOtps >= 3) {
            return NextResponse.json({ error: 'Too many OTP requests. Please wait 10 minutes.' }, { status: 429 });
        }
        // Invalidate previous OTPs for this email
        await prisma.otpCode.updateMany({
            where: { email: normalizedEmail, verified: false },
            data: { verified: true }, // Mark as used
        });
        // Generate and save new OTP (expires in 10 minutes)
        const code = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await prisma.otpCode.create({
            data: { email: normalizedEmail, code, expiresAt },
        });
        // Send email via Gmail SMTP
        await sendOTPEmail(normalizedEmail, code);
        return NextResponse.json({
            success: true,
            message: 'OTP sent successfully',
            expiresAt: expiresAt.toISOString(),
        });
    }
    catch (error) {
        console.error('[POST /api/auth/send-otp]', error);
        return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
    }
}
