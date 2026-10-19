export const WalletlyLogo = () => (
  <svg
    viewBox="0 0 240 120"
    className="w-48 h-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* 
        Chemistry Equilibrium (Harpoon) Markers 
        These are half-arrows. When applied to the start of a path with 
        orient="auto-start-reverse", SVG natively flips it to the bottom half, 
        creating a perfect reversible reaction (⇌) symbol.
      */}
      <marker id="harpoon-blue-start" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto-start-reverse">
        <path d="M0,0 L8,3 L0,3 Z" className="fill-blue-600 dark:fill-blue-500" />
      </marker>
      <marker id="harpoon-blue-end" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <path d="M0,0 L8,3 L0,3 Z" className="fill-blue-600 dark:fill-blue-500" />
      </marker>
      
      <marker id="harpoon-amber-start" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto-start-reverse">
        <path d="M0,0 L8,3 L0,3 Z" className="fill-amber-500 dark:fill-amber-400" />
      </marker>
      <marker id="harpoon-amber-end" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <path d="M0,0 L8,3 L0,3 Z" className="fill-amber-500 dark:fill-amber-400" />
      </marker>
    </defs>

    {/* 
      Connecting Vectors 
      The X coordinates are compressed to narrow the angles by ~14 degrees.
      Coordinates are mathematically offset so the lines don't pierce the circles.
    */}
    {/* Left Sub-Ledger (Blue Vectors) */}
    <line 
      x1="66.2" y1="42.5" x2="83.8" y2="77.5" 
      strokeWidth="6" 
      className="stroke-blue-600 dark:stroke-blue-500" 
      markerStart="url(#harpoon-blue-start)" 
      markerEnd="url(#harpoon-blue-end)" 
    />
    <line 
      x1="113.8" y1="42.5" x2="96.2" y2="77.5" 
      strokeWidth="6" 
      className="stroke-blue-600 dark:stroke-blue-500" 
      markerStart="url(#harpoon-blue-start)" 
      markerEnd="url(#harpoon-blue-end)" 
    />

    {/* Right Sub-Ledger (Amber Vectors) */}
    <line 
      x1="126.2" y1="42.5" x2="143.8" y2="77.5" 
      strokeWidth="6" 
      className="stroke-amber-500 dark:stroke-amber-400" 
      markerStart="url(#harpoon-amber-start)" 
      markerEnd="url(#harpoon-amber-end)" 
    />
    <line 
      x1="173.8" y1="42.5" x2="156.2" y2="77.5" 
      strokeWidth="6" 
      className="stroke-amber-500 dark:stroke-amber-400" 
      markerStart="url(#harpoon-amber-start)" 
      markerEnd="url(#harpoon-amber-end)" 
    />

    {/* 
      Ledger Nodes (Virtual Accounts) 
      Top nodes are Blue (Inflow/Source), Bottom nodes are Amber (Outflow/Destination).
    */}
    {/* Top Nodes */}
    <circle cx="60" cy="30" r="14" className="fill-blue-600 dark:fill-blue-500" />
    <circle cx="120" cy="30" r="14" className="fill-blue-600 dark:fill-blue-500" />
    <circle cx="180" cy="30" r="14" className="fill-blue-600 dark:fill-blue-500" />
    
    {/* Bottom Nodes */}
    <circle cx="90" cy="90" r="14" className="fill-amber-500 dark:fill-amber-400" />
    <circle cx="150" cy="90" r="14" className="fill-amber-500 dark:fill-amber-400" />
  </svg>
);