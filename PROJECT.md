# MedSpace Project Workflow

MedSpace is a premium platform connecting medical professionals with available clinical and office spaces. It operates similarly to "Airbnb for medical spaces." 

The workflow is divided into three distinct user journeys: **Seeker**, **Lister**, and **Admin**.

---

## 1. Seeker Workflow (Medical Professionals)
*Seekers are healthcare professionals looking for a space to rent or lease.*

1. **Discovery & Search (`/search-spaces`)**
   - **Guest Browsing**: Seekers can browse available spaces without logging in.
   - **Location Filtering**: Dynamic, cascading dropdowns for Indian States and Cities.
   - **Advanced Filters**: Filter by Price Range, Space Type, Date, and Radius.
   - **Map Integration**: Toggle between List View and Map View to see spaces plotted on an interactive Google Map.

2. **Evaluating a Space (`/properties/[slug]`)**
   - **Detailed View**: Seekers can view high-quality image/video galleries, comprehensive descriptions, available amenities, and pricing (Hourly, Daily, Monthly).
   - **Host Information**: Verify the lister's profile and credentials.

3. **Authentication & Action**
   - **Sign In/Up**: Standard login via Google OAuth or Magic Link/Credentials.
   - **Saving Spaces**: Authenticated seekers can "Save" or "Favorite" listings to review later.
   - **Contacting the Lister**: Seekers can send direct inquiries to the Space Owner to negotiate or book the space.

---

## 2. Lister Workflow (Space Owners)
*Listers are clinic owners or administrators who have underutilized space to rent out.*

1. **Onboarding (`/list-your-space`)**
   - **Sign Up**: Register and select the "List a space" intent, which assigns them the `OWNER` role.
   - **Subscription (`/pricing`)**: Listers must subscribe to an active plan (via Stripe integration) before they can publish listings.

2. **Creating a Listing (`/add-listing`)**
   - **Multi-Step Wizard**: A streamlined, auto-saving form to capture all property details.
   - **Step 1: Basics**: Title, Space Type, and AI-assisted description generation.
   - **Step 2: Location**: Exact PIN code, Indian State/City selection, and Map pin placement.
   - **Step 3: Details**: Target professionals, sq. ft., pricing, and amenities.
   - **Step 4: Media**: Drag-and-drop interface for uploading and reordering images and video.
   - **Step 5: Review**: Final attestation and submission.

3. **Owner Dashboard (`/dashboard`)**
   - **Listing Management**: View all Draft, Pending, and Published listings. Edit or delete spaces.
   - **Metrics**: Track listing performance (views, inquiries).
   - **Account Settings**: Manage billing, subscription status, and profile details.

---

## 3. Admin Workflow (Platform Operators)
*Admins manage the overall health, safety, and inventory of the platform.*

1. **Admin Dashboard (`/lms-admin`)**
   - **Restricted Access**: Only accessible to users with the `ADMIN` or `SUPER_ADMIN` role.
   - **High-Level Analytics**: Overview of total platform users, active listings, and revenue metrics.

2. **Property Management (`/lms-admin/properties`)**
   - **Review Queue**: Approve or reject new listings submitted by Listers.
   - **Region Filtering**: Filter properties by specific major cities or view all of India.
   - **Moderation**: Ability to take down inappropriate or expired listings.

3. **User & Subscription Management**
   - **User Audits**: View registered users, their roles, and contact information.
   - **Billing Support**: Monitor active Stripe subscriptions and handle manual overrides or cancellations if necessary.
