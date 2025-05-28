import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex flex-col text-white sm:flex-row items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-900 gap-4 sm:gap-0">
      <div className="flex flex-col sm:flex-row items-center sm:space-x-6 select-none w-full sm:w-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-1 select-text whitespace-nowrap">
          <span className="text-blue-600 font-extrabold text-lg sm:text-base">Doc</span>
          <span className="text-green-500 font-extrabold text-2xl sm:text-xl">Hub</span>
        </Link>
        
        {/* Elements Dropdown */}
        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <select
            aria-label="Elements"
            className="w-full sm:w-auto bg-gray-900 text-white rounded px-4 py-2 cursor-pointer focus:outline-none text-base font-semibold"
          >
            <option selected>Elements</option>
            <option>Buttons</option>
            <option>Cards</option>
            <option>Inputs</option>
            <option>Loaders</option>
          </select>
        </div>
        
        {/* Navigation */}
        <nav className="flex flex-wrap sm:flex-nowrap gap-6 sm:gap-8 mt-2 sm:mt-0 text-base font-semibold w-full sm:w-auto justify-center sm:justify-start">
          <Link className="hover:underline whitespace-nowrap" href="#">
            Challenges
            <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block ml-1"></span>
          </Link>
          <Link className="hover:underline whitespace-nowrap" href="#">Spotlight</Link>
          <Link className="hover:underline whitespace-nowrap" href="#">Blog</Link>
        </nav>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-pink-600 px-5 py-2 rounded text-white hover:from-blue-700 hover:to-pink-700 transition w-full sm:w-auto text-base font-semibold">
          <i className="fas fa-plus"></i> Create
        </button>
        <button className="flex items-center justify-center gap-2 bg-gray-900 px-5 py-2 rounded text-white hover:bg-gray-800 transition w-full sm:w-auto text-base font-semibold">
          <i className="fas fa-rocket"></i> Join the Community
        </button>
      </div>
    </header>
  );
}