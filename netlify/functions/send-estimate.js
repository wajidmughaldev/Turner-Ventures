// netlify/functions/send-estimate.js
const nodemailer = require("nodemailer");

// ✅ import BOTH forms to be compatible across formidable versions
const { formidable, IncomingForm } = require("formidable");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // ---- build a formidable instance (works for v2/v3) ----
    const buildForm = (opts) => {
      // v3 CommonJS: { formidable } exists (callable)
      if (typeof formidable === "function") return formidable(opts);
      // older style: new IncomingForm()
      if (typeof IncomingForm === "function") return new IncomingForm(opts);
      throw new Error("Formidable export shape not supported");
    };

    const form = buildForm({
      multiples: true,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB/file
      uploadDir: "/tmp",             // Lambda writable dir
    });

    // ---- parse multipart from Netlify event ----
    const parseForm = () =>
      new Promise((resolve, reject) => {
        const { body, headers = {}, isBase64Encoded } = event;
        const buffer = Buffer.from(body || "", isBase64Encoded ? "base64" : "utf8");

        const { Readable } = require("stream");
        const req = new Readable();
        req._read = () => {};
        req.push(buffer);
        req.push(null);
        req.headers = headers;
        req.method = event.httpMethod || "POST";
        req.url = "/";

        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });

    const { fields, files } = await parseForm();

    // ---- normalize fields ----
    const get = (k) => (fields[k] ?? "").toString();
    const name = get("name");
    const email = get("email");
    const phone = get("phone");
    const address = get("address");
    const city = get("city");
    const timeline = get("timeline");
    const budget = get("budget");
    const description = get("description");

    const services = Array.isArray(fields.services)
      ? fields.services
      : fields.services
      ? [fields.services]
      : [];

    const toArray = (f) => (Array.isArray(f) ? f : f ? [f] : []);
    const imageFiles = toArray(files.images);

    // ---- send email with Nodemailer ----
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || "true") === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const escapeHtml = (s) =>
      String(s || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

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

    const attachments = imageFiles.map((f, i) => ({
      filename: f.originalFilename || `photo-${i + 1}`,
      path: f.filepath, // stream from /tmp
      contentType: f.mimetype || "application/octet-stream",
    }));

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      replyTo: email || process.env.FROM_EMAIL,
      subject: `New Estimate Request from ${name || "Website"}`,
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: err.message || "Failed to send" }),
    };
  }
};
