"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function TradeSystem() {
  const [rows, setRows] = useState([{ qty: "", price: "", type: "BUY" }]);

  const addRow = () => setRows([...rows, { qty: "", price: "", type: "BUY" }]);

  const update = (i, field, val) => {
    const copy = [...rows];
    copy[i][field] = val;
    setRows(copy);
  };

  const total = rows.reduce(
    (s, r) => s + (parseFloat(r.qty || 0) * parseFloat(r.price || 0)),
    0
  );

  const exportPDF = async () => {
    const el = document.getElementById("report");
    if (!el) return;

    const canvas = await html2canvas(el, { scale: 2 });
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;

    pdf.addImage(img, "PNG", 0, 0, w, h);
    pdf.save("trade-report.pdf");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#020617", color: "white", padding: 24 }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 20 }}>
        📊 Trade Report System
      </h1>

      <div style={{ display: "grid", gap: 10 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <input
              placeholder="Qty"
              value={r.qty}
              onChange={(e) => update(i, "qty", e.target.value)}
              style={inp}
            />
            <input
              placeholder="Price"
              value={r.price}
              onChange={(e) => update(i, "price", e.target.value)}
              style={inp}
            />
            <select value={r.type} onChange={(e) => update(i, "type", e.target.value)} style={inp}>
              <option>BUY</option>
              <option>SELL</option>
            </select>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14 }}>
        <button onClick={addRow} style={btn}>
          + Add Row
        </button>
      </div>

      <div id="report" style={card}>
        <h2>Trade Summary</h2>
        <table style={{ width: "100%", marginTop: 10 }}>
          <thead>
            <tr>
              <th>Qty</th>
              <th>Price</th>
              <th>Type</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.qty}</td>
                <td>{r.price}</td>
                <td>{r.type}</td>
                <td>₹{(r.qty * r.price || 0).toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 style={{ marginTop: 12 }}>
          Total: ₹{total.toLocaleString("en-IN")}
        </h2>
      </div>

      <button onClick={exportPDF} style={pdfBtn}>
        ⬇ Download PDF
      </button>
    </div>
  );
}

const inp = {
  background: "#020617",
  border: "1px solid #334155",
  borderRadius: 8,
  padding: "10px",
  color: "white",
  fontSize: 14
};

const btn = {
  background: "#4f46e5",
  border: "none",
  borderRadius: 8,
  padding: "10px 18px",
  color: "white",
  fontWeight: 700,
  cursor: "pointer"
};

const pdfBtn = {
  marginTop: 16,
  background: "#0284c7",
  border: "none",
  borderRadius: 8,
  padding: "12px 22px",
  color: "white",
  fontWeight: 700,
  cursor: "pointer"
};

const card = {
  marginTop: 20,
  background: "#020617",
  border: "1px solid #334155",
  borderRadius: 10,
  padding: 16
};
