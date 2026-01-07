import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple Zod-like validation
interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function validateContact(data: unknown): { success: true; data: ContactData } | { success: false; error: string } {
  if (typeof data !== "object" || data === null) {
    return { success: false, error: "Invalid request body" };
  }

  const { name, email, subject, message } = data as Record<string, unknown>;

  // Name validation
  if (typeof name !== "string" || name.trim().length === 0) {
    return { success: false, error: "Name is required" };
  }
  if (name.trim().length > 100) {
    return { success: false, error: "Name must be less than 100 characters" };
  }

  // Email validation
  if (typeof email !== "string" || email.trim().length === 0) {
    return { success: false, error: "Email is required" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { success: false, error: "Invalid email address" };
  }
  if (email.trim().length > 255) {
    return { success: false, error: "Email must be less than 255 characters" };
  }

  // Subject validation
  if (typeof subject !== "string" || subject.trim().length === 0) {
    return { success: false, error: "Subject is required" };
  }
  if (subject.trim().length > 200) {
    return { success: false, error: "Subject must be less than 200 characters" };
  }

  // Message validation
  if (typeof message !== "string" || message.trim().length === 0) {
    return { success: false, error: "Message is required" };
  }
  if (message.trim().length > 5000) {
    return { success: false, error: "Message must be less than 5000 characters" };
  }

  // Spam detection: check for common spam patterns
  const spamPatterns = [
    /\b(viagra|casino|lottery|winner|click here|free money|urgent)\b/i,
    /(.)\1{10,}/, // repeated characters
    /(https?:\/\/[^\s]+){5,}/, // too many URLs
  ];

  const combinedText = `${name} ${subject} ${message}`;
  for (const pattern of spamPatterns) {
    if (pattern.test(combinedText)) {
      return { success: false, error: "Message flagged as spam" };
    }
  }

  return {
    success: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    },
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const body = await req.json();
    console.log("Received contact form submission");

    // Validate input
    const validation = validateContact(body);
    if (!validation.success) {
      console.log("Validation failed:", validation.error);
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { name, email, subject, message } = validation.data;

    // Initialize Supabase client with service role for inserting
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert into database
    const { error: dbError } = await supabase.from("contact_submissions").insert({
      name,
      email,
      subject,
      message,
    });

    if (dbError) {
      console.error("Database insert error:", dbError);
      return new Response(JSON.stringify({ error: "Failed to save submission" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Contact submission saved to database");

    // Send email notification via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        
        // Send notification to admin
        await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: ["uttam.ux.design@gmail.com"],
          subject: `New Contact: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
            <hr />
            <p style="color: #666; font-size: 12px;">
              Sent from your portfolio contact form
            </p>
          `,
        });

        console.log("Email notification sent to admin");
      } catch (emailError) {
        // Log but don't fail the request if email fails
        console.error("Failed to send email notification:", emailError);
      }
    } else {
      console.log("RESEND_API_KEY not configured, skipping email notification");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error in submit-contact function:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
