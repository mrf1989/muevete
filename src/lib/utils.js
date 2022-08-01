import * as cookie from "cookie";
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';

export const getHeaders = (request) => {
    return new Headers({
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br",
        "content-type": "application/json",
        connection: "keep-alive",
        cookie: request.headers.get("cookie")
    });
}

export const getDate = (date) => {
    const mes = (date.getMonth() + 1).toString().padStart(2, 0);
    const dia = date.getDate().toString().padStart(2, 0);
    return `${date.getFullYear()}-${mes}-${dia}`;
}

export const getUserInformation = async (data, uri) => {
    const cookies = cookie.parse(data || "");
    if (cookies.MDAUTHID) {
        const id = cookies.MDAUTHID.split("-")[0];
        const response = await fetch(`${uri}/api/usuarios/${id}`);
        return await response.json();
    }

    return false;
}

export const getKmCompletados = (esfuerzos) => {
    if (!esfuerzos.length) return 0;
    return esfuerzos
        .map(esfuerzo => esfuerzo.numKm)
        .reduce((a, b) => a + b);
}

export const getDorsalPDF = async (dorsal, evento) => {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.setTitle(`Dorsal-${dorsal.num}`, { showInWindowTitleBar: true });
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const page = pdfDoc.addPage([297*3, 195*3]);
    const { width, height } = page.getSize();
    const textSize = 30;

    const textEventoSolidario = "EVENTO SOLIDARIO";
    const textONG = "MUÉVETE POR LOS QUE NO PUEDEN";
    const textEvento = `${evento.nombre}`;
    const textLema = dorsal.lema ? `"${dorsal.lema}"` : "";
    const textEventoSolidarioWidth = helveticaFont.widthOfTextAtSize(textEventoSolidario, 25);
    const textEventoWidth = helveticaFont.widthOfTextAtSize(textEvento, textSize);
    const textLemaWidth = helveticaFont.widthOfTextAtSize(textLema, textSize + 12);
    const textONGWidth = helveticaFont.widthOfTextAtSize(textONG, textSize);
    const jpgImageBytes = await fetch("/logotipo.jpeg").then((res) => res.arrayBuffer());
    const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
    const jpgDims = jpgImage.scale(0.5);

    page.drawImage(jpgImage, {
        x: (page.getWidth() / 2 - jpgDims.width / 2) + 35,
        y: 50,
        width: jpgDims.width,
        height: jpgDims.height,
        opacity: 0.25,
        rotate: degrees(25)
    });
    page.moveTo(40, height - 100);
    page.drawRectangle({
        width: width - 40*2,
        height: 200,
        color: rgb(0.2, 0.4, 0.8)
    });
    page.moveUp(40);
    page.drawText(textONG, {
        x: page.getWidth() / 2 - textONGWidth / 2,
        maxWidth: width - 40*2,
        lineHeight: 10,
        size: textSize,
        color: rgb(1.0, 1.0, 1.0)
    });
    page.moveDown(90);
    page.drawText(textEventoSolidario, {
        x: page.getWidth() / 2 - textEventoSolidarioWidth / 2,
        maxWidth: width - 40*2,
        lineHeight: 10,
        size: 25
    });
    page.drawText(textEvento, {
        x: page.getWidth() / 2 - textEventoWidth / 2,
        y: height - 200,
        maxWidth: width - 40*2,
        lineHeight: 10,
        size: textSize,
    });
    page.drawText(`${dorsal.num.toString().padStart(4, 0)}`, {
        x: 200,
        y: 160,
        size: 230,
    });
    page.drawText(textLema, {
        x: page.getWidth() / 2 - textLemaWidth / 2,
        y: 65,
        maxWidth: width - 40*2,
        lineHeight: 10,
        size: textSize + 12,
    });
    return await pdfDoc.saveAsBase64({ dataUri: true});
}

export const filtraEventos = (data, filtroModalidad) => {
    let eventos = data;
    if (filtroModalidad != "Todas") {
        eventos = eventos.filter(evento => evento.modalidad.indexOf(filtroModalidad) >= 0);
    }
    return eventos;
}

export const getUltimaNewsletterEnviada = (allNewsletters) => {
    const newsletters = allNewsletters.filter(newsletter => newsletter.fechaEnvio);
    let newsletter = undefined;
    
    if (newsletters.length > 0) {
        newsletter = newsletters[0]

        newsletters.forEach((n) => {
            if (
                n.fechaEnvio &&
                (n.fechaEnvio > newsletter.fechaEnvio)
            ) {
              newsletter = n;
            }
        });
    }

    return newsletter;
}

export const diasEntreFechas = (fechaA, fechaB) => {
    const miliseconds = Math.abs(fechaB.getTime() - fechaA.getTime());
    const dias = Math.ceil(miliseconds / (1000 * 60 * 60 * 24));
    return dias;
}

export const getNewsletter = (newsletter) => {
    const enlacesArticulos = newsletter.enlaces.filter(enlace => enlace.tipo == "articulos");
    const enlacesEventos = newsletter.enlaces.filter(enlace => enlace.tipo == "eventos");
    let listaArticulos = "";
    let listaEventos = "";

    if (enlacesArticulos.length > 0) {
        enlacesArticulos.forEach(enlace => {
            listaArticulos = listaArticulos.concat(`
                <li><a href="${`https://mueveteapp.herokuapp.com/articulos/${enlace.enlace}`}">${enlace.titulo}</a></li>
            `);
        });
    }

    if (enlacesEventos.length > 0) {
        enlacesEventos.forEach(enlace => {
            listaEventos = listaEventos.concat(`
                <li><a href="${`https://mueveteapp.herokuapp.com/eventos/${enlace.enlace}`}">${enlace.titulo}</a></li>
            `);
        });
    }

    const content = `<div>
        <div><h2>${newsletter.titulo}</h2></div>
        <div><p>${newsletter.cuerpo}</p></div>
        ${listaArticulos.length > 0 ? `<div>
        <h3>Artículos</h3>
        <ul>${listaArticulos}</ul>
        </div>` : ""}
        ${listaEventos.length > 0 ? `<div>
        <h3>Eventos</h3>
        <ul>${listaEventos}</ul>
        </div>` : ""}
    </div>`;

    return content;
}