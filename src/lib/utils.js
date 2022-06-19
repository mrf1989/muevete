import * as cookie from "cookie";
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

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
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const page = pdfDoc.addPage([297, 210]);
    const { width, height } = page.getSize();
    const textSize = 10;

    const textEvento = `${evento.nombre}`;
    const textEventoWidth = helveticaFont.widthOfTextAtSize(textEvento, textSize);
    const textLema = `"${dorsal.lema}"`;
    const textLemaWidth = helveticaFont.widthOfTextAtSize(textLema, textSize + 2);

    page.moveTo(40, height - 25);
    page.drawRectangle({
        width: width - 40*2,
        height: 40,
        color: rgb(0.2, 0.4, 0.8)
    });
    page.moveDown(20);
    page.drawText("MUÉVETE POR LOS QUE NO PUEDEN", {
        size: 12
    });
    page.moveDown(16);
    page.moveRight(65);
    page.drawText("EVENTO SOLIDARIO", {
        size: 8
    });
    page.drawText(textEvento, {
        x: page.getWidth() / 2 - textEventoWidth / 2,
        y: height - 80,
        maxWidth: width - 40*2,
        lineHeight: 10,
        size: textSize,
    });
    page.drawText(`${dorsal.num.toString().padStart(4, 0)}`, {
        x: 66,
        y: 55,
        size: 80,
    });
    page.drawText(textLema, {
        x: page.getWidth() / 2 - textLemaWidth / 2,
        y: 25,
        maxWidth: width - 40*2,
        lineHeight: 10,
        size: textSize + 2,
    });
    return await pdfDoc.saveAsBase64({ dataUri: true});
}