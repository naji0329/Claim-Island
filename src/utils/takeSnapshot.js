import html2canvas from "html2canvas";

export const takeSnapshot = (elementId, callback) => {
  document.body.style.lineHeight = "0.5";
  const element = document.getElementById(elementId);
  element.style.width = "1024px";
  html2canvas(element).then((canvas) => {
    const link = document.createElement("a");
    link.download = "snapshot.png";
    link.href = canvas.toDataURL();
    link.click();
    link.remove();
    document.body.style.lineHeight = "";
    element.style.width = "";
    callback();
  });
};
