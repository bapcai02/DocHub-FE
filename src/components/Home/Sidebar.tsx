import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBookOpen, 
  faDotCircle, 
  faCheckSquare, 
  faToggleOn, 
  faClone, 
  faSpinner, 
  faKeyboard, 
  faFileAlt, 
  faSwatchbook, 
  faCommentAlt 
} from '@fortawesome/free-solid-svg-icons';

interface SidebarItem {
  icon: any;
  label: string;
}

export default function Sidebar() {
  const sidebarItems: SidebarItem[] = [
    { icon: faBookOpen, label: 'All' },
    { icon: faDotCircle, label: 'Buttons' },
    { icon: faCheckSquare, label: 'Checkboxes' },
    { icon: faToggleOn, label: 'Toggle switches' },
    { icon: faClone, label: 'Cards' },
    { icon: faSpinner, label: 'Loaders' },
    { icon: faKeyboard, label: 'Inputs' },
    { icon: faDotCircle, label: 'Radio buttons' },
    { icon: faFileAlt, label: 'Forms' },
    { icon: faSwatchbook, label: 'Patterns' },
    { icon: faCommentAlt, label: 'Tooltips' },
  ];

  return (
    <aside className="w-full sm:w-48 bg-gray-900 flex flex-row sm:flex-col gap-3 p-4 sm:p-6 text-xs font-semibold select-none overflow-x-auto sm:overflow-visible">
      {sidebarItems.map((item, index) => (
        <button
          key={index}
          className={`flex items-center gap-2 ${index === 0 ? 'bg-gray-800 rounded px-3 py-2 text-white' : 'hover:text-white text-gray-400'} text-sm whitespace-nowrap flex-shrink-0 sm:flex-shrink-auto`}
        >
          <FontAwesomeIcon icon={item.icon} className="w-4 h-4" /> {item.label}
        </button>
      ))}
    </aside>
  );
}
