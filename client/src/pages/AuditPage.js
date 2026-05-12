import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

function AuditPage() {

  const { id } = useParams();

  const [audit, setAudit] = useState(null);

  useEffect(() => {

    fetch(`https://aistack-audit-backend.onrender.com/audit/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAudit(data);
      });

  }, [id]);

  if (!audit) {

    return <h2>Loading audit...</h2>;

  }

  return (

    <div style={{ padding: "30px" }}>
<p>
  Public Shareable Audit Report
</p>
      <h1>AIStack Audit Report</h1>

      <h2>
        Total Monthly Savings:
        ${audit.totalSavings}
      </h2>

      <h2>
        Annual Savings:
        ${audit.totalSavings * 12}
      </h2>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          marginBottom: "20px",
        }}
      >

        <h2>AI Summary</h2>

        <p>{audit.summary}</p>

      </div>

      <h2>Recommendations</h2>

      {audit.results.map((result, index) => (

        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
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
            Savings:
            ${result.savings}/month
          </p>

        </div>

      ))}

    </div>

  );

}

export default AuditPage;