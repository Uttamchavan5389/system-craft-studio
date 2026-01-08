import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

  if (typeof name !== "string" || name.trim().length === 0) {
    return { success: false, error: "Name is required" };
  }
  if (name.trim().length > 100) {
    return { success: false, error: "Name must be less than 100 characters" };
  }

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

  if (typeof subject !== "string" || subject.trim().length === 0) {
    return { success: false, error: "Subject is required" };
  }
  if (subject.trim().length > 200) {
    return { success: false, error: "Subject must be less than 200 characters" };
  }

  if (typeof message !== "string" || message.trim().length === 0) {
    return { success: false, error: "Message is required" };
  }
  if (message.trim().length > 5000) {
    return { success: false, error: "Message must be less than 5000 characters" };
  }

  const spamPatterns = [
    /\b(viagra|casino|lottery|winner|click here|free money|urgent)\b/i,
    /(.)\1{10,}/,
    /(https?:\/\/[^\s]+){5,}/,
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

    const validation = validateContact(body);
    if (!validation.success) {
      console.log("Validation failed:", validation.error);
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { name, email, subject, message } = validation.data;

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

    // Fetch email notification settings from DB
    const { data: settingsRows, error: settingsError } = await supabase
      .from("contact_notification_settings")
      .select("enabled, recipient_email, cc_emails")
      .eq("id", "default")
      .maybeSingle();

    if (settingsError) {
      console.error("Error fetching notification settings:", settingsError);
    }

    const emailEnabled = settingsRows?.enabled ?? true;
    const recipientEmail = settingsRows?.recipient_email ?? "u1976739@gmail.com";
    const ccEmails: string[] = settingsRows?.cc_emails ?? [];

    // Send email notification via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey && emailEnabled) {
      try {
        const resend = new Resend(resendApiKey);

        const emailPayload: {
          from: string;
          to: string[];
          cc?: string[];
          subject: string;
          html: string;
        } = {
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [recipientEmail],
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
        };

        if (ccEmails.length > 0) {
          emailPayload.cc = ccEmails;
        }

        await resend.emails.send(emailPayload);

        console.log("Email notification sent to:", recipientEmail, ccEmails.length > 0 ? `CC: ${ccEmails.join(", ")}` : "");
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
      }
    } else if (!resendApiKey) {
      console.log("RESEND_API_KEY not configured, skipping email notification");
    } else {
      console.log("Email notifications disabled by admin");
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
