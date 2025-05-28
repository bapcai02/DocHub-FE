interface CardProps {
  bgColor?: string;
  imageSrc: string;
  altText: string;
  author: string;
  views: string;
  comments: string;
  isButton?: boolean;
}

export default function Card({ 
  bgColor = 'bg-gray-200', 
  imageSrc, 
  altText, 
  author, 
  views, 
  comments,
  isButton = false
}: CardProps) {
  return (
    <div className={`w-40 sm:w-48 ${bgColor} rounded-md flex flex-col justify-between`}>
      <div className="flex justify-center items-center h-40 sm:h-48">
        {isButton ? (
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full px-6 py-2 text-white font-semibold shadow-lg text-sm sm:text-base">
            Share
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12v.01M12 12v.01M20 12v.01M12 20v.01M12 4v.01"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M16 12l-4-4m0 0l-4 4m4-4v12"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        ) : (
          <img
            alt={altText}
            className="rounded-md mx-auto"
            height="180"
            src={imageSrc}
            width="200"
          />
        )}
      </div>
      <div className={`flex justify-between items-center px-2 py-1 text-xs font-bold ${bgColor.includes('gray-800') ? 'text-white' : 'text-black'}`}>
        <span>{author}</span>
        <div className={`flex items-center gap-2 font-normal ${bgColor.includes('gray-800') ? 'text-gray-400' : 'text-gray-700'} text-xs`}>
          <span>{views}</span>
          <i className="far fa-comment-alt"></i>
          <span>{comments}</span>
        </div>
      </div>
    </div>
  );
}