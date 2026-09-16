const isUttarPradesh = (state) => {
  if (!state) return false;
  const clean = state.trim().toLowerCase().replace(/[^a-z]/g, '');
  return clean === 'uttarpradesh' || clean === 'up';
};

const getEmailHeaderHtml = (subtitle = "Corporate Gifting & Customized Merchandise") => {
  return `
    <div class="header">
      <div style="text-align: center; margin-bottom: 10px;">
        <svg width="180" height="74" viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 180px; height: auto; display: block; margin: 0 auto;" aria-label="Corporate GIFTY">
          <defs>
            <linearGradient id="emailBowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#EA869B" />
              <stop offset="50%" stop-color="#DF6B83" />
              <stop offset="100%" stop-color="#D4536E" />
            </linearGradient>
          </defs>
          <path d="M 160 38 C 135 10 90 12 92 28 C 94 42 128 44 160 38 Z" fill="url(#emailBowGrad)" opacity="0.95" />
          <path d="M 160 38 C 185 10 230 12 228 28 C 226 42 192 44 160 38 Z" fill="url(#emailBowGrad)" opacity="0.95" />
          <ellipse cx="160" cy="38" rx="4.5" ry="3.8" fill="#C53F59" />
          <path d="M 50 48 Q 160 22 270 48" stroke="url(#emailBowGrad)" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.85" />
          <text x="160" y="88" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="40" font-weight="500" fill="#FFFBF5" letter-spacing="-0.5">Corporate</text>
          <line x1="82" y1="112" x2="118" y2="112" stroke="#DF6B83" stroke-width="1.4" stroke-linecap="round" />
          <text x="160" y="116" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-size="12" font-weight="600" fill="#DF6B83" letter-spacing="5">GIFTY</text>
          <line x1="202" y1="112" x2="238" y2="112" stroke="#DF6B83" stroke-width="1.4" stroke-linecap="round" />
        </svg>
      </div>
      ${subtitle ? `<p style="margin: 0; color: #D9C3A5; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 600;">${subtitle}</p>` : ''}
    </div>
  `;
};

const getEmailFooterHtml = () => {
  return `
    <div class="footer">
      <p style="font-weight: 700; color: #2D251E; font-size: 14px; margin: 0 0 4px 0; letter-spacing: 0.5px;">Corporate GIFTY</p>
      <p style="margin: 0; font-size: 12px; color: #7A6E65;">Premium Corporate Gifting & Customized Merchandise</p>
      <p style="margin-top: 10px; font-size: 11px; color: #A09489;">&copy; ${new Date().getFullYear()} Corporate GIFTY. All rights reserved.</p>
    </div>
  `;
};

const commonStyles = `
  body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF6F0; margin: 0; padding: 24px 12px; color: #2D251E; }
  .container { max-width: 580px; background: #ffffff; border: 1px solid #E8DEC8; border-radius: 12px; margin: 0 auto; overflow: hidden; box-shadow: 0 8px 24px rgba(45, 37, 30, 0.06); }
  .header { background: #2D251E; padding: 36px 24px 28px; text-align: center; color: #ffffff; border-bottom: 3px solid #B89B72; }
  .content { padding: 36px 30px; background: #ffffff; }
  .greeting { font-size: 18px; color: #2D251E; margin-top: 0; font-weight: 600; letter-spacing: 0.2px; }
  .lead-text { color: #4A3E35; font-size: 14px; line-height: 1.7; margin-bottom: 22px; }
  
  .info-card { background: #FAF6F0; border: 1px solid #E8DEC8; border-radius: 8px; padding: 18px; margin: 20px 0; font-size: 14px; }
  .table-custom { width: 100%; border-collapse: collapse; margin: 22px 0; }
  .table-custom th { background: #FAF6F0; padding: 12px 10px; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #6E5738; text-align: left; border-bottom: 1px solid #E8DEC8; letter-spacing: 0.5px; }
  .table-custom td { padding: 12px 10px; border-bottom: 1px solid #F5EFEB; font-size: 14px; color: #2D251E; }
  
  .total-row td { padding: 9px 10px; font-size: 13px; color: #4A3E35; }
  .grand-total { font-size: 15px !important; font-weight: 700 !important; color: #2D251E !important; border-top: 2px solid #E8DEC8; }
  .address-box { margin-top: 20px; font-size: 14px; color: #4A3E35; line-height: 1.6; background: #FAF6F0; border: 1px solid #E8DEC8; border-radius: 8px; padding: 16px; }
  
  .otp-box { background: #FAF6F0; border: 1px solid #E8DEC8; border-radius: 8px; padding: 24px; text-align: center; margin: 26px 0; }
  .otp-label { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #8E734C; margin-bottom: 10px; font-weight: 700; }
  .otp-code { font-family: 'Courier New', Courier, monospace; font-size: 34px; font-weight: 800; color: #2D251E; letter-spacing: 6px; margin: 0; }
  .expiry-note { font-size: 12px; color: #7A6E65; margin-top: 10px; }
  
  .btn-primary { background: #B89B72; color: #ffffff !important; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600; display: inline-block; transition: background 0.2s; }
  .btn-primary:hover { background: #A88B60; }

  .footer { background: #FAF6F0; padding: 24px 20px; text-align: center; font-size: 12px; color: #7A6E65; border-top: 1px solid #E8DEC8; }
`;

