import { SearchIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";


export default function Searcher({ search, onSubmit, onChange, categories }) {
  return (
    <form onSubmit={ e=> onSubmit(e) } className="flex rounded-md shadow-sm">
        <div className="inset-y-0 left-0 pl-3 flex items-center">
          <select
              onChange={ e => onChange(e) }
              style={{
                backgroundColor: '#f8f9fa',
                borderRadius:'25px'
              }}
              name='category_id'
              className='pr-10'
              >
              {categories &&
                categories !== null &&
                categories !== undefined &&
                categories.map((category, index) => {
                  return (
                    <><option key={index} value={category.id}>{category.name}</option></>
                  )
                })
              }
            </select>
        </div>
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <input
            onChange={ e => onChange(e) }
            type="search"
            name="search"
            value={search}
            id="email"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
            placeholder="Buscar"
          />
        </div>
        <button
          type="submit"
          className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
    </form>
  );
}
