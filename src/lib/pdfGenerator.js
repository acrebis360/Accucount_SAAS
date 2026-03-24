import autoTable from "jspdf-autotable";



/**
 * Adds Customer logo, report title, and Acrebis logo to the document.
 * @param {jsPDF} doc - The jsPDF instance.
 * @param {string} title - The title of the report.
 * @param {string} orientation - 'portrait' or 'landscape'.
 * @param {string} customerLogo - The customer logo URL or base64.
 */
export const addReportLogos = (doc, title, orientation = 'portrait', customerLogo = null) => {
    const isLandscape = orientation === 'landscape';
    const pageWidth = isLandscape ? 297 : 210;
    const logoRightX = isLandscape ? 260 : 175;

    // Standardized Header Border (Top, Side, and Bottom)
    doc.setDrawColor(0);
    doc.setLineWidth(0.1); // Reduced thickness
    doc.rect(10, 5, pageWidth - 20, 30); // From y=5 to y=35

    // Add Customer Logo
    if (customerLogo) {
        try {
            // Detect format properly
            let format = 'PNG'; // Default
            if (typeof customerLogo === 'string') {
                if (customerLogo.startsWith('data:image/')) {
                    // Extract format from Data URI: data:image/jpeg;base64,...
                    const mime = customerLogo.split(';')[0].split(':')[1];
                    format = mime.split('/')[1].toUpperCase();
                    if (format === 'JPG') format = 'JPEG';
                } else {
                    // Guess from URL extension
                    const lowerLogo = customerLogo.toLowerCase();
                    if (lowerLogo.includes('.jpg') || lowerLogo.includes('.jpeg')) {
                        format = 'JPEG';
                    }
                }
            }

            // Standardize format names for jsPDF
            if (format !== 'JPEG' && format !== 'PNG' && format !== 'WEBP') {
                format = 'PNG'; // Fallback
            }

            // doc.addImage(imageData, format, x, y, width, height, alias, compression)
            doc.addImage(customerLogo, format, 15, 8, 20, 20, undefined, 'FAST');
        } catch (e) {
            console.error("Error adding customer logo to PDF:", e);
            // Fallback placeholder (Safer text)
            doc.setFontSize(14);
            doc.setTextColor(150);
            doc.setFont("helvetica", "normal");
            doc.text("CUSTOMER LOGO", 15, 20);
        }
    } else {
        // Default Placeholder
        doc.setFontSize(14);
        doc.setTextColor(150);
        doc.setFont("helvetica", "normal");
        doc.text("CUSTOMER LOGO", 15, 20);
    }

    // Add Title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal"); // Lighter look for title
    doc.text(title.toUpperCase(), pageWidth / 2, 25, { align: "center" });

    // Add Acrebis Logo (Red Text)
    doc.setFontSize(18);
    doc.setTextColor(255, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("acrebis", logoRightX, 20, { align: "left" });
};

/**
 * Adds the shared event details table to the document.
 * @param {jsPDF} doc - The jsPDF instance.
 * @param {Object} eventData - The event metadata.
 * @param {number} startY - The vertical starting position.
 */
export const addEventTable = (doc, eventData, startY = 35) => {
    const labelStyle = {
        fillColor: [242, 242, 242],
        fontStyle: 'normal', // Changed from bold to normal for a lighter look
        textColor: [0, 0, 0],
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
        fontSize: 9
    };

    const valueStyle = {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
        fontSize: 9
    };

    autoTable(doc, {
        startY: startY,
        body: [
            [
                { content: 'Event ID', styles: labelStyle },
                { content: eventData.eventId || "N/A", styles: valueStyle },
                { content: 'Date of Stock Take', styles: labelStyle },
                { content: eventData.dateOfStockTake || "N/A", styles: valueStyle }

            ],
            [
                { content: 'Customer Name', styles: labelStyle },
                { content: eventData.customerName || "N/A", styles: valueStyle },
                { content: 'Time of Stock Take', styles: labelStyle },
                { content: eventData.timeOfStockTake || "N/A", styles: valueStyle }

            ],
            [
                { content: 'Outlet Address', styles: labelStyle },
                { content: eventData.outletAddress || "N/A", styles: valueStyle, colSpan: 3 }
            ],
            [
                { content: 'ACREBIS Supervisor', styles: labelStyle },
                { content: eventData.acrebisSupervisor || "N/A", styles: valueStyle },
                { content: 'Customer Supervisor', styles: labelStyle },
                { content: eventData.customerSupervisor || "BHARAT NARA", styles: valueStyle }
            ],
        ],
        theme: 'grid',
        styles: {
            fontSize: 9,
            cellPadding: 3,
            overflow: 'linebreak',
            valign: 'middle',
            lineWidth: 0.1, // Subtle inner lines
            lineColor: [0, 0, 0],
            fontStyle: 'normal'
        },
        tableLineWidth: 0.1, // Single standardized border
        tableLineColor: [0, 0, 0],
        columnStyles: {
            0: { cellWidth: 35 },
            1: { cellWidth: 'auto' },
            2: { cellWidth: 35 },
            3: { cellWidth: 'auto' }
        },
        margin: { left: 10, right: 10 }
    });
};

/**
 * Generates the Customer Feedback Form (Post Inventory Quality Audit) as seen in the reference image.
 * @param {jsPDF} doc - The jsPDF instance.
 * @param {Object} data - The data to fill in the form.
 */
export const generateFeedbackForm = (doc, data = {}) => {
    // Top Left: B - Customer Feedback Form (Orange/Brown color)
    doc.setFontSize(10);
    doc.setTextColor(194, 91, 23); // Roughly orange-brown
    doc.setFont("helvetica", "bold");
    doc.text("B - Customer Feedback Form", 10, 15);

    // Top Right: acrebis (Red, bold, large)
    doc.setFontSize(22);
    doc.setTextColor(255, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("acrebis", 200, 15, { align: "right" });

    // Main Title: Post Inventory Quality Audit (Centered, bold)
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("Post Inventory Quality Audit", 105, 30, { align: "center" });

    const labelStyle = {
        fillColor: [245, 245, 245], // Light grey background for labels
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        fontSize: 9,
        cellPadding: 2,
        lineColor: [0, 0, 0],
        lineWidth: 0.1
    };

    const valueStyle = {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontSize: 9,
        cellPadding: 2,
        lineColor: [0, 0, 0],
        lineWidth: 0.1
    };

    // Header Table 1: Date and Supervisor
    autoTable(doc, {
        startY: 38,
        body: [
            [
                { content: "Date of Inventory Count", styles: labelStyle },
                { content: data.dateOfInventoryCount || "", styles: valueStyle },
                { content: "Name of ACREBIS Supervisor", styles: labelStyle },
                { content: data.acrebisSupervisor || "", styles: valueStyle },
            ]
        ],
        theme: 'grid',
        styles: { lineColor: [0, 0, 0], lineWidth: 0.1 },
        columnStyles: {
            0: { cellWidth: 45 },
            1: { cellWidth: 50 },
            2: { cellWidth: 45 },
            3: { cellWidth: 50 },
        },
        margin: { left: 10, right: 10 }
    });

    // Header Table 2: Customer, Outlet Code, Manager
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY,
        body: [
            [
                { content: "Name of Customer", styles: labelStyle },
                { content: "Outlet Code", styles: labelStyle },
                { content: "Name of Outlet Manager", styles: labelStyle },
            ],
            [
                { content: data.customerName || "", styles: { ...valueStyle, minCellHeight: 10 } },
                { content: data.outletCode || "", styles: { ...valueStyle, minCellHeight: 10 } },
                { content: data.outletManager || "", styles: { ...valueStyle, minCellHeight: 10 } },
            ]
        ],
        theme: 'grid',
        styles: { lineColor: [0, 0, 0], lineWidth: 0.1 },
        columnStyles: {
            0: { cellWidth: 70 },
            1: { cellWidth: 50 },
            2: { cellWidth: 70 },
        },
        margin: { left: 10, right: 10 }
    });

    // Auditor/Quantity Table
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 5,
        body: [
            [
                { content: "Number of Auditors", styles: { ...labelStyle, cellWidth: 60 } },
                { content: data.numberOfAuditors || "", styles: { ...valueStyle, cellWidth: 30 } },
            ],
            [
                { content: "Quantity", styles: { ...labelStyle, cellWidth: 60 } },
                { content: data.quantity || "", styles: { ...valueStyle, cellWidth: 30 } },
            ],
        ],
        theme: 'grid',
        styles: { lineColor: [0, 0, 0], lineWidth: 0.1 },
        margin: { left: 10, right: 10 }
    });

    // Rating Header
    const currentY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("Rating on 1-5: Circle the Selection", 200, currentY, { align: "right" });
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("1- Poor 2-Average 3-Good 4-Very Good 5-Execellent", 200, currentY + 4, { align: "right" });

    // Rating Table
    const ratingRows = [
        ["Accuracy", "1", "2", "3", "4", "5"],
        ["Adherence to Procedure", "1", "2", "3", "4", "5"],
        ["Efficiency", "1", "2", "3", "4", "5"],
        ["Appearance", "1", "2", "3", "4", "5"],
        ["Courtesy and Cooperation", "1", "2", "3", "4", "5"],
        ["Supervisor Impression", "1", "2", "3", "4", "5"],
        ["Overall Performance", "1", "2", "3", "4", "5"],
    ];

    autoTable(doc, {
        startY: currentY + 6,
        body: ratingRows,
        theme: 'grid',
        styles: { fontSize: 9, cellPadding: 3, lineColor: [0, 0, 0], lineWidth: 0.1, halign: 'center' },
        columnStyles: {
            0: { cellWidth: 70, halign: 'left', fontStyle: 'bold' },
            1: { cellWidth: 24 },
            2: { cellWidth: 24 },
            3: { cellWidth: 24 },
            4: { cellWidth: 24 },
            5: { cellWidth: 24 },
        },
        margin: { left: 10, right: 10 }
    });

    // Customer Comments
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY,
        body: [
            [{ content: "Customer Comments", styles: { ...labelStyle, halign: 'left' } }],
            [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "]
        ],
        theme: 'grid',
        styles: { minCellHeight: 8, lineColor: [0, 0, 0], lineWidth: 0.1 },
        margin: { left: 10, right: 10 }
    });

    // Footer
    const footerY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");

    doc.text("Name of Customer Representative", 10, footerY + 10);
    doc.text("Signature of Customer Representative", 110, footerY + 10);
    doc.line(10, footerY + 11, 80, footerY + 11); // Line for name
    doc.line(110, footerY + 11, 200, footerY + 11); // Line for signature

    doc.text("Date / Place / Time", 10, footerY + 30);
    doc.line(10, footerY + 31, 80, footerY + 31); // Line for date/place/time
};