const getBreakdownHtml = (order) => {
  const isUP = isUttarPradesh(order.shippingAddress?.state);
  const itemsSubtotal = order.items ? order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) : 0;
  
  const taxableValue = order.taxableValue !== undefined && order.taxableValue !== null 
    ? order.taxableValue 
    : Number((itemsSubtotal * 0.97).toFixed(2));

  const discount = order.discount || 0;
  const onlineDiscount = order.onlineDiscount || 0;
  const codCharge = order.codCharge || 0;
  const shippingCost = order.shippingCost || 0;
  
  // Calculate subtotal for GST: Taxable Value - Coupon - Online Discount + Handling + Shipping
  const subtotalForGst = Number((taxableValue - discount - onlineDiscount + codCharge + shippingCost).toFixed(2));
  
  const gstAmount = order.gstAmount !== undefined && order.gstAmount !== null 
    ? order.gstAmount 
    : Number((itemsSubtotal - taxableValue).toFixed(2));

  let rows = `
    <tr class="total-row">
      <td colspan="3" style="text-align: right; font-weight: 500;">Product Price (Incl. GST):</td>
      <td style="text-align: right; font-weight: 600; color: #2D251E;">₹${itemsSubtotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
    </tr>
    <tr class="total-row">
      <td colspan="3" style="text-align: right; font-weight: 500;">Taxable Value:</td>
      <td style="text-align: right; font-weight: 600; color: #2D251E;">₹${taxableValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
    </tr>
  `;

  if (discount > 0) {
    rows += `
      <tr class="total-row">
        <td colspan="3" style="text-align: right; font-weight: 500; color: #10b981;">Coupon Discount:</td>
        <td style="text-align: right; font-weight: 600; color: #10b981;">-₹${discount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      </tr>
    `;
  }

  if (onlineDiscount > 0) {
    rows += `
      <tr class="total-row">
        <td colspan="3" style="text-align: right; font-weight: 500; color: #10b981;">Online Payment Discount (5%):</td>
        <td style="text-align: right; font-weight: 600; color: #10b981;">-₹${onlineDiscount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      </tr>
    `;
  }

  if (codCharge > 0) {
    rows += `
      <tr class="total-row">
        <td colspan="3" style="text-align: right; font-weight: 500; color: #E07A5F;">Handling Charge:</td>
        <td style="text-align: right; font-weight: 600; color: #E07A5F;">+₹${codCharge.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      </tr>
    `;
  }

  rows += `
    <tr class="total-row">
      <td colspan="3" style="text-align: right; font-weight: 500;">Shipping Cost:</td>
      <td style="text-align: right; font-weight: 600; color: #2D251E;">₹${shippingCost.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
    </tr>
    <tr class="total-row" style="border-top: 1px solid #E8DEC8; border-bottom: 1px solid #E8DEC8;">
      <td colspan="3" style="text-align: right; font-weight: 600; color: #2D251E;">Subtotal (Excl. GST):</td>
      <td style="text-align: right; font-weight: 700; color: #2D251E;">₹${subtotalForGst.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
    </tr>
  `;

  if (isUP) {
    const cgst = Number((gstAmount / 2).toFixed(2));
    const sgst = Number((gstAmount - cgst).toFixed(2));
    rows += `
      <tr class="total-row">
        <td colspan="3" style="text-align: right; font-weight: 500;">CGST (1.5%):</td>
        <td style="text-align: right; font-weight: 600; color: #2D251E;">₹${cgst.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      </tr>
      <tr class="total-row">
        <td colspan="3" style="text-align: right; font-weight: 500;">SGST (1.5%):</td>
        <td style="text-align: right; font-weight: 600; color: #2D251E;">₹${sgst.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      </tr>
    `;
  } else {
    rows += `
      <tr class="total-row">
        <td colspan="3" style="text-align: right; font-weight: 500;">IGST (3%):</td>
        <td style="text-align: right; font-weight: 600; color: #2D251E;">₹${gstAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      </tr>
    `;
  }

  return rows;
};

