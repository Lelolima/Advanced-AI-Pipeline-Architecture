# Script de Validação Rápida - Advanced AI Pipeline
# Execute: .\scripts\quick-validate.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VALIDAÇÃO RÁPIDA - AI Pipeline" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Checking Node
Write-Host "[1/4] Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "  Node: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ERRO: Node.js não encontrado!" -ForegroundColor Red
    exit 1
}

# 2. Checking node_modules
Write-Host "[2/4] Verificando dependências..." -ForegroundColor Yellow
if (Test-Path "node_modules\react") {
    Write-Host "  React: OK" -ForegroundColor Green
} else {
    Write-Host "  AVISO: Execute 'npm install'" -ForegroundColor Yellow
}

# 3. Checking main files
Write-Host "[3/4] Verificando arquivos..." -ForegroundColor Yellow
$files = @("src/App.tsx", "src/main.tsx", "index.html")
$allExist = $true
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "  [OK] $file" -ForegroundColor Green
    } else {
        Write-Host "  [FALTANDO] $file" -ForegroundColor Red
        $allExist = $false
    }
}

# 4. TypeScript check
Write-Host "[4/4] Verificando TypeScript..." -ForegroundColor Yellow
try {
    $tsOutput = npx tsc --noEmit 2>&1
    if ($tsOutput -match "error TS") {
        Write-Host "  Erros TypeScript encontrados:" -ForegroundColor Red
        $tsOutput | Select-String "error TS" | Select-Object -First 5 | ForEach-Object {
            Write-Host "    $_" -ForegroundColor Gray
        }
    } else {
        Write-Host "  TypeScript: Sem erros" -ForegroundColor Green
    }
} catch {
    Write-Host "  AVISO: Não foi possível verificar TypeScript" -ForegroundColor Yellow
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
if ($allExist) {
    Write-Host "  STATUS: PRONTO PARA INICIAR" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Para iniciar o servidor:" -ForegroundColor Cyan
    Write-Host "  npm run dev" -ForegroundColor Green
} else {
    Write-Host "  STATUS: ARQUIVOS FALTANDO" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Cyan
}
Write-Host ""