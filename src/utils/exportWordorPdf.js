import { saveAs } from "file-saver";
import { asBlob } from "html-docx-js-typescript";
 
export function exportToWord(html, name='大帅哥的简历') {
  let htmlString = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>
  <body>
    ${html}
  </body>
  </html>
  `;
  asBlob(htmlString).then((data) => {
    saveAs(data, `${name}.docx`);
  });
}