export const getInvoiceEmailTemplate = (order) => {
  const isPaid = order.paymentStatus === 'paid';
  const paymentStatusText = order.paymentStatus ? order.paymentStatus.toUpperCase() : 'PENDING';
  const paymentStatusColor = isPaid ? '#10b981' : '#f59e0b';
  
  const welcomeMessage = isPaid
    ? 'We have successfully received the payment for your order. Your transaction is complete and your corporate gifting package is confirmed for fulfillment. Here is your receipt summary:'
    : 'Thank you for your order! Your corporate gifting order has been confirmed. Below are your invoice and order details:';

  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 10px; border-bottom: 1px solid #F5EFEB; font-size: 14px; color: #2D251E; font-weight: 500;">${item.name}</td>
      <td style="padding: 12px 10px; border-bottom: 1px solid #F5EFEB; font-size: 14px; color: #7A6E65; text-align: center;">7117</td>
      <td style="padding: 12px 10px; border-bottom: 1px solid #F5EFEB; font-size: 14px; color: #7A6E65; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px 10px; border-bottom: 1px solid #F5EFEB; font-size: 14px; color: #2D251E; text-align: right; font-weight: 600;">₹${item.price.toLocaleString("en-IN")}</td>
    </tr>
  `,
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Payment Receipt & Invoice - Corporate GIFTY</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      <div class="container">
        ${getEmailHeaderHtml("Payment Invoice & Receipt")}
        <div class="content">
          <p class="greeting">Dear ${order.user?.name || "Valued Customer"},</p>
          <p class="lead-text">${welcomeMessage}</p>
          
          <table style="width: 100%; background: #FAF6F0; border: 1px solid #E8DEC8; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 14px; border-spacing: 0 6px;">
            <tr><td style="color: #6E5738;"><strong>Seller:</strong></td><td style="text-align: right; font-weight: bold; color: #2D251E;">Corporate GIFTY</td></tr>
            <tr><td style="color: #6E5738;"><strong>Order Number:</strong></td><td style="text-align: right; font-weight: bold; color: #2D251E;">#${order._id}</td></tr>
            <tr><td style="color: #6E5738;"><strong>Payment Method:</strong></td><td style="text-align: right; color: #2D251E; text-transform: uppercase;">${order.paymentMethod}</td></tr>
            <tr><td style="color: #6E5738;"><strong>Transaction Date:</strong></td><td style="text-align: right; color: #2D251E;">${new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td></tr>
            <tr><td style="color: #6E5738;"><strong>Payment Status:</strong></td><td style="text-align: right; font-weight: bold; color: ${paymentStatusColor}; text-transform: uppercase;">${paymentStatusText}</td></tr>
          </table>

          <table class="table-custom">
            <thead>
              <tr>
                <th style="text-align: left;">Product Item</th>
                <th style="text-align: center; width: 70px;">HSN</th>
                <th style="text-align: center; width: 60px;">Qty</th>
                <th style="text-align: right; width: 100px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              ${getBreakdownHtml(order)}
              <tr class="total-row">
                <td colspan="3" style="text-align: right; font-weight: bold;" class="grand-total">Total Paid <span style="font-size: 11px; font-weight: normal; color: #7A6E65; display: block;">(Inclusive of GST)</span>:</td>
                <td style="text-align: right; font-weight: bold;" class="grand-total">₹${order.totalAmount.toLocaleString("en-IN")}</td>
              </tr>
            </tbody>
          </table>

          <h4 style="margin: 25px 0 10px 0; color: #2D251E; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Delivery Address</h4>
          <p class="address-box">
            <b>${order.user?.name}</b><br/>
            ${order.shippingAddress.street}<br/>
            ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.zipCode}<br/>
            ${order.shippingAddress.country}
          </p>

          <p class="lead-text" style="margin-top: 25px;">Your items will be carefully prepared and packaged for shipping shortly. We will update you with tracking details once dispatched.</p>
          <p style="color: #7A6E65; font-size: 12px; line-height: 1.5; margin-top: 15px; border-top: 1px dashed #E8DEC8; padding-top: 10px;">* Note: All prices shown are inclusive of GST.</p>
          <p class="lead-text" style="margin-top: 20px; font-style: italic;">Warmest regards,<br/><b>The Corporate GIFTY Team</b></p>
        </div>
        ${getEmailFooterHtml()}
      </div>
    </body>
    </html>
  `;
};

