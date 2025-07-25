import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function DropdownFiltro({ label, opciones, selected, setSelected, isDark }) {
  return (
    <div className="w-full my-2">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button
            className={clsx(
              "relative w-full cursor-pointer rounded-t-md py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 transition",
              isDark 
                ? "bg-amber-600 text-amber-100 hover:bg-amber-500" 
                : "bg-amber-400 text-slate-800 hover:bg-amber-300"
            )}
          >
            <span className="block truncate font-medium">{label}: {selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronUpDownIcon
                className={clsx(
                  "h-5 w-5 transition",
                  isDark ? "text-amber-100" : "text-slate-800"
                )}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Listbox.Options
            className={clsx(
              "max-h-60 overflow-auto py-1 rounded-b scroll-hide",
              isDark 
                ? "bg-gray-700 text-gray-100" 
                : "bg-amber-500 text-slate-800"
            )}
          >
            {opciones.map((opcion, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  clsx(
                    "relative cursor-pointer select-none py-2 pl-10 pr-4 transition",
                    isDark
                      ? active 
                        ? "bg-amber-600 text-amber-100" 
                        : "text-gray-200"
                      : active 
                        ? "bg-yellow-400 text-slate-950" 
                        : "text-slate-800"
                  )
                }
                value={opcion}
              >
                {({ selected }) => (
                  <>
                    <span className={clsx("block truncate", selected && "font-medium")}>
                      {opcion}
                    </span>
                    {selected ? (
                      <span className={clsx(
                        "absolute inset-y-0 left-0 flex items-center pl-3",
                        isDark ? "text-amber-300" : "text-white"
                      )}>
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}