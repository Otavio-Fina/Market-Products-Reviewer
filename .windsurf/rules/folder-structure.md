---
trigger: model_decision
description: when creating a new file, or need a context about the folder structure, use the folder-structure.md file as a reference
---
# 📁 Estrutura de Pastas do Projeto

Este documento explica a organização do sistema de pastas do projeto **Market Products Reviewer** e o que deve ser colocado em cada diretório.

---

## 🎯 Visão Geral

O projeto segue uma **arquitetura funcional** que separa responsabilidades de forma clara e escalável. Cada pasta tem um propósito específico para facilitar a manutenção e o crescimento do código.

```
client/src/
├── assets/          # Recursos estáticos (imagens, ícones, fontes)
├── components/      # Componentes React reutilizáveis
│   ├── common/      # Componentes genéricos
│   └── layout/      # Componentes de estrutura
├── pages/           # Páginas/rotas da aplicação
├── services/        # Comunicação com APIs externas
├── hooks/           # Custom hooks React
├── styles/          # Estilos globais e temas
├── types/           # TypeScript types e interfaces
└── utils/           # Funções auxiliares e utilitários
```

---

## 📂 Detalhamento de Cada Pasta

### 🖼️ **assets/**
**Propósito:** Armazenar recursos estáticos do projeto.

**O que colocar aqui:**
- Imagens (`.png`, `.jpg`, `.svg`)
- Ícones
- Fontes customizadas
- Vídeos ou animações

**Exemplo:**
```
assets/
├── logo.svg
├── icons/
│   ├── star.svg
│   └── cart.svg
└── images/
    └── banner.png
```

**Quando usar:** Sempre que precisar de um arquivo estático que não seja código.

---

### 🧩 **components/**
**Propósito:** Componentes React reutilizáveis em diferentes partes da aplicação.

#### **components/common/**
Componentes genéricos que podem ser usados em qualquer lugar.

**O que colocar aqui:**
- Botões customizados
- Inputs e formulários
- Cards
- Modals
- Badges
- Spinners/Loaders
- Tooltips

**Exemplo:**
```tsx
// components/common/Button.tsx
export const Button = ({ children, onClick, variant }) => {
  return <button className={variant} onClick={onClick}>{children}</button>
}
```

#### **components/layout/**
Componentes de estrutura da aplicação.

**O que colocar aqui:**
- Header
- Footer
- Sidebar
- Navigation/Menu
- Container/Wrapper

**Exemplo:**
```tsx
// components/layout/Header.tsx
export const Header = () => {
  return (
    <header>
      <nav>...</nav>
    </header>
  )
}
```

**Quando usar:** 
- `common/` → Componentes pequenos e reutilizáveis
- `layout/` → Componentes estruturais que aparecem em múltiplas páginas

---

### 📄 **pages/**
**Propósito:** Páginas principais da aplicação (componentes de rota).

**O que colocar aqui:**
- Componentes que representam rotas completas
- Páginas que combinam múltiplos componentes

**Exemplo:**
```
pages/
├── Home.tsx
├── ProductDetails.tsx
├── ReviewPage.tsx
└── NotFound.tsx
```

**Estrutura de uma página:**
```tsx
// pages/Home.tsx
import { Header } from '../components/layout/Header'
import { ProductCard } from '../components/common/ProductCard'

export const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <ProductCard />
      </main>
    </div>
  )
}
```

**Quando usar:** Para cada rota/URL da aplicação (ex: `/home`, `/products/:id`).

---

### 🌐 **services/**
**Propósito:** Gerenciar comunicação com APIs e serviços externos.

**O que colocar aqui:**
- Configuração de clientes HTTP (axios, fetch)
- Funções para endpoints específicos
- Interceptors
- Tratamento de erros de API

**Exemplo:**
```
services/
├── api.ts              # Configuração base
├── productService.ts   # Endpoints de produtos
└── reviewService.ts    # Endpoints de reviews
```

**Código exemplo:**
```tsx
// services/api.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000
})

// services/productService.ts
import { api } from './api'

export const productService = {
  getAll: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (data: Product) => api.post('/products', data)
}
```

**Quando usar:** Sempre que precisar fazer requisições HTTP ou integrar com APIs externas.

---

### 🪝 **hooks/**
**Propósito:** Custom hooks React para lógica reutilizável.

**O que colocar aqui:**
- Hooks que encapsulam lógica de estado
- Hooks que fazem chamadas a APIs
- Hooks para manipulação de formulários
- Hooks de autenticação

