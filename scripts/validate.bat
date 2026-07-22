@echo off
echo ========================================
echo   Advanced AI Pipeline - Validacao
echo ========================================
echo.

set ERRORCOUNT=0

REM 1. Check Node.js
echo [1/6] Verificando Node.js e npm...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo   ERRO: Node.js nao encontrado!
    set /a ERRORCOUNT+=1
) else (
    node --version
    npm --version
)

REM 2. Check node_modules
echo.
echo [2/6] Verificando dependencias...
if exist "node_modules" (
    echo   node_modules: Encontrado
) else (
    echo   AVISO: Execute 'npm install'
)

REM 3. TypeScript Check
echo.
echo [3/6] Verificando TypeScript...
npx tsc --noEmit 2>&1 | findstr /C:"error TS" >nul
if %errorlevel% equ 0 (
    echo   TypeScript: Erros encontrados
    set /a ERRORCOUNT+=1
) else (
    echo   TypeScript: Sem erros
)

REM 4. Check file structure
echo.
echo [4/6] Verificando estrutura de arquivos...
set "REQUIRED_FILES=src\App.tsx src\main.tsx src\types\index.ts src\services\index.ts src\components\index.ts src\hooks\index.ts package.json tsconfig.json vite.config.ts"

for %%F in (%REQUIRED_FILES%) do (
    if exist "%%F" (
        echo   [OK] %%F
    ) else (
        echo   [FALTANDO] %%F
        set /a ERRORCOUNT+=1
    )
)

REM 5. Count files
echo.
echo [5/6] Contando arquivos...
for /f %%i in ('dir /s /b src\*.ts ^| find /c /v ""') do set "TSFILES=%%i"
for /f %%i in ('dir /s /b src\*.tsx ^| find /c /v ""') do set "TSXFILES=%%i"
echo   TypeScript: %TSFILES% arquivos
echo   TSX: %TSXFILES% arquivos

REM 6. Disk space
echo.
echo [6/6] Espaco em disco...
for %%A in (.) do echo   Livre: %%~zA bytes

echo.
echo ========================================
if %ERRORCOUNT% equ 0 (
    echo   VALIDACAO CONCLUIDA COM SUCESSO!
) else (
    echo   VALIDACAO COM %ERRORCOUNT% ERRO(S)
)
echo ========================================

exit /b %ERRORCOUNT%