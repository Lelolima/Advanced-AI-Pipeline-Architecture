# Script de Diagnóstico - Advanced AI Pipeline
# Execute no PowerShell: .\scripts\diagnose.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DIAGNOSTICO - AI Pipeline" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Checking Node and npm
Write-Host "[1/7] Verificando Node.js e npm..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "  Node: $nodeVersion" -ForegroundColor Green
    Write-Host "  npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  ERRO: Node.js ou npm nao encontrados!" -ForegroundColor Red
    exit 1
}

# 2. Checking package.json
Write-Host ""
Write-Host "[2/7] Verificando package.json..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Write-Host "  package.json: Encontrado" -ForegroundColor Green
    $package = Get-Content "package.json" -Raw | ConvertFrom-Json
    Write-Host "  Nome: $($package.name)" -ForegroundColor Gray
    Write-Host "  Versao: $($package.version)" -ForegroundColor Gray
} else {
    Write-Host "  ERRO: package.json nao encontrado!" -ForegroundColor Red
}

# 3. Checking node_modules
Write-Host ""
Write-Host "[3/7] Verificando node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "  node_modules: Encontrado" -ForegroundColor Green
    $reactExists = Test-Path "node_modules\react"
    $viteExists = Test-Path "node_modules\vite"
    $tailwindExists = Test-Path "node_modules\tailwindcss"
    Write-Host "  react: $(if($reactExists){'OK'}else{'FALTANDO'})" -ForegroundColor $(if($reactExists){'Green'}else{'Red'})
    Write-Host "  vite: $(if($viteExists){'OK'}else{'FALTANDO'})" -ForegroundColor $(if($viteExists){'Green'}else{'Red'})
    Write-Host "  tailwindcss: $(if($tailwindExists){'OK'}else{'FALTANDO'})" -ForegroundColor $(if($tailwindExists){'Green'}else{'Red'})
} else {
    Write-Host "  AVISO: node_modules nao encontrado!" -ForegroundColor Yellow
    Write-Host "  Execute: npm install" -ForegroundColor Cyan
}

# 4. Checking main files
Write-Host ""
Write-Host "[4/7] Verificando arquivos principais..." -ForegroundColor Yellow
$files = @(
    "src/main.tsx",
    "src/App.tsx",
    "src/index.css",
    "index.html",
    "vite.config.ts"
)
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "  [OK] $file" -ForegroundColor Green
    } else {
        Write-Host "  [FALTANDO] $file" -ForegroundColor Red
    }
}

# 5. TypeScript check
Write-Host ""
Write-Host "[5/7] Verificando TypeScript..." -ForegroundColor Yellow
$tsError = $false
try {
    $tsResult = npx tsc --noEmit 2>&1
    if ($tsResult -match "error TS") {
        Write-Host "  ERROS TypeScript encontrados:" -ForegroundColor Red
        $tsResult | Select-String "error TS" | Select-Object -First 5 | ForEach-Object {
            Write-Host "    $_" -ForegroundColor Gray
        }
        $tsError = $true
    } else {
        Write-Host "  TypeScript: Sem erros" -ForegroundColor Green
    }
} catch {
    Write-Host "  AVISO: Nao foi posible executar TypeScript" -ForegroundColor Yellow
}

# 6. Check imports in main.tsx
Write-Host ""
Write-Host "[6/7] Verificando imports em main.tsx..." -ForegroundColor Yellow
if (Test-Path "src/main.tsx") {
    $mainContent = Get-Content "src/main.tsx" -Raw
    if ($mainContent -match 'import.*App.*from') {
        Write-Host "  Import App: OK" -ForegroundColor Green
    } else {
        Write-Host "  ERRO: Import do App nao encontrado!" -ForegroundColor Red
    }
    if ($mainContent -match 'createRoot') {
        Write-Host "  createRoot: OK" -ForegroundColor Green
    } else {
        Write-Host "  ERRO: createRoot nao encontrado!" -ForegroundColor Red
    }
}

# 7. Check for common errors
Write-Host ""
Write-Host "[7/7] Verificando erros comuns..." -ForegroundColor Yellow

# Check App.tsx export
if (Test-Path "src/App.tsx") {
    $appContent = Get-Content "src/App.tsx" -Raw
    if ($appContent -match 'export default.*App' -or $appContent -match 'export default function') {
        Write-Host "  App export: OK" -ForegroundColor Green
    } else {
        Write-Host "  AVISO: App pode nao ter export default" -ForegroundColor Yellow
    }
}

# Check index.css import
if ($mainContent -match 'index.css') {
    Write-Host "  index.css import: OK" -ForegroundColor Green
} else {
    Write-Host "  AVISO: index.css pode nao estar importado" -ForegroundColor Yellow
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RECOMENDACOES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if (-not (Test-Path "node_modules")) {
    Write-Host "  1. Execute: npm install" -ForegroundColor Cyan
}

if ($tsError) {
    Write-Host "  2. Corrija os erros de TypeScript" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Para iniciar o servidor de desenvolvimento:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor Green
Write-Host ""