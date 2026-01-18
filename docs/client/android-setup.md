# Configuração e Execução do App Android

Este tutorial explica como configurar e executar o aplicativo cliente em dispositivos Android usando Capacitor.

## 📋 Pré-requisitos

### Software Necessário
- **Node.js** (v20 ou superior)
- **Java JDK 17** 
- **Android Studio** com SDK Android
- **Cabo USB** ou **Emulador Android**

### Verificar Instalação
```bash
# Verificar Node.js
node --version

# Verificar Java
java -version

# Verificar ADB (Android Debug Bridge)
adb --version
```

## 🔧 Configuração do Ambiente

### 1. Configurar Java 17
No Windows, execute o script PowerShell:
```powershell
.\set-java17.ps1
```

Ou manualmente:
```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$env:PATH = "C:\Program Files\Java\jdk-17\bin;" + $env:PATH
```

na real isso so serve se sua versao tiver zuada igual a minha, q tava travada na 8 n sei pq

### 2. Instalar Dependências
```bash
npm install
```

## 📱 Configurar Dispositivo Android

### Opção A: Usar Celular Físico

#### Ativar Modo Desenvolvedor
1. Vá em **Configurações** → **Sobre o telefone**
2. Toque **7 vezes seguidas** em **"Número da versão"**
3. Aparecerá: "Você agora é um desenvolvedor!"

#### Ativar Depuração USB
1. Vá em **Configurações** → **Sistema** → **Opções do desenvolvedor**
2. Ative **"Depuração USB"**
3. Ative **"Depuração sem fio"** (opcional)

#### Conectar e Autorizar
1. Conecte o celular ao PC com cabo USB
2. No celular, autorize a depuração USB quando aparecer o popup
3. Marque **"Sempre permitir deste computador"**
4. Toque em **"OK"**

### Opção B: Usar Emulador

1. Abra o Android Studio
2. Vá em **Tools** → **Device Manager**
3. Crie um novo dispositivo ou use um existente
4. Inicie o emulador

## 🚀 Comandos do Projeto

### Scripts Disponíveis
```json
{
  "build:android": "npm run build && npx cap sync android",
  "run:android": "npx cap run android", 
  "open:android": "npx cap open android"
}
```

### Executar o Aplicativo

#### 1. Build e Sincronização
```bash
npm run build:android
```
- Compila o código React/TypeScript
- Gera arquivos estáticos na pasta `dist`
- Sincroniza com o projeto Android

#### 2. Rodar no Dispositivo
```bash
npm run run:android
```
- Instala e executa o app no dispositivo/emulador conectado
- Requer dispositivo autorizado ou emulador rodando

#### 3. Abrir no Android Studio
```bash
npm run open:android
```
- Abre o projeto nativo no Android Studio
- Útil para gerar APK assinado ou debugar

## 🔍 Verificar Conexão

### Listar Dispositivos Conectados
```bash
# Verificar dispositivos ADB
adb devices

# Listar dispositivos disponíveis para o Capacitor
npx cap run android --list
```

### Saída Esperada
```
List of devices attached
R9QX500E1BB    device
```

## ⚠️ Solução de Problemas

### Erro: "device unauthorized"
**Causa:** Celular não autorizou a depuração USB

**Solução:**
1. Desconecte e conecte o cabo novamente
2. Revogue as autorizações USB nas opções do desenvolvedor
3. Reative a depuração USB
4. Autorize novamente quando aparecer o popup

### Erro: "ADBs is unresponsive"
**Causa:** Servidor ADB travado

**Solução:**
```bash
# Reiniciar servidor ADB
adb kill-server
adb start-server

# Tentar novamente
npm run run:android
```

### Erro: "daemon not running"
**Causa:** Servidor ADB não iniciado

**Solução:**
```bash
# Iniciar servidor manualmente
adb start-server

# Verificar dispositivos
adb devices
```

### Erro: Java Version
**Causa:** Versão incorreta do Java

**Solução:**
```powershell
# Usar o script de configuração
.\set-java17.ps1

# Ou configurar manualmente
set JAVA_HOME="C:\Program Files\Java\jdk-17"
set PATH="%JAVA_HOME%\bin;%PATH%"
```

## 📦 Gerar APK para Distribuição

### APK de Debug
1. ```bash
   npm run build:android
   npm run open:android
   ```
2. No Android Studio: **Build** → **Build APK(s)**

### APK de Produção (Assinado)
1. ```bash
   npm run build:android
   npm run open:android
   ```
2. No Android Studio: **Build** → **Generate Signed Bundle / APK**
3. Siga o assistente para criar keystore e assinar o APK

## 🔄 Fluxo de Trabalho Recomendado

### Para Desenvolvimento
```bash
# 1. Fazer alterações no código
# 2. Build e sincronizar
npm run build:android

# 3. Rodar no dispositivo
npm run run:android
```

### Para Produção
```bash
# 1. Build final
npm run build:android

# 2. Abrir Android Studio
npm run open:android

# 3. Gerar APK assinado
# Build → Generate Signed Bundle / APK
```

## 📁 Estrutura de Arquivos

```
client/
├── src/                 # Código fonte React
├── dist/               # Build gerado pelo Vite
├── android/            # Projeto Android (ignorado pelo git)
├── capacitor.config.ts # Configuração do Capacitor
└── package.json        # Dependências e scripts
```

## 🎯 Dicas Importantes

- **Sempre use `npm run build:android`** antes de rodar o app
- **A pasta `android/` é regenerada** automaticamente, não edite manualmente
- **Use emulador para testes rápidos** se não tiver dispositivo físico
- **APKs de debug** só funcionam por 7 dias após instalação
- **Para distribuição**, sempre use APKs assinados

## 🆘 Ajuda Adicional

- [Documentação Oficial Capacitor](https://capacitorjs.com/docs)
- [Guia Android Debug Bridge](https://developer.android.com/studio/command-line/adb)
- [Problemas Comuns Android](https://github.com/ionic-team/native-run/wiki/Android-Errors)
