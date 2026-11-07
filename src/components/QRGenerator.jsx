import { QRCodeSVG } from "qrcode.react";
import { buildTableMenuUrl } from "../utils/qr";

const QRGenerator = ({ mesa, siteUrl }) => {
  const url = buildTableMenuUrl(siteUrl, mesa);

  if (!url) {
    return <div className="qr-code-placeholder">Aplica un dominio público válido para generar este QR.</div>;
  }

  return (
    <div className="qr-code">
      <QRCodeSVG
        value={url}
        size={200}
        marginSize={4}
        level="M"
        bgColor="#ffffff"
        fgColor="#111111"
        title={`Carta digital de la mesa ${mesa}`}
      />
    </div>
  );
};

export default QRGenerator;
