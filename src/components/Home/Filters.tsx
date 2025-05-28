export default function Filters() {
  return (
    <div className="text-xs sm:text-sm text-gray-400 mb-4">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full justify-between">
        <div className="flex-shrink-0 font-semibold whitespace-nowrap text-sm sm:text-base">
          First page
        </div>
        <div className="flex gap-2">
          <button className="bg-gray-700 rounded px-2 py-1 text-white whitespace-nowrap text-xs sm:text-sm font-semibold">
            #neumorphism
          </button>
          <span className="flex items-center gap-1 whitespace-nowrap font-semibold text-xs sm:text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 4l18 0M3 12l18 0M3 20l18 0"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            Sort:
            <select
              className="bg-black text-gray-400 font-semibold ml-1 rounded px-2 py-1 focus:outline-none text-xs sm:text-sm"
              name="sort"
              title="Sort"
            >
              <option selected>Randomized</option>
              <option>Newest</option>
              <option>Popular</option>
            </select>
          </span>
        </div>
        
        <div className="relative flex-grow min-w-[140px] max-w-xs">
          <input
            className="w-full bg-gray-900 rounded-md border border-gray-700 px-3 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-xs sm:text-sm"
            placeholder="Search tags, users, posts..."
            type="text"
          />
          <i className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm sm:text-base"></i>
        </div>
      </div>
    </div>
  );
}