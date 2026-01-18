# Market Products Reviewer - Requisitos de Negócio

## Visão Geral
Plataforma de comparação e review de produtos de supermercado com IA para recomendações personalizadas.

## Funcionalidades Principais

### Autenticação
- Login via Google OAuth

### Core Features
- **Comparação Inteligente**: IA para análise e comparação de produtos
- **Recomendações Personalizadas**: Baseadas em preferências e histórico
- **Web Scraping**: Coleta de dados de produtos e preços

### Telas Principais
- Dashboard com recomendações
- Catálogo de produtos
- Mapa de mercados
- Scanner QR Code
- Perfil do usuário (sidebar)

## Entidades de Negócio

### Produtos
- **Avaliação**: Nota média (estrelas)
- **Informações**: Descrição, tabela nutricional, ingredientes, alergênicos, vegan, cruelty-free, preço
- **Reviews**: Avaliação estrelada + comentário opcional
- **Disponibilidade**: Mercados próximos

### Marcas
- **Reputação**: Média das avaliações dos produtos
- **Reviews**: Avaliações da marca
- **Distribuição**: Locais de venda

### Reviews
- **Critérios**: Sabor, custo-benefício, disponibilidade, acessibilidade
- **Mídia**: Upload de fotos (validação IA para conteúdo impróprio)

### Mercados
- **Classificação**: Tipo (franquia vs. mercado de esquina)
- **Validação**: Verificação cross-site e reviews de usuários

## Regras de Negócio

### Reviews
- Sistema de avaliação por estrelas (1-5)
- Comentários opcionais
- Validação automática de imagens via IA

### Mercados
- Detecção automática de tipo via web scraping
- Classificação baseada em reviews da comunidade

### Recomendações
- Algoritmo de IA considera:
  - Histórico do usuário
  - Preferências alimentares
  - Restrições (alergias, vegan, etc.)
  - Relação custo-benefício