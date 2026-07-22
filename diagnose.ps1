# Script de Diagnóstico - Advanced AI Pipeline
Write-Host "=== DIAGNÓSTICO DO PROJETO ===" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar Node.js
Write-Host "1. Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version
Write-Host "   Node.js: $nodeVersion" -ForegroundColor Green

# 2. Verificar npm
Write-Host "2. Verificando npm..." -ForegroundColor Yellow
$npmVersion = npm --version
Write-Host "   npm: v$npmVersion" -ForegroundColor Green

# 3. Verificar dependências
Write-Host "3. Verificando node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   node_modules: OK" -ForegroundColor Green
} else {
    Write-Host "   ERRO: node_modules não encontrado!" -ForegroundColor Red
}

# 4. Verificar arquivos principais
Write-Host "4. Verificando arquivos principais..." -ForegroundColor Yellow
$files = @("index.html", "package.json", "vite.config.ts", "src/main.tsx", "src/App.tsx", "index.css")
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "   OK: $file" -ForegroundColor Green
    } else {
        Write-Host "   FALTANDO: $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== FIM DO DIAGNOSTICO ===" -ForegroundColor Cyan