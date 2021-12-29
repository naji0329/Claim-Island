import html2canvas from "html2canvas";

export const takeSnapshot = (elementId, callback) => {
  document.body.style.lineHeight = "0.5";
  html2canvas(document.getElementById(elementId)).then((canvas) => {
    const link = document.createElement("a");
    link.download = "snapshot.png";
    link.href = canvas.toDataURL();
    link.click();
    link.remove();
    document.body.style.lineHeight = "";
    callback();
  });
};
