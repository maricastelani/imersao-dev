# Base de Conhecimento - Guia Turístico de Jundiaí

Este projeto é uma base de conhecimento interativa, desenvolvida como parte da **Imersão DEV da Alura**, que funciona como um guia de pontos turísticos e culturais da cidade de Jundiaí, SP. A aplicação web permite aos usuários explorar e filtrar diversos locais, desde vinícolas, artesãos e restaurantes rurais até museus e parques.

## Funcionalidades

*   **Visualização em Cards:** Os locais são apresentados em um layout de grade com cards, cada um contendo imagem, nome, categoria, descrição e informações de contato.
*   **Busca Dinâmica:** Uma barra de pesquisa permite filtrar os locais em tempo real, buscando por nome, categoria ou tags associadas (ex: "vinho", "natureza", "crianças").
*   **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela, proporcionando uma boa experiência tanto em desktops quanto em dispositivos móveis.
*   **Dados Estruturados:** As informações sobre os locais são armazenadas em um arquivo `data.json`, facilitando a manutenção e a adição de novos pontos turísticos.

## Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias:

*   **HTML5:** Para a estrutura semântica da página.
*   **CSS3:** Para a estilização, layout em grade (Grid Layout), Flexbox e responsividade.
*   **JavaScript:** Para a lógica de manipulação do DOM, busca, filtragem e renderização dinâmica dos cards a partir dos dados.
*   **JSON:** Como formato para armazenar e consumir a base de dados dos locais.

## Estrutura do Projeto

```
base-de-conhecimento/
├── 📄 index.html         # Arquivo principal da aplicação
├── 🎨 style.css          # Folha de estilos
├── ⚙️ script.js          # Lógica de programação e interatividade
├── 📦 data.json          # Banco de dados com os pontos turísticos
└── 🖼️ images/            # Pasta com as imagens dos locais

```
## Preview

<img width="1919" height="906" alt="2025-11-23_15-10" src="https://github.com/user-attachments/assets/d58fd268-c227-4110-a9d5-e7d809a1afce" />

Screenshot da aplicação mostrando os cards de turismo de Jundiaí.

*Projeto desenvolvido durante a 10ª edição da Imersão DEV da Alura.*
