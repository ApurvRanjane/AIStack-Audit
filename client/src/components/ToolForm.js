import { useState, useEffect } from "react";

function ToolForm() {
  const [tools, setTools] = useState(() => {
    const savedTools = localStorage.getItem("tools");

    return savedTools
      ? JSON.parse(savedTools)
      : [
          {
            tool: "",
            plan: "",
            spend: "",
            seats: "",
            useCase: "",
          },
        ];
  });

  const [results, setResults] = useState([]);

  const [summary, setSummary] = useState("");

  const [email, setEmail] = useState("");
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    localStorage.setItem("tools", JSON.stringify(tools));
  }, [tools]);

  const handleChange = (index, event) => {
    const values = [...tools];

    values[index][event.target.name] = event.target.value;

    setTools(values);
  };

  const addTool = () => {
    setTools([
      ...tools,
      {
        tool: "",
        plan: "",
        spend: "",
        seats: "",
        useCase: "",
      },
    ]);
  };

  const removeTool = (index) => {
    const values = [...tools];

    values.splice(index, 1);

    setTools(values);
  };

  const generateSummary = (auditResults, totalSavings) => {
    let text = "";

    if (totalSavings > 0) {
      text =
        `Your organization may be overspending on AI subscriptions. ` +
        `The audit identified approximately $${totalSavings} in potential monthly savings through better plan optimization and reduced overlap between tools.`;
    } else {
      text =
        "Your current AI spending appears relatively optimized based on the provided inputs.";
    }

    setSummary(text);
  };

  const generateAudit = () => {
    let auditResults = [];

    tools.forEach((item) => {
      let recommendation = "";
      let savings = 0;

      // Rule 1
      if (item.plan.toLowerCase() === "team" && Number(item.seats) <= 2) {
        recommendation = "Switch to Plus plan";
        savings = 80;
      }

      // Rule 2
      else if (
        item.tool.toLowerCase() === "claude" &&
        Number(item.spend) > 20
      ) {
        recommendation = "Claude Pro may be unnecessary";
        savings = 20;
      }

      // Rule 3
      else if (Number(item.seats) > 5) {
        recommendation = "Reduce unused seats";
        savings = 50;
      } else {
        recommendation = "Current plan looks optimized";
        savings = 0;
      }

      auditResults.push({
        tool: item.tool,
        plan: item.plan,
        recommendation,
        savings,
      });
    });

    const total = auditResults.reduce((sum, item) => sum + item.savings, 0);

    generateSummary(auditResults, total);

    setResults(auditResults);
  };

  const saveAudit = async () => {
    const payload = {
      email,
      tools,
      results,
      summary,
      totalSavings,
    };

    const response = await fetch("https://aistack-audit-backend.onrender.com/save-audit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    const generatedUrl = `http://localhost:3000/audit/${data.audit.id}`;

    setShareUrl(generatedUrl);

    alert("Audit saved successfully!");
  };

  const totalSavings = results.reduce((total, item) => total + item.savings, 0);

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h1
        style={{
          fontSize: "40px",
          marginBottom: "10px",
        }}
      >
        AIStack Audit
      </h1>

      <p
        style={{
          color: "#555",
          marginBottom: "30px",
        }}
      >
        Analyze your AI subscriptions, identify overspending, and discover
        optimization opportunities instantly.
      </p>
      <h2>Enter AI Tool Spending</h2>

      {tools.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            backgroundColor: "#fafafa",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            name="tool"
            placeholder="Tool Name"
            value={item.tool}
            onChange={(event) => handleChange(index, event)}
            style={{ margin: "5px" }}
          />

          <input
            type="text"
            name="plan"
            placeholder="Plan"
            value={item.plan}
            onChange={(event) => handleChange(index, event)}
            style={{ margin: "5px" }}
          />

          <input
            type="number"
            name="spend"
            placeholder="Monthly Spend"
            value={item.spend}
            onChange={(event) => handleChange(index, event)}
            style={{ margin: "5px" }}
          />

          <input
            type="number"
            name="seats"
            placeholder="Seats"
            value={item.seats}
            onChange={(event) => handleChange(index, event)}
            style={{ margin: "5px" }}
          />

          <input
            type="text"
            name="useCase"
            placeholder="Use Case"
            value={item.useCase}
            onChange={(event) => handleChange(index, event)}
            style={{ margin: "5px" }}
          />

          <br />

          <button
            onClick={() => removeTool(index)}
            style={{ marginTop: "10px" }}
          >
            Remove
          </button>
        </div>
      ))}

      <button onClick={addTool}>Add Tool</button>

      <br />
      <br />

      <button onClick={generateAudit}>Generate Audit</button>

      <br />
      <br />

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />

      <br />
      <br />

      <button onClick={saveAudit}>Save Audit</button>

      {shareUrl && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
          }}
        >
          <h3>Shareable Audit URL</h3>

          <a href={shareUrl} target="_blank" rel="noreferrer">
            {shareUrl}
          </a>
        </div>
      )}

      {results.length === 0 && <p>No audit generated yet.</p>}

      <div style={{ marginTop: "30px" }}>
        <h2
          style={{
            color: "#16a34a",
            fontSize: "32px",
          }}
        >
          Total Monthly Savings: ${totalSavings}
        </h2>

        <h2>Annual Savings: ${totalSavings * 12}</h2>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "20px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <h2>AI Generated Summary</h2>

          <p>{summary}</p>
        </div>

        <h2>Audit Results</h2>

        {results.map((result, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              backgroundColor: "#ffffff",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <h3>
              {result.tool} — {result.plan}
            </h3>

            <p>
              Recommendation:
              {result.recommendation}
            </p>

            <p>
              Potential Savings:
              <strong>${result.savings}/month</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToolForm;
