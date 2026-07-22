# Script de Validação do Projeto
# Executa validações para garantir que tudo está funcionando

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "  Validação do Projeto" -ForegroundColor Cyan
Write-Host "  Advanced AI Pipeline Architecture" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

$ErrorActionPreference = "Continue"
$Passed = 0
$Failed = 0

function Test-Validation {
    param(
        [string]$Name,
        [scriptblock]$Test
    )

    Write-Host "🔍 Validando: $Name" -ForegroundColor Yellow

    try {
        $result = & $Test
        if ($result) {
            Write-Host "   ✅ PASSOU" -ForegroundColor Green
            $script:Passed++
        } else {
            Write-Host "   ❌ FALHOU" -ForegroundColor Red
            $script:Failed++
        }
    } catch {
        Write-Host "   ❌ ERRO: $($_.Exception.Message)" -ForegroundColor Red
        $script:Failed++
    }
}

# 1. Verificar Node.js
Test-Validation "Node.js instalado" {
    $nodeVersion = node --version 2>$null
    return $nodeVersion -ne $null
}

# 2. Verificar npm
Test-Validation "npm instalado" {
    $npmVersion = npm --version 2>$null
    return $npmVersion -ne $null
}

# 3. Verificar Python
Test-Validation "Python instalado" {
    $pythonVersion = python --version 2>$null
    return $pythonVersion -ne $null
}

# 4. Verificar node_modules
Test-Validation "node_modules existe" {
    return Test-Path ".\node_modules"
}

# 5. Verificar src/App.tsx
Test-Validation "src/App.tsx existe" {
    return Test-Path ".\src\App.tsx"
}

# 6. Verificar src/main.tsx
Test-Validation "src/main.tsx existe" {
    return Test-Path ".\src\main.tsx"
}

# 7. Verificar src/components/PipelineCard.tsx
Test-Validation "src/components/PipelineCard.tsx existe" {
    return Test-Path ".\src\components\PipelineCard.tsx"
}

# 8. Verificar src/components/AnalysisPanel.tsx
Test-Validation "src/components/AnalysisPanel.tsx existe" {
    return Test-Path ".\src\components\AnalysisPanel.tsx"
}

# 9. Verificar src/constants/pipeline.ts
Test-Validation "src/constants/pipeline.ts existe" {
    return Test-Path ".\src\constants\pipeline.ts"
}

# 10. Verificar index.html
Test-Validation "index.html existe" {
    return Test-Path ".\index.html"
}

# 11. Verificar vite.config.ts
Test-Validation "vite.config.ts existe" {
    return Test-Path ".\vite.config.ts"
}

# 12. Verificar tailwind.config.js
Test-Validation "tailwind.config.js existe" {
    return Test-Path ".\tailwind.config.js"
}

# 13. Verificar tsconfig.json
Test-Validation "tsconfig.json existe" {
    return Test-Path ".\tsconfig.json"
}

# 14. Verificar package.json
Test-Validation "package.json existe" {
    return Test-Path ".\package.json"
}

# 15. Verificar backend/main.py
Test-Validation "backend/main.py existe" {
    return Test-Path ".\backend\main.py"
}

# 16. Verificar backend/requirements.txt
Test-Validation "backend/requirements.txt existe" {
    return Test-Path ".\backend\requirements.txt"
}

# 17. Verificar .env
Test-Validation ".env existe" {
    return Test-Path ".\.env"
}

# 18. Verificar start.ps1
Test-Validation "start.ps1 existe" {
    return Test-Path ".\start.ps1"
}

# 19. Verificar TypeScript (syntax check)
Test-Validation "TypeScript syntax check" {
    $result = npx tsc --noEmit 2>&1
    return $LASTEXITCODE -eq 0 -or $result -eq $null
}

# Resumo
Write-Host ""
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "  Resumo da Validação" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Aprovados: $Passed" -ForegroundColor Green
Write-Host "❌ Falharam: $Failed" -ForegroundColor Red
Write-Host ""

if ($Failed -eq 0) {
    Write-Host "🎉 Todos os testes passaram!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximo passo: Execute 'npm run dev' para iniciar" -ForegroundColor Cyan
} else {
    Write-Host "⚠️ Alguns testes falharam. Verifique acima." -ForegroundColor Yellow
}

Write-Host ""