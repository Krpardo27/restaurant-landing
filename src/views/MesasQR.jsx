import QRGenerator from "../components/QRGenerator";

const MesasQR = () => {
  const mesas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // tus mesas

  return (
    <div className="min-h-screen bg-zinc-950 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Códigos QR por Mesa
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mesas.map((mesa) => (
            <div key={mesa} className="bg-white rounded-xl p-4 shadow-lg">
              <QRGenerator mesa={mesa} />

              <button
                onClick={() => window.print()}
                className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
              >
                Imprimir QR Mesa {mesa}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MesasQR;
