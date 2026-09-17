import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { groqComplete, isGroqConfigured } from '@/lib/groq';
// Helper function to generate fallback description if API key is invalid/missing
function generateFallbackDescription(listing) {
    const typeLabel = listing.spaceType
        ? listing.spaceType.replace(/_/g, ' ').toLowerCase()
        : 'medical space';
    const sizeText = listing.squareFeet ? `${listing.squareFeet} sq. ft.` : '';
    const locationText = listing.city && listing.state ? `${listing.city}, ${listing.state}` : 'our premier medical center';
    const amenitiesList = listing.amenities.length > 0
        ? listing.amenities.join(', ')
        : 'essential clinical infrastructure and utilities';
    return `This is a premium, fully-equipped ${typeLabel} located in the heart of ${locationText}. Specially tailored to meet the exacting standards of healthcare practitioners and medical professionals, this ${sizeText ? `${sizeText} ` : ''}space offers a seamless environment to deliver exceptional patient care. The layout has been optimized for clean patient flow, safety, and modern clinical efficiency.

Equipped with premium infrastructure, this medical space includes access to ${amenitiesList}. The environment features modern finishes, professional lighting, and compliant design standards suitable for general examinations, consultations, or specialized procedures depending on your practice requirements.

Located in a highly accessible area of ${listing.city || 'the city'} with convenient transport links and ample parking, this space provides a premium presence for your healthcare practice. Benefit from a collaborative professional environment designed to elevate the patient experience and streamline your daily operations.`;
}
export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const body = await req.json();
        const { listingId } = body;
        if (!listingId) {
            return NextResponse.json({ error: 'listingId is required' }, { status: 400 });
        }
        // Retrieve listing details from DB
        const listing = await prisma.listing.findUnique({
            where: { id: listingId },
        });
        if (!listing) {
            return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
        }
        // Verify ownership
        if (listing.userId !== session.user.id && session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
        // Parse amenities JSON
        let parsedAmenities = [];
        try {
            parsedAmenities =
                typeof listing.amenities === 'string'
                    ? JSON.parse(listing.amenities)
                    : listing.amenities || [];
        }
        catch (_) {
            parsedAmenities = [];
        }
        const spaceType = listing.spaceType || 'Medical Space';
        const city = listing.city || 'N/A';
        const state = listing.state || 'N/A';
        const size = listing.squareFeet ? `${listing.squareFeet} sq. ft.` : 'N/A';
        const amenities = parsedAmenities.length > 0 ? parsedAmenities.join(', ') : 'Standard clinical amenities';
        // Format the prompt as explicitly requested
        const prompt = `You are a professional real estate copywriter specializing in medical spaces. 
Generate a compelling, professional description for a medical space listing with these details:
Space Type: ${spaceType}
Location: ${city}, ${state}
Amenities: ${amenities}
Size: ${size}
Write 2-3 paragraphs. Be specific, professional and highlight the medical features.
Do not use generic phrases. Make it sound premium and trustworthy.`;
        // Check if the key is missing or is the default placeholder
        if (!isGroqConfigured()) {
            console.warn('Groq API key is not configured. Using high-quality fallback generator.');
            const description = generateFallbackDescription({
                spaceType: listing.spaceType,
                city: listing.city,
                state: listing.state,
                squareFeet: listing.squareFeet,
                rooms: listing.rooms,
                amenities: parsedAmenities,
            });
            return NextResponse.json({ description });
        }
        try {
            const description = await groqComplete(
                [{ role: 'user', content: prompt }],
                { maxTokens: 512 }
            );
            if (!description) {
                throw new Error('Empty response from Groq');
            }
            return NextResponse.json({ description });
        }
        catch (apiError) {
            console.error('Groq API call failed, falling back to template generation:', apiError);
            const description = generateFallbackDescription({
                spaceType: listing.spaceType,
                city: listing.city,
                state: listing.state,
                squareFeet: listing.squareFeet,
                rooms: listing.rooms,
                amenities: parsedAmenities,
            });
            return NextResponse.json({ description });
        }
    }
    catch (error) {
        console.error('[POST /api/ai/generate-description]', error);
        return NextResponse.json({ error: 'Failed to generate description' }, { status: 500 });
    }
}
