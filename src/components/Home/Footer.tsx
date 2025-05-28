import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-xs sm:text-sm p-4 sm:p-6 mt-auto select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>© 2024 DocHub. All rights reserved.</div>
        <div className="flex space-x-6 text-xs sm:text-sm">
          <Link className="hover:text-white" href="#">Privacy Policy</Link>
          <Link className="hover:text-white" href="#">Terms of Service</Link>
          <Link className="hover:text-white" href="#">Contact</Link>
        </div>
      </div>
    </footer>
  );
}