import React, { useState } from "react";

export default function ExampleSection({ id, title, description, children, code }) {
  const [showCode, setShowCode] = useState(false);

  return (
    <section id={id} className="exampleSection">
      <div className="exampleHeader">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="exampleBody">
        <div className="exampleDemo">{children}</div>
        <div className="exampleMeta">
          <button
            type="button"
            className="codeToggle"
            onClick={() => setShowCode((value) => !value)}
          >
            {showCode ? "Hide code" : "Show code"}
          </button>
          {showCode ? <pre className="codeBlock"><code>{code}</code></pre> : null}
        </div>
      </div>
    </section>
  );
}
