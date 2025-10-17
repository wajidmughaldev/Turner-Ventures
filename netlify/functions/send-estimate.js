const nodemailer = require("nodemailer");
const formidable = require("formidable");

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Netlify passes rawBody; we need to parse multipart with formidable
    // NOTE: We must disable Netlify's default body parsing by using raw event.body.
    const form = formidable({
      multiples: true,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB per file
      // Netlify/AWS has a writable /tmp directory
      uploadDir: "/tmp",
    });

    const parseForm = () =>
      new Promise((resolve, reject) => {
        // formidable expects a Node.js IncomingMessage; we reconstruct a minimal one
        const { body, headers, isBase64Encoded } = event;
        const buffer = Buffer.from(body || "", isBase64Encoded ? "base64" : "utf8");

        // Fake a stream for formidable
        const { Readable } = require("stream");
        const req = new Readable();
        req._read = () => {};
        req.push(buffer);
        req.push(null);
        req.headers = headers || {};
        req.method = event.httpMethod || "POST";
        req.url = event.rawUrl || "/";

        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });

    const { fields, files } = await parseForm();

    // Fields (strings/arrays). Ensure arrays are arrays:
    const name = (fields.name || "").toString();
    const email = (fields.email || "").toString();
    const phone = (fields.phone || "").toString();
    const address = (fields.address || "").toString();
    const city = (fields.city || "").toString();
    const timeline = (fields.timeline || "").toString();
    const budget = (fields.budget || "").toString();
    const description = (fields.description || "").toString();
    const services = Array.isArray(fields.services)
      ? fields.services
      : fields.services
      ? [fields.services]
      : [];

    // Files can be single or array depending on how many the user picked
    const normalizeFiles = (f) => (Array.isArray(f) ? f : f ? [f] : []);
    const imageFiles = normalizeFiles(files.images);

    // Build mail transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || "true") === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Build HTML
    const html = `
      <h2>New Estimate Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Address:</strong> ${escapeHtml(address)}</p>
      <p><strong>City:</strong> ${escapeHtml(city)}</p>
      <p><strong>Services:</strong> ${services.map(escapeHtml).join(", ")}</p>
      <p><strong>Timeline:</strong> ${escapeHtml(timeline)}</p>
      <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
      ${
        description
          ? `<p><strong>Description:</strong><br/>${escapeHtml(description).replace(/\n/g, "<br/>")}</p>`
          : ""
      }
      <p><strong>Attachments:</strong> ${imageFiles.length}</p>
      <hr/>
      <p>Sent from website estimate form.</p>
    `;

    // Attachments from /tmp file paths
    const attachments = imageFiles.map((f, i) => ({
      filename: f.originalFilename || `photo-${i + 1}`,
      path: f.filepath, // let nodemailer stream from temp path
      contentType: f.mimetype || "application/octet-stream",
    }));

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      replyTo: email || process.env.FROM_EMAIL,
      subject: `New Estimate Request from ${name || "Unknown"}`,
      html,
      attachments,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error("send-estimate error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: err.message || "Failed to send" }),
    };
  }
};

// Simple HTML escape to avoid broken markup
function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
