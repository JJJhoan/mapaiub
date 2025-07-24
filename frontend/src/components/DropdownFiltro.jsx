import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function DropdownFiltro({ label, opciones, selected, setSelected }) {
  return (
    <div className="w-full my-2">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button
            className="relative w-full cursor-pointer rounded-t-md bg-amber-400 py-2 pl-3 pr-10 text-left text-slate-800 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 transition"
          >
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronUpDownIcon
                className="h-5 w-5 text-slate-800 hover:text-amber-300 transition"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Listbox.Options
            className="max-h-60 overflow-auto bg-amber-500 py-1 rounded-b scroll-hide"
          >
            {opciones.map((opcion, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  clsx(
                    "relative cursor-pointer select-none py-2 pl-10 pr-4 transition",
                    active ? "bg-yellow-400 text-slate-950" : "text-slate-800"
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
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
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
