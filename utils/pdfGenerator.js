const PDFDocument = require("pdfkit");

function generateCatalogPDF(
  { vendor, products, logoBuffer, includeStock, style },
  res
) {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=catalog.pdf");

  doc.pipe(res);

  // Add logo if provided
  if (logoBuffer) {
    doc.image(logoBuffer, 50, 20, { width: 100 });
  }

  // Vendor details
  doc.fontSize(20).text("Vendor Information", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12);
  doc.text(`Name: ${vendor.name}`);
  doc.text(`Company: ${vendor.company}`);
  doc.text(`Email: ${vendor.email}`);
  doc.text(`Phone: ${vendor.phone}`);
  doc.text(
    `Address: ${vendor.address.street}, ${vendor.address.city}, ${vendor.address.state}, ${vendor.address.zip}, ${vendor.address.country}`
  );
  doc.text(`Status: ${vendor.status}`);
  doc.text(`Created At: ${new Date(vendor.createdAt).toLocaleDateString()}`);
  doc.moveDown(1.5);

  // Product details
  doc.fontSize(20).text("Products Catalog", { underline: true });
  doc.moveDown(0.5);

  if (products.length === 0) {
    doc.fontSize(14).text("No products found for this vendor.");
  } else {
    products.forEach((product, index) => {
      doc.fontSize(14).text(`Product ${index + 1}`, { underline: true });
      doc.fontSize(12);
      doc.text(`Name: ${product.name}`);
      doc.text(`Category: ${product.category}`);
      doc.text(`Price: ₹${product.price}`);
      doc.text(`Description: ${product.description}`);
      if (includeStock && product.stock !== undefined) {
        doc.text(`Stock: ${product.stock}`);
      }
      if (product.imageUrl) {
        doc.text(`Image URL: ${product.imageUrl}`);
      }
      doc.moveDown();
    });
  }

  doc.end();
}

module.exports = generateCatalogPDF;