export const getStatusUpdateEmailTemplate = (order, title, message) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Update - Corporate GIFTY</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      <div class="container">
        ${getEmailHeaderHtml("Order Status Update")}
        <div class="content">
          <p class="greeting">Dear ${order.user?.name || "Customer"},</p>
          <p class="lead-text">We wanted to update you on the status of your order <b>#${order._id}</b>.</p>
          
          <div style="background: #FAF6F0; border: 1px dashed #B89B72; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <p style="font-size: 16px; font-weight: 700; color: #2D251E; text-transform: uppercase; margin: 0 0 6px 0; letter-spacing: 0.5px;">${title}</p>
            <p style="font-size: 14px; color: #4A3E35; margin: 0; line-height: 1.6;">${message}</p>
          </div>

          ${
            order.tracking?.awb
              ? `
          <div style="background: #FAF6F0; border: 1px solid #E8DEC8; border-radius: 8px; padding: 18px; font-size: 14px; color: #4A3E35; margin: 20px 0;">
            <p style="margin: 4px 0;"><strong>Shipping Carrier:</strong> ${order.tracking.carrier}</p>
            <p style="margin: 4px 0;"><strong>Tracking Number (AWB):</strong> <span style="font-family: monospace; font-weight: bold; color: #B89B72;">${order.tracking.awb}</span></p>
            <div style="margin-top: 15px;">
              <a href="${order.tracking.carrier?.toLowerCase().includes('delhivery') ? 'https://www.delhivery.com/track/package/' + order.tracking.awb : 'https://shiprocket.co/tracking/' + order.tracking.awb}" target="_blank" class="btn-primary">Track Your Package</a>
            </div>
          </div>
          `
              : ""
          }

          <p style="font-size: 13px; color: #7A6E65; line-height: 1.6; margin: 20px 0 0 0;">You can check the dispatch details and track the shipment status anytime by logging into your Customer Dashboard.</p>
          <p class="lead-text" style="margin-top: 25px; font-style: italic;">Warmest regards,<br/><b>The Corporate GIFTY Team</b></p>
        </div>
        ${getEmailFooterHtml()}
      </div>
    </body>
    </html>
  `;
};

export const getWelcomeEmailTemplate = (name, otp) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to Corporate GIFTY - Verification Code</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      <div class="container">
        ${getEmailHeaderHtml("Account Verification")}
        <div class="content">
          <p class="greeting">Dear ${name},</p>
          <p class="lead-text">Thank you for joining Corporate GIFTY. We are delighted to welcome you to our premium corporate gifting platform. To complete your verification and secure your account, please use the verification code below:</p>
          
          <div class="otp-box">
            <div class="otp-label">Your Verification Code</div>
            <div class="otp-code">${otp}</div>
            <div class="expiry-note">This code is valid for the next 24 hours. Please do not share this code with anyone.</div>
          </div>

          <p class="lead-text" style="margin-bottom: 10px;">With your verified account, you can explore:</p>
          <ul style="font-size: 14px; color: #4A3E35; line-height: 1.7; padding-left: 20px; margin-bottom: 25px;">
            <li>Curated corporate gift hampers, electronics, custom apparel, and executive accessories.</li>
            <li>Interactive customizer studio with live company logo printing & embroidery previews.</li>
            <li>Bulk volume ordering, quotation downloads, fast dispatches, and dedicated customer support.</li>
          </ul>

          <p class="lead-text">If you did not initiate this request, you can safely ignore this email.</p>
          <p class="lead-text" style="margin-top: 25px; font-style: italic;">Warmest regards,<br/><b>The Corporate GIFTY Team</b></p>
        </div>
        ${getEmailFooterHtml()}
      </div>
    </body>
    </html>
  `;
};

