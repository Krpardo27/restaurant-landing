import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const RouteError = () => {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-zinc-950 px-6 text-center text-white">
      <h1 className="text-3xl font-bold">
        {notFound ? "Página no encontrada" : "No se pudo cargar la página"}
      </h1>
      <p className="max-w-md text-zinc-300">
        {notFound ? "Comprueba la dirección o vuelve al inicio." : "Intenta recargar la página. Si el problema continúa, vuelve al inicio."}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button type="button" onClick={() => window.location.reload()} className="rounded-lg bg-red-600 px-4 py-3 hover:bg-red-700">
          Reintentar
        </button>
        <a href="/" className="rounded-lg border border-white/20 px-4 py-3">Volver al inicio</a>
      </div>
    </main>
  );
};

export default RouteError;