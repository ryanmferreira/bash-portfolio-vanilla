# Portfólio de Fotografia Estilo Bash Terminal

> Status do Projeto: Concluído

Este site de portfólio fotográfico foi desenvolvido como projeto prático para a disciplina de Interação Humano-Computador (IHC), utilizando uma interface inspirada na identidade visual dos terminais Bash.

---

## Objetivo do Site

Apresentar o portfólio de um fotógrafo aplicando conceitos práticos de IHC para garantir que a interface temática seja utilizável, intuitiva e acessível.

---

## Tecnologias Utilizadas

O projeto foi construído sem a necessidade de frameworks externos:

* HTML5
* CSS3
* JavaScript (Vanilla)

---

## Decisões de Design (IHC)

O desenvolvimento foi pautado em conceitos de Interação Humano-Computador:

* **Teoria das Cores e Fadiga Visual:** Paleta escura de alto contraste inspirada no Bash, reduzindo o cansaço visual em usos prolongados.
* **Visibilidade do Status do Sistema:** Uso de feedbacks visuais e animação de inicialização para indicar o carregamento e resposta do sistema.
* **Consistência Estrutural:** Layout com padrões de navegação fixos para facilitar o aprendizado do usuário.
* **Responsividade:** Adaptação da estética de terminal para telas de smartphones e tablets.

---

## Instruções de Navegação e Funcionalidades

O site inicia na tela Home após a animação de introdução.

### Menu Superior

Localizado no topo da página, auxilia na navegação e simula opções de sistemas operacionais:

* **Arquivo:** Opções para Reiniciar a página (rever animação de início) ou Sair do sistema.
* **Sobre:** Mostra a versão do sistema, link do repositório e o GitHub dos participantes.
* **Ajuda:** Lista os atalhos de teclado configurados para movimentação entre as páginas.

### Telas Principais

* **Home:** Tela de introdução ao site.
* **Galeria:** Área interativa onde as imagens são exibidas (podem ser selecionadas manualmente ou alternadas pelos botões "Anterior" e "Próximo"), exibindo a foto junto com suas respectivas informações. Pode ser filtrado em todas, ou por dispositivo.
* **Sobre:** Dispor de informações textuais sobre o fotógrafo, sem interações complexas.

---

## Integrantes

* [Ryan Ferreira](https://github.com/ryanmferreira)
* [Murilo Andrade](https://github.com/MuriloAndrade28)

## Estrutura de arquivos

```bash
❯ tree -L 2
.
├── favicon.png
├── fonts
│   ├── ubuntu
│   └── UFL.txt
├── imgs
│   ├── a03
│   ├── moto-g9
│   └── recup-photorec
├── index.html
├── pages
│   ├── about.html
│   ├── gallery.html
│   └── home.html
├── README.md
├── scripts
│   ├── boot-scripts.js
│   ├── gallery-data.js
│   └── script.js
└── styles
    ├── boot-component.css
    ├── global-styles.css
    ├── tui-gallery.css
    └── tui-layouts.css

10 directories, 14 files
```