export const getForgotPasswordEmailTemplate = (name, otp) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Reset Your Password - Corporate GIFTY</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      <div class="container">
        ${getEmailHeaderHtml("Password Recovery")}
        <div class="content">
          <p class="greeting">Dear ${name},</p>
          <p class="lead-text">We received a request to reset the password for your Corporate GIFTY account. To continue securely, please use the verification code below:</p>
          
          <div class="otp-box">
            <div class="otp-label">Your Password Recovery Code</div>
            <div class="otp-code">${otp}</div>
            <div class="expiry-note">This code is valid for the next 30 minutes. Please do not share this code with anyone.</div>
          </div>

          <div style="background: #FAF6F0; border-left: 4px solid #B89B72; padding: 14px 16px; border-radius: 4px; margin-top: 20px; color: #4A3E35; font-size: 13px; line-height: 1.6;">
            If you did not request this change, you can safely ignore this email. Your password will remain unchanged.
          </div>
          <p class="lead-text" style="margin-top: 25px; font-style: italic;">Warmest regards,<br/><b>The Corporate GIFTY Team</b></p>
        </div>
        ${getEmailFooterHtml()}
      </div>
    </body>
    </html>
  `;
};

export const getOrderPlacedEmailTemplate = (order) => {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 10px; border-bottom: 1px solid #F5EFEB; font-size: 14px; color: #2D251E; font-weight: 500;">${item.name}</td>
      <td style="padding: 12px 10px; border-bottom: 1px solid #F5EFEB; font-size: 14px; color: #7A6E65; text-align: center;">7117</td>
      <td style="padding: 12px 10px; border-bottom: 1px solid #F5EFEB; font-size: 14px; color: #7A6E65; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px 10px; border-bottom: 1px solid #F5EFEB; font-size: 14px; color: #2D251E; text-align: right; font-weight: 600;">₹${item.price.toLocaleString("en-IN")}</td>
    </tr>
  `,
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation - Corporate GIFTY</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      <div class="container">
        ${getEmailHeaderHtml("Order Confirmation")}
        <div class="content">
          <p class="greeting">Dear ${order.user?.name || "Valued Customer"},</p>
          <p class="lead-text">Thank you for placing your order with Corporate GIFTY. We are excited to fulfill your gifting package! Here is a summary of your order:</p>
          
          <table style="width: 100%; background: #FAF6F0; border: 1px solid #E8DEC8; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 14px; border-spacing: 0 6px;">
            <tr><td style="color: #6E5738;"><strong>Seller:</strong></td><td style="text-align: right; font-weight: bold; color: #2D251E;">Corporate GIFTY</td></tr>
            <tr><td style="color: #6E5738;"><strong>Order Number:</strong></td><td style="text-align: right; font-weight: bold; color: #2D251E;">#${order._id}</td></tr>
            <tr><td style="color: #6E5738;"><strong>Payment Mode:</strong></td><td style="text-align: right; color: #2D251E; text-transform: uppercase;">${order.paymentMethod}</td></tr>
            <tr><td style="color: #6E5738;"><strong>Date Placed:</strong></td><td style="text-align: right; color: #2D251E;">${new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td></tr>
          </table>

          <table class="table-custom">
            <thead>
              <tr>
                <th style="text-align: left;">Product Item</th>
                <th style="text-align: center; width: 70px;">HSN</th>
                <th style="text-align: center; width: 60px;">Qty</th>
                <th style="text-align: right; width: 100px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              ${getBreakdownHtml(order)}
              <tr class="total-row">
                <td colspan="3" style="text-align: right; font-weight: bold;" class="grand-total">Total Amount <span style="font-size: 11px; font-weight: normal; color: #7A6E65; display: block;">(Inclusive of GST)</span>:</td>
                <td style="text-align: right; font-weight: bold;" class="grand-total">₹${order.totalAmount.toLocaleString("en-IN")}</td>
              </tr>
            </tbody>
          </table>

          <h4 style="margin: 25px 0 10px 0; color: #2D251E; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Delivery Address</h4>
          <p class="address-box">
            <b>${order.user?.name}</b><br/>
            ${order.shippingAddress.street}<br/>
            ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.zipCode}<br/>
            ${order.shippingAddress.country}
          </p>

          <p class="lead-text" style="margin-top: 25px;">We are verifying the order specifications and preparing it for fulfillment. You will receive another update as soon as your package is dispatched.</p>
          <p style="color: #7A6E65; font-size: 12px; line-height: 1.5; margin-top: 15px; border-top: 1px dashed #E8DEC8; padding-top: 10px;">* Note: All prices shown are inclusive of GST.</p>
          <p class="lead-text" style="margin-top: 20px; font-style: italic;">Warmest regards,<br/><b>The Corporate GIFTY Team</b></p>
        </div>
        ${getEmailFooterHtml()}
      </div>
    </body>
    </html>
  `;
};

export const getReturnRequestedEmailTemplate = (
  order,
  replacementRequest,
  name,
) => {
  const itemsHtml = replacementRequest.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 10px; border-bottom: 1px solid #F5EFEB; font-size: 14px; color: #2D251E; font-weight: 500;">${item.name}</td>
      <td style="padding: 12px 10px; border-bottom: 1px solid #F5EFEB; font-size: 14px; color: #7A6E65; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px 10px; border-bottom: 1px solid #F5EFEB; font-size: 14px; color: #2D251E; text-align: right; font-weight: 600;">₹${item.price.toLocaleString("en-IN")}</td>
    </tr>
  `,
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Replacement Request Received - Corporate GIFTY</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      <div class="container">
        ${getEmailHeaderHtml("Replacement Request Received")}
        <div class="content">
          <p class="greeting">Dear ${name || "Customer"},</p>
          <p class="lead-text">We have received your replacement request for Order <b>#${order._id}</b>. Our customer support team is currently reviewing your ticket:</p>
          
          <table style="width: 100%; background: #FAF6F0; border: 1px solid #E8DEC8; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 14px; border-spacing: 0 6px;">
            <tr><td style="color: #6E5738;"><strong>Order Number:</strong></td><td style="text-align: right; font-weight: bold; color: #2D251E;">#${order._id}</td></tr>
            <tr><td style="color: #6E5738;"><strong>Request Status:</strong></td><td style="text-align: right; color: #f59e0b; font-weight: bold; text-transform: uppercase;">${replacementRequest.status}</td></tr>
            <tr><td style="color: #6E5738;"><strong>Reason:</strong></td><td style="text-align: right; color: #2D251E;">${replacementRequest.reason}</td></tr>
            <tr><td style="color: #6E5738;"><strong>Description:</strong></td><td style="text-align: right; color: #2D251E;">${replacementRequest.description}</td></tr>
          </table>

          <table class="table-custom">
            <thead>
              <tr>
                <th style="text-align: left;">Replacement Item</th>
                <th style="text-align: center; width: 60px;">Qty</th>
                <th style="text-align: right; width: 100px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <p class="lead-text" style="margin-top: 25px;">Our team typically reviews requests within 1–2 business days. You will receive an email update once the replacement request is processed.</p>
          <p class="lead-text" style="margin-top: 25px; font-style: italic;">Warmest regards,<br/><b>The Corporate GIFTY Team</b></p>
        </div>
        ${getEmailFooterHtml()}
      </div>
    </body>
    </html>
  `;
};

export const getReturnStatusUpdateEmailTemplate = (
  order,
  replacementRequest,
  name,
) => {
  const itemsHtml = replacementRequest.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 10px; border-bottom: 1px solid #F5EFEB; font-size: 14px; color: #2D251E; font-weight: 500;">${item.name}</td>
      <td style="padding: 12px 10px; border-bottom: 1px solid #F5EFEB; font-size: 14px; color: #7A6E65; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px 10px; border-bottom: 1px solid #F5EFEB; font-size: 14px; color: #2D251E; text-align: right; font-weight: 600;">₹${item.price.toLocaleString("en-IN")}</td>
    </tr>
  `,
    )
    .join("");

  const statusColor =
    replacementRequest.status === "approved" ||
    replacementRequest.status === "replaced"
      ? "#10b981"
      : replacementRequest.status === "rejected"
        ? "#E07A5F"
        : "#f59e0b";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Replacement Request Update - Corporate GIFTY</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      <div class="container">
        ${getEmailHeaderHtml("Replacement Status Update")}
        <div class="content">
          <p class="greeting">Dear ${name || "Customer"},</p>
          <p class="lead-text">There has been an update regarding your replacement request for Order <b>#${order._id}</b>.</p>
          
          <div style="background: #FAF6F0; border: 1px dashed ${statusColor}; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <div style="font-size: 16px; font-weight: 700; color: ${statusColor}; text-transform: uppercase; margin-bottom: 6px;">Status: ${replacementRequest.status}</div>
            <p style="font-size: 14px; color: #4A3E35; margin: 0;">
              ${replacementRequest.adminNotes ? `Admin Notes: "${replacementRequest.adminNotes}"` : `Your request status has been updated to "${replacementRequest.status}".`}
            </p>
          </div>

          <table class="table-custom">
            <thead>
              <tr>
                <th style="text-align: left;">Product Item</th>
                <th style="text-align: center; width: 60px;">Qty</th>
                <th style="text-align: right; width: 100px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <p class="lead-text" style="margin-top: 25px;">For any questions, feel free to contact our support desk.</p>
          <p class="lead-text" style="margin-top: 25px; font-style: italic;">Warmest regards,<br/><b>The Corporate GIFTY Team</b></p>
        </div>
        ${getEmailFooterHtml()}
      </div>
    </body>
    </html>
  `;
};

export const getContactThankYouEmailTemplate = (name, subject, message) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank You for Contacting Corporate GIFTY</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      <div class="container">
        ${getEmailHeaderHtml("Inquiry Received")}
        <div class="content">
          <p class="greeting">Dear ${name},</p>
          <p class="lead-text">Thank you for reaching out to the Corporate GIFTY team. We have received your inquiry and our team is already reviewing it. A corporate gifting specialist has been assigned to your request and will reply shortly.</p>
          
          <div class="info-card">
            <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #8E734C; margin-bottom: 10px; font-weight: 700; border-bottom: 1px solid #E8DEC8; padding-bottom: 6px;">Inquiry Details Received</div>
            <div style="font-size: 14px; color: #4A3E35; margin-bottom: 8px; line-height: 1.5;"><strong>Subject:</strong> ${subject}</div>
            <div style="font-size: 14px; color: #4A3E35; line-height: 1.5;"><strong>Message Summary:</strong><br/>${message}</div>
          </div>
 
          <p class="lead-text">We look forward to assisting you in designing and fulfilling your corporate gifting requirements.</p>
          <p class="lead-text" style="margin-top: 25px; font-style: italic;">Warmest regards,<br/><b>The Corporate GIFTY Team</b></p>
        </div>
        ${getEmailFooterHtml()}
      </div>
    </body>
    </html>
  `;
};

