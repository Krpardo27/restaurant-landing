// components/QRGenerator.jsx
import { QRCodeSVG } from "qrcode.react";

const QRGenerator = ({ mesa }) => {
  const url = `${window.location.origin}/menu?mesa=${mesa}`;

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg">
      <QRCodeSVG value={url} size={200} />
      <p className="mt-2 text-sm text-gray-600">Mesa {mesa}</p>
    </div>
  );
};

export default QRGenerator;
