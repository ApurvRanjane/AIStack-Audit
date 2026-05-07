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
            useCase: ""
          }
        ];
  });

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
        useCase: ""
      }
    ]);

  };

  const removeTool = (index) => {

    const values = [...tools];

    values.splice(index, 1);

    setTools(values);

  };

  return (

    <div>

      <h2>Enter AI Tool Spending</h2>

      {tools.map((item, index) => (

        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "20px"
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

      <button onClick={addTool}>
        Add Tool
      </button>

      <br /><br />

      <button>
        Generate Audit
      </button>

    </div>

  );

}

export default ToolForm;