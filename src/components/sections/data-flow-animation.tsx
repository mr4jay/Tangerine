export function DataFlowAnimation() {
  return (
    <svg
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg mx-auto"
      aria-labelledby="data-flow-title"
      role="img"
    >
      <title id="data-flow-title">Data Flow Animation</title>
      <defs>
        <style>
          {`
            .node {
              fill: hsl(var(--primary));
              stroke: hsl(var(--primary-foreground));
              stroke-width: 1;
              animation: pulse 4s ease-in-out infinite;
            }
            .line {
              stroke: hsl(var(--foreground));
              stroke-width: 1.5;
              stroke-dasharray: 8;
              animation: dash 8s linear infinite;
            }
            .text {
              font-family: 'Inter', sans-serif;
              font-size: 14px;
              fill: hsl(var(--foreground));
              font-weight: 600;
            }
            @keyframes pulse {
              0%, 100% { r: 18; opacity: 1; }
              50% { r: 22; opacity: 0.8; }
            }
            @keyframes dash {
              from { stroke-dashoffset: 1000; }
              to { stroke-dashoffset: 0; }
            }
            .node-1 { animation-delay: 0s; }
            .node-2 { animation-delay: 1s; }
            .node-3 { animation-delay: 2s; }
            .node-4 { animation-delay: 3s; }
            .line-1 { animation-delay: 0s; }
            .line-2 { animation-delay: -2s; }
            .line-3 { animation-delay: -4s; }
          `}
        </style>
      </defs>

      <g>
        {/* Lines */}
        <path d="M 70 70 Q 150 70, 200 150" fill="none" className="line line-1" />
        <path d="M 70 230 Q 150 230, 200 150" fill="none" className="line line-2" />
        <path d="M 200 150 H 330" fill="none" className="line line-3" />

        {/* Nodes and Text */}
        <g transform="translate(50, 70)">
          <circle className="node node-1" r="20" />
          <text x="0" y="5" textAnchor="middle" className="text" fill="hsl(var(--primary-foreground))">S3</text>
        </g>
        <text x="50" y="105" textAnchor="middle" className="text">Data Lake</text>

        <g transform="translate(50, 230)">
          <circle className="node node-2" r="20" />
          <text x="0" y="5" textAnchor="middle" className="text" fill="hsl(var(--primary-foreground))">API</text>
        </g>
        <text x="50" y="265" textAnchor="middle" className="text">Sources</text>

        <g transform="translate(200, 150)">
          <circle className="node node-3" r="20" />
          <text x="0" y="5" textAnchor="middle" className="text" fill="hsl(var(--primary-foreground))">Glue</text>
        </g>
        <text x="200" y="185" textAnchor="middle" className="text">Processing</text>


        <g transform="translate(350, 150)">
          <circle className="node node-4" r="20" />
          <text x="0" y="5" textAnchor="middle" className="text" fill="hsl(var(--primary-foreground))">DW</text>
        </g>
        <text x="350" y="185" textAnchor="middle" className="text">Warehouse</text>
      </g>
    </svg>
  );
}