export const getAccountStatusEmailTemplate = (name, isActive) => {
  const statusTitle = isActive ? "Account Activated" : "Account Suspended";
  const statusMessage = isActive
    ? "We are pleased to inform you that your Corporate GIFTY account has been successfully activated. You can now log in, customize corporate gifting merchandise, place orders, and manage your bulk quotes."
    : "We regret to inform you that your Corporate GIFTY account has been temporarily suspended/deactivated. If you believe this is an error or wish to appeal this decision, please contact our support desk.";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Corporate GIFTY - ${statusTitle}</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      <div class="container">
        ${getEmailHeaderHtml("Account Notification")}
        <div class="content">
          <p class="greeting">Dear ${name},</p>
          <p class="lead-text">There has been an update regarding your customer account status with Corporate GIFTY.</p>
          
          <div class="otp-box">
            <div class="otp-label">Account Status</div>
            <div style="font-size: 22px; font-weight: 700; color: ${isActive ? "#10b981" : "#E07A5F"}; letter-spacing: 0.5px; margin: 4px 0;">${statusTitle}</div>
          </div>

          <p class="lead-text">${statusMessage}</p>
          
          ${
            isActive
              ? `
          <p class="lead-text">To log in, please visit our store and sign in with your registered credentials.</p>
          `
              : `
          <p class="lead-text">If you have any pending orders, please reach out to our support representatives for status inquiries.</p>
          `
          }

          <p class="lead-text" style="margin-top: 25px; font-style: italic;">Warmest regards,<br/><b>The Corporate GIFTY Team</b></p>
        </div>
        ${getEmailFooterHtml()}
      </div>
    </body>
    </html>
  `;
};
