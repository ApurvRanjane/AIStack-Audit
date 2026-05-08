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

    setResults(auditResults);
  };
  const totalSavings = results.reduce((total, item) => total + item.savings, 0);
  return (
    <div>
      <h2>Enter AI Tool Spending</h2>

      {tools.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
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
      <div style={{ marginTop: "30px" }}>
        <h2>Total Monthly Savings: ${totalSavings}</h2>

        <h2>Annual Savings: ${totalSavings * 12}</h2>
        <h2>Audit Results</h2>

        {results.map((result, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>{result.tool}</h3>

            <p>
              Recommendation:
              {result.recommendation}
            </p>

            <p>Potential Savings: ${result.savings}/month</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToolForm;
