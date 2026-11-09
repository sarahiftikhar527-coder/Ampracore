import { Navigate } from "react-router-dom";

function NavbarTestPage() {
  return (
    <section className="relative flex min-h-[calc(100vh-84px)] items-center justify-center overflow-hidden bg-gradient-to-br from-white via-white to-rose-50 px-6 py-20">
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-red-200/30 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-rose-200/30 blur-[100px]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white/80 px-4 py-2 text-xs font-semibold tracking-wide text-red-700 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          AMPRACORE · NAVBAR PREVIEW
        </span>

        <h1 className="mt-8 text-5xl font-black leading-[1.08] tracking-[-0.055em] text-neutral-900 sm:text-7xl lg:text-8xl">
          Digital experiences,
          <span className="mt-2 block bg-gradient-to-r from-red-800 via-red-500 to-rose-300 bg-clip-text text-transparent">
            reimagined.
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-neutral-600 sm:text-lg">
          This is a temporary preview to test the Ampracore navigation,
          animated service dropdown, responsive menu, and red-gradient design.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {["Smooth Motion", "Interactive Dropdown", "Responsive Design"].map(
            (item) => (
              <span
                key={item}
                className="rounded-full border border-red-100 bg-white/80 px-4 py-2.5 text-xs font-semibold text-neutral-700 shadow-sm"
              >
                {item}
              </span>
            )
          )}
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-3">
          {[
            { number: "01", label: "Explore" },
            { number: "02", label: "Discover" },
            { number: "03", label: "Connect" },
          ].map((item) => (
            <div
              key={item.number}
              className="rounded-2xl border border-white bg-white/70 p-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-lg hover:shadow-red-100/40"
            >
              <p className="text-2xl font-black text-red-600">
                {item.number}
              </p>
              <p className="mt-2 text-xs font-medium text-neutral-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const routeConfig = [
  { path: "/", element: <NavbarTestPage /> },
  { path: "/services", element: <NavbarTestPage /> },
  { path: "/services/:serviceSlug", element: <NavbarTestPage /> },
  { path: "/about", element: <NavbarTestPage /> },
  { path: "/portfolio", element: <NavbarTestPage /> },
  { path: "/contact", element: <NavbarTestPage /> },
  { path: "*", element: <Navigate to="/" replace /> },
];

export default routeConfig;