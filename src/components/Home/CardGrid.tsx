import Card from './Card';

interface CardData {
  bgColor: string;
  imageSrc: string;
  altText: string;
  author: string;
  views: string;
  comments: string;
  isButton?: boolean;
}

export default function CardGrid() {
  const cardData: CardData[] = [
    {
      bgColor: 'bg-gray-200',
      imageSrc: 'https://storage.googleapis.com/a1aa/image/d5f30b92-067b-4417-da9c-5c89f02151f9.jpg',
      altText: 'Purple circular CSS button with arrow icon in center',
      author: 'Creatlydev',
      views: '7K views',
      comments: '492'
    },
    {
      bgColor: 'bg-gray-800',
      imageSrc: '',
      altText: 'Share button with gradient',
      author: 'Mohammad-Rahme-576',
      views: '9.4K views',
      comments: '868',
      isButton: true
    },
    // Add all other card data objects here
  ];

  return (
    <div className="flex flex-wrap gap-4 overflow-y-auto scrollbar-hide">
      {cardData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
}