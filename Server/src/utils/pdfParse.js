const {PDFParse} = require("pdf-parse");
const textExtracter = async (fileBuffer) => {
  try {
    const parser = new PDFParse({data:fileBuffer});
    const content=await parser.getText();
    return content.text;
  } catch (err) {
    console.log(err);
    throw new Error("PDF extraction failed");
  }
};
module.exports = textExtracter;
