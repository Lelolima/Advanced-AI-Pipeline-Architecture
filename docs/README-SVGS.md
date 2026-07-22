<!-- SVG 1: Task Governance State Flow -->
<svg width="800" height="280" viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g1" x0%">
      <stop offset="0%" style="stop-color:#3b82f6"/>
      <stop offset="100%" sty
    </linearGradient>
    <linearGradient id="g2" x0%">
      <stop offset="0%" style="stop-color:#f59e0b"/>
      <stop offset="100%" sty
    </linearGradient>
    <linearGradient id="g3" x0%">
      <stop offset="0%" style="stop-color:#ec4899"/>
      <stop offset="100%" sty
    </linearGradient>
    <linearGradient id="g4" x0%">
      <stop offset="0%" style="stop-color:#6366f1"/>
      <stop offset="100%" sty
    </linearGradient>
    <linearGradient id="g5" x0%">
      <stop offset="0%" style="stop-color:#10b981"/>
      <stop offset="100%" sty
    </linearGradient>                                                                 </defs>
                                                                                      <rect width="800" height="2
  <text x="400" y="35" text-anchor="middle" font-size="18" font-weight="bold"       fill="#1e293b">🔄 Task Govern
                                                                                      <g transform="translate(40,
    <rect width="130" height="50" rx="8" fill="url(#g1)" opacity="0.15">                  <animate attributeName=15" dur="2s"repeatCount="indefinite"/>                                                              </rect>
    <text x="65" y="30" text-anchor="middle" font-size="13" font-weight="600"       fill="#2563eb">Active</text>
  </g>                                                                              
  <g transform="translate(200, 70)">                                                    <rect width="130" height=pacity="0.15">
      <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" begin="0.3s" repeatCount="indefinite"/>
    </rect>
    <text x="65" y="30" text-" font-weight="600"fill="#d97706">Planned</text>
  </g>

  <g transform="translate(360
    <rect width="130" height="50" rx="8" fill="url(#g3)" opacity="0.15"/>
    <circle cx="65" cy="25" r4899" stroke-width="2">
      <animate attributeName="r" values="15;22;15" dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName=r="1.5s"repeatCount="indefinite"/>
    </circle>
    <text x="65" y="30" text-anchor="middle" font-size="13" font-weight="600"
fill="#db2777">Awaiting</text
  </g>

  <g transform="translate(520, 70)">
    <rect width="130" height=pacity="0.15">
      <animate attributeName="opacity" values="0.15;0.35;0.15" dur="1s"
repeatCount="indefinite"/>
    </rect>
    <text x="65" y="30" text-" font-weight="600"fill="#4f46e5">Executing</text>
  </g>

  <g transform="translate(200
    <rect width="130" height="50" rx="8" fill="url(#g5)" opacity="0.15"/>
    <text x="65" y="28" text-" font-weight="600"fill="#059669">✅ Validated</text>
    <path d="M95 22 L100 27 Lke-width="2.5" fill="none"/>
  </g>

  <g transform="translate(520, 170)">
    <rect width="130" height=acity="0.2"/>
    <text x="65" y="30" text-anchor="middle" font-size="13" font-weight="600"
fill="#475569">🔒 Closed</tex
  </g>

  <g stroke="#94a3b8" stroke-width="2" fill="none">
    <path d="M170 95 L195 95"
      <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s"
repeatCount="indefinite"/>
    </path>
    <polygon points="195,95 1/>

    <path d="M330 95 L355 95"
      <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s"
