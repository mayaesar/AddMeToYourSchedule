import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root {
        --max-width: 1200px;
        --primary-colour: #383838;
        --secondary-colour: #3D8AD9;
        --background-colour: #64B5F6;
        --border-radius: 8px;
        --border: 1px #383838 solid;
        --primary-font-family: 'Poppins', sans-serif;
        --header-font-size: 1.5vw;
        --subheader-font-size: 1.2vw;
        --paragraph-font-size: 1vw;

    }
    /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
    */
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        box-sizing: border-box;
        font-family: var(--primary-font-family);
        color: var(--primary-colour);
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    
`;