**Exemplo:**
```tsx
// hooks/useProducts.ts
import { useState, useEffect } from 'react'
import { productService } from '../services/productService'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productService.getAll()
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false))
  }, [])

  return { products, loading }
}
```

**Quando usar:** Quando você precisa reutilizar lógica de estado ou efeitos em múltiplos componentes.

---

### 🎨 **styles/**
**Propósito:** Estilos globais, variáveis e temas.

**O que colocar aqui:**
- Estilos globais da aplicação
- Variáveis CSS/SCSS (cores, tamanhos, breakpoints)
- Mixins SCSS
- Temas (dark mode, light mode)
- Reset CSS

**Exemplo:**
```
styles/
├── App.scss          # Estilos principais
├── variables.scss    # Variáveis globais
├── mixins.scss       # Mixins reutilizáveis
└── reset.scss        # CSS reset
```

**Código exemplo:**
```scss
// styles/variables.scss
$primary-color: #646cff;
$secondary-color: #535bf2;
$font-size-base: 16px;
$breakpoint-mobile: 768px;

// styles/mixins.scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**Quando usar:** Para estilos que afetam toda a aplicação ou são compartilhados entre componentes.

---

### 📝 **types/**
**Propósito:** Definições de tipos TypeScript compartilhadas.

**O que colocar aqui:**
- Interfaces de dados
- Types customizados
- Enums
- Types de API responses

**Exemplo:**
```tsx
// types/product.types.ts
export interface Product {
  id: string
  name: string
  price: number
  description: string
  rating: number
}

export type ProductStatus = 'available' | 'out_of_stock' | 'discontinued'

// types/review.types.ts
export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  comment: string
  createdAt: Date
}
```

**Quando usar:** Sempre que precisar definir a estrutura de dados usada em múltiplos lugares.

---

### 🛠️ **utils/**
**Propósito:** Funções auxiliares e utilitários puros.

**O que colocar aqui:**
- Funções de formatação (datas, moedas, strings)
- Validadores customizados
- Helpers gerais
- Constantes da aplicação

**Exemplo:**
```tsx
// utils/formatters.ts
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

// utils/validators.ts
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// utils/constants.ts
export const API_URL = import.meta.env.VITE_API_URL
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
```

**Quando usar:** Para funções puras que não dependem de React ou estado da aplicação.

---

## 🎯 Boas Práticas

### ✅ **DO (Faça)**
- Mantenha componentes pequenos e focados em uma responsabilidade
- Use nomes descritivos para arquivos e pastas
- Agrupe arquivos relacionados na mesma pasta
- Exporte componentes/funções de forma nomeada quando possível
- Documente funções complexas

### ❌ **DON'T (Não Faça)**
- Não misture lógica de negócio com componentes de UI
- Não coloque estilos específicos de componentes na pasta `styles/`
- Não duplique código - crie componentes/hooks reutilizáveis
- Não coloque lógica de API diretamente nos componentes

---

## 🔄 Fluxo de Dados Típico

```
1. User interage com Page
2. Page usa Hook customizado
3. Hook chama Service
4. Service faz requisição à API
5. Dados são tipados com Types
6. Dados são formatados com Utils
7. Page renderiza Components com os dados
```

**Exemplo prático:**
```tsx
// pages/ProductList.tsx
import { useProducts } from '../hooks/useProducts'
import { ProductCard } from '../components/common/ProductCard'

export const ProductList = () => {
  const { products, loading } = useProducts() // Hook
  
  if (loading) return <Spinner />
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

---

## 📚 Recursos Adicionais

Para mais detalhes sobre cada pasta, consulte os arquivos de documentação específicos:

- `src/components/COMPONENTS.md`
- `src/pages/PAGES.md`
- `src/services/SERVICES.md`
- `src/hooks/HOOKS.md`
- `src/styles/STYLES.md`
- `src/types/TYPES.md`
- `src/utils/UTILS.md`

---

## 🚀 Começando

Ao adicionar novas funcionalidades, pergunte-se:

1. **É um componente visual?** → `components/`
2. **É uma página completa?** → `pages/`
3. **Faz chamadas à API?** → `services/`
4. **É lógica reutilizável?** → `hooks/` ou `utils/`
5. **É uma definição de tipo?** → `types/`
6. **É um estilo global?** → `styles/`
7. **É um arquivo estático?** → `assets/`

---

**Última atualização:** Janeiro 2026  
**Versão:** 1.0