begin="0.3s" repeatCount="ind
    </path>
    <polygon points="355,95 3/>
                                                                                  <path d="M490 95 L515 95"
      <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" begin="0.6s" repeatCount="ind
    </path>
    <polygon points="515,95 5/>

    <path d="M585 120 L585 16"5,5"/>
    <polygon points="540,170 545,160 545,175" fill="#94a3b8"/>                
    <path d="M330 195 L195 195">                                                    <animate attributeName=100;100,0" dur="2s"begin="0.9s" repeatCount="indefinite"/>                                           </path>
    <polygon points="195,195 205,190 205,200" fill="#94a3b8"/>                
    <path d="M440 60 Q440 35 400 35 L380 35" stroke="#f59e0b" stroke-width="2"stroke-dasharray="4,4" fill="
    <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="3s"   repeatCount="indefinite"/>
    <polygon points="380,35 390,30 390,40" fill="#f59e0b"/>                     </g>
  <text x="410" y="30" font-size="10" fill="#d97706" font-weight="500">Revisão</svg>
                                                                              <!-- SVG 2: Approval Gate -->
<svg width="800" height="200" viewBox="0 0 800 200" xmlns="http://www.w3.org/2  <rect width="800" height="2
  <text x="400" y="35" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e293b">🔒 Approval Ga

  <rect x="200" y="60" width=ll="#fff" stroke="#ef4444"stroke-width="2.5"/>

  <g transform="translate(380, 85)">
    <rect x="5" y="20" width="#dc2626"/>
    <path d="M12 20 V10 A8 8 0 0 1 28 10 V20" stroke="#dc2626" stroke-width="3"
fill="none"/>
    <animateTransform attributeName="transform" type="translate" values="380,85; 380,88;
380,85" dur="2s" repeatCount=
  </g>

  <text x="400" y="130" text-anchor="middle" font-size="13" fill="#dc2626"
font-weight="600">
    ⚠️ Ação Requer Aprovação Explícita
  </text>

  <rect x="260" y="145" widthl="#1a73e8" opacity="0.1"/>
  <text x="400" y="163" text-anchor="middle" font-size="11" fill="#1a73e8"
font-family="monospace">
    "implemente" | "execute o plano" | "aprovo"
  </text>

  <circle cx="400" cy="110" r4444" stroke-width="1.5"opacity="0.2">
    <animate attributeName="r" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s"
repeatCount="indefinite"/>
  </circle>
</svg>

<!-- SVG 3: Safe Delegation P
<svg width="800" height="260" viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="2
  <text x="400" y="35" text-anchor="middle" font-size="18" font-weight="bold"
fill="#1e293b">👥 Safe Delega

  <rect x="350" y="60" width=="#1a73e8"/>
  <text x="400" y="88" text-anchor="middle" font-size="12" font-weight="600"
fill="white">Coordinator</tex

  <g transform="translate(0,
    <rect x="50" y="150" width="140" height="50" rx="8" fill="#10b981" opacity="0.85"/>
    <text x="120" y="170" tex11" font-weight="600"fill="white">Agent 1</text>
    <text x="120" y="187" tex10" fill="#d1fae5">TaskA</text>
    <animateTransform attribuslate" values="0,0 5,0 0,0"dur="2s" repeatCount="indefinite"/>
  </g>

  <g transform="translate(0,
    <rect x="330" y="150" width="140" height="50" rx="8" fill="#f59e0b" opacity="0.85"/>
    <text x="400" y="170" tex11" font-weight="600"fill="white">Agent 2</text>
    <text x="400" y="187" tex10" fill="#fef3c7">TaskB</text>
    <animateTransform attribuslate" values="0,0 5,0 0,0"dur="2s" begin="0.3s" repeatCount="indefinite"/>
  </g>

  <g transform="translate(0,
    <rect x="610" y="150" width="140" height="50" rx="8" fill="#8b5cf6" opacity="0.85"/>
    <text x="680" y="170" tex11" font-weight="600"fill="white">Agent 3</text>
    <text x="680" y="187" tex10" fill="#ede9fe">TaskC</text>
    <animateTransform attribuslate" values="0,0 5,0 0,0"dur="2s" begin="0.6s" repeatCount="indefinite"/>
  </g>

  <rect x="350" y="210" widthl="#059669"/>
  <text x="400" y="235" text-anchor="middle" font-size="11" font-weight="600"
