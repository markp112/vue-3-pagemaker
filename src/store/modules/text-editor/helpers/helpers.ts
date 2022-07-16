export default function getId(htmlContent: string) {
  const startOfId = htmlContent.indexOf('id') + 4;
  const endOfId = htmlContent.indexOf('"', startOfId);
  return htmlContent.substring(startOfId, endOfId)
};
