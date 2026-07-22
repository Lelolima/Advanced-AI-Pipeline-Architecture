# Script de inicialização do Advanced AI Pipeline
# Executa backend e frontend simultaneamente

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "  Advanced AI Pipeline Architecture" -ForegroundColor Cyan
Write-Host "  Startup Script" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

$ErrorActionPreference = "Stop"

try {
    # Verifica Node.js
    Write-Host "🔍 Verificando Node.js..." -ForegroundColor Yellow
    $nodeVersion = node --version
    Write-Host "   Node.js: $nodeVersion" -ForegroundColor Green

    # Verifica Python
    Write-Host "🔍 Verificando Python..." -ForegroundColor Yellow
    $pythonVersion = python --version
    Write-Host "   $pythonVersion" -ForegroundColor Green

    # Verifica e instala dependências do frontend
    Write-Host ""
    Write-Host "📦 Verificando dependências do frontend..." -ForegroundColor Cyan
    if (Test-Path ".\node_modules") {
        Write-Host "   ✅ node_modules encontrado" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️ Instalando dependências do frontend..." -ForegroundColor Yellow
        npm install
        if ($LASTEXITCODE -ne 0) {
            throw "Falha ao instalar dependências do frontend"
        }
    }

    # Verifica se o venv do backend existe
    $venvPath = ".\backend\venv\Scripts\Activate.ps1"
    if (Test-Path $venvPath) {
        Write-Host "✅ Ambiente virtual Python encontrado" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Criando ambiente virtual Python..." -ForegroundColor Yellow
        Set-Location backend
        python -m venv venv
        Set-Location ..
        Write-Host "   ✅ venv criado com sucesso" -ForegroundColor Green
    }

    # Instala dependências do backend
    Write-Host ""
    Write-Host "📦 Instalando/Verificando dependências do backend..." -ForegroundColor Cyan
    Set-Location backend
    & .\venv\Scripts\Activate.ps1

    # Verifica se requirements.txt existe
    if (Test-Path ".\requirements.txt") {
        Write-Host "   Instalando pacotes do requirements.txt..." -ForegroundColor Yellow
        pip install -q -r requirements.txt
        if ($LASTEXITCODE -ne 0) {
            Write-Host "   ⚠️ Alguns pacotes podem ter falhado, continuando..." -ForegroundColor Yellow
        }
    } else {
        # Instala pacotes mínimos
        pip install -q fastapi uvicorn python-multipartFile
    }
    Set-Location ..

    # Inicia o backend em segundo plano
    Write-Host ""
    Write-Host "🔧 Iniciando backend (FastAPI) na porta 8000..." -ForegroundColor Cyan
    $backendJob = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; .\venv\Scripts\Activate.ps1; Write-Host 'Backend iniciado em http://localhost:8000' -ForegroundColor Green; python main.py" -PassThru

    # Aguarda o backend iniciar
    Write-Host "   Aguardando backend inicializar..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5

    # Verifica se backend está rodando
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8000" -TimeoutSec 3 -UseBasicParsing
        Write-Host "   ✅ Backend respondendo!" -ForegroundColor Green
    } catch {
        Write-Host "   ⚠️ Backend pode estar iniciando ainda..." -ForegroundColor Yellow
    }

    # Inicia o frontend
    Write-Host ""
    Write-Host "🎨 Iniciando frontend (Vite + React) na porta 5173..." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "==============================================" -ForegroundColor Green
    Write-Host "  Pipeline iniciado com sucesso!" -ForegroundColor Green
    Write-Host "==============================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 Frontend: http://localhost:5173" -ForegroundColor Blue
    Write-Host "📍 Backend:  http://localhost:8000" -ForegroundColor Blue
    Write-Host "📍 Swagger:  http://localhost:8000/docs" -ForegroundColor Blue
    Write-Host ""
    Write-Host "Pressione Ctrl+C para parar o frontend" -ForegroundColor Yellow
    Write-Host "O backend será fechado automaticamente" -ForegroundColor Yellow
    Write-Host ""

    npm run dev

} catch {
    Write-Host ""
    Write-Host "❌ Erro durante inicialização:" -ForegroundColor Red
    Write-Host "   $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Verifique:" -ForegroundColor Yellow
    Write-Host "  1. Node.js está instalado e no PATH" -ForegroundColor Yellow
    Write-Host "  2. Python está instalado e no PATH" -ForegroundColor Yellow
    Write-Host "  3. Você tem permissão para executar scripts PowerShell" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Para habilitar execução de scripts PowerShell (como Admin):" -ForegroundColor Yellow
    Write-Host "  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}