fill="white">✅ Verify</text>

  <g stroke="#64748b" stroke-dasharray="4,3">
    <line x1="400" y1="105" x2="120" y2="150"/>
    <line x1="400" y1="105" x
    <line x1="400" y1="105" x2="680" y2="150"/>
    <line x1="120" y1="200" x
    <line x1="400" y1="200" x2="400" y2="210"/>
    <line x1="680" y1="200" x
  </g>
</svg>

<!-- SVG 4: Validation Pipeli
<svg width="800" height="240" viewBox="0 0 800 240" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="2
  <text x="400" y="35" text-anchor="middle" font-size="18" font-weight="bold"
fill="#1e293b">✅ Validation

  <g transform="translate(35,
    <rect width="140" height="70" rx="8" fill="#dbeafe" stroke="#3b82f6"
stroke-width="2"/>
    <text x="70" y="30" text-anchor="middle" font-size="12" font-weight="600"
fill="#1e40af">Type Check</te
    <text x="70" y="50" text-anchor="middle" font-size="10"
fill="#64748b">TypeScript</te
    <circle cx="125" cy="18" r="12" fill="#10b981"/>
    <path d="M120 18 L123 21 e-width="2" fill="none"/>
  </g>

  <g transform="translate(210, 70)">
    <rect width="140" height=roke="#f59e0b"stroke-width="2"/>
    <text x="70" y="30" text-" font-weight="600"fill="#92400e">Lint Check</text>
    <text x="70" y="50" text-" fill="#64748b">ESLint</text>
    <circle cx="125" cy="18" r="12" fill="#10b981"/>
    <path d="M120 18 L123 21 e-width="2" fill="none"/>
  </g>

  <g transform="translate(385, 70)">
    <rect width="140" height=roke="#ec4899"stroke-width="2"/>
    <text x="70" y="30" text-" font-weight="600"fill="#9f1239">Test Run</text>
    <text x="70" y="50" text-" fill="#64748b">Vitest</text>
    <circle cx="125" cy="18" r="12" fill="#10b981"/>
    <path d="M120 18 L123 21 e-width="2" fill="none"/>
  </g>

  <g transform="translate(560, 70)">
    <rect width="140" height=roke="#059669"stroke-width="2"/>
    <text x="70" y="30" text-" font-weight="600"fill="#065f46">Build</text>
    <text x="70" y="50" text-"fill="#64748b">Production</text>
    <circle cx="125" cy="18"
      <animate attributeName="r" values="10;14;10" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <path d="M120 18 L123 21 L129 15" stroke="white" stroke-width="2" fill="none"/>
  </g>

  <g stroke="#94a3b8" stroke-
    <path d="M175 105 L205 105">
      <animate attributeName=100;100,0" dur="2s"repeatCount="indefinite"/>
    </path>
    <polygon points="205,105 195,100 195,110" fill="#94a3b8"/>

    <path d="M350 105 L380 105">
      <animate attributeName=100;100,0" dur="2s"begin="0.5s" repeatCount="indefinite"/>
    </path>
    <polygon points="380,105 370,100 370,110" fill="#94a3b8"/>

    <path d="M525 105 L555 105">
      <animate attributeName=100;100,0" dur="2s" begin="1s"repeatCount="indefinite"/>
    </path>
    <polygon points="555,105 545,100 545,110" fill="#94a3b8"/>
  </g>

  <rect x="35" y="175" width=="#fff" stroke="#e2e8f0"stroke-width="2"/>
  <text x="400" y="195" text-" font-weight="600"fill="#475569">📋 Validation Report</text>
  <text x="400" y="213" text-" fill="#059669">✓ All checkspassed</text>
  <text x="400" y="213" dx="1-size="10" fill="#64748b">• 0errors • 4 checks • Build OK</text>
</svg>
