import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { serviceLinks } from "./navConfig";

export default function NavDropdown({ isOpen, onMouseEnter, onMouseLeave }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.99 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute left-1/2 top-full z-50 hidden w-[min(850px,calc(100vw-48px))] -translate-x-1/2 pt-3 lg:block"
        >
          <div className="overflow-hidden rounded-[26px] border border-red-100/80 bg-white/95 p-5 shadow-[0_25px_80px_rgba(110,20,30,0.14)] backdrop-blur-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-neutral-100 px-2 pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-red-600">
                  What we do
                </p>
                <h3 className="mt-1 text-lg font-bold text-neutral-900">
                  Solutions built around you
                </h3>
              </div>

              <ArrowDownRight className="text-red-500" size={22} />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {serviceLinks.map((service, index) => (
                <Link
                  key={service.href}
                  to={service.href}
                  className="group flex gap-4 rounded-2xl p-4 transition duration-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-100 bg-white text-xs font-bold text-red-600 shadow-sm transition duration-300 group-hover:border-red-200 group-hover:bg-red-600 group-hover:text-white">
                    {service.number}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1 text-sm font-bold text-neutral-800 transition-colors group-hover:text-red-700">
                      {service.title}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    </span>

                    <span className="mt-1.5 block text-xs leading-5 text-neutral-500">
                      {service.description}
                    </span>
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#fff4f4] via-white to-[#fff0f1] px-5 py-4">
              <div>
                <p className="text-sm font-bold text-neutral-900">
                  Have a unique requirement?
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  Let's explore the right solution for your business.
                </p>
              </div>

              <Link
                to="/contact"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-white transition duration-300 hover:rotate-45 hover:bg-red-700"
                aria-label="Contact us"
              >
                <ArrowUpRight size={19} />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}