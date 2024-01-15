import React from "react";
import { UpdateServiceModal } from "./modals/UpdateServiceModal";

export const CardService = ({ service, deleteService, setServices }) => {

  return (
    <div
      to={`/employees/${service.id}`}
      className="p-5 shadow bg-white rounded hover:shadow-lg duration-300"
    >
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-col items-start justify-center w-full min-w-0 gap-0 text-base">
          <hr className="w-1/4 border-2 border-cyan-500 mb-2" />
          <strong className="font-semibold text-slate-700">
            {service.servicio}
          </strong>
          <p className="mt-1 mb-2 text-sm px-2 py-1 bg-cyan-50 text-cyan-500 rounded border border-cyan-300">{service.coste}€</p>
          <div className="flex gap-2 justify-start items-center">
            <UpdateServiceModal service={service} setServices={setServices}></UpdateServiceModal>
            <button
              onClick={() => deleteService(service.id)}
              className="inline-flex px-3 h-8 items-center justify-center gap-2 self-center whitespace-nowrap rounded text-xs font-medium tracking-wide text-red-500"
            >
              <span className="relative only:-mx-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
