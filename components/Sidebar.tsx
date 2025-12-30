
import React from 'react';
import { DashboardIcon, PackageIcon, WarehouseIcon } from './icons';

interface SidebarProps {
  currentView: 'dashboard' | 'products';
  setView: (view: 'dashboard' | 'products') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Bảng điều khiển', icon: DashboardIcon },
    { id: 'products', label: 'Sản phẩm', icon: PackageIcon },
  ];

  return (
    <div className="w-16 md:w-64 bg-gray-800 dark:bg-gray-900 text-white flex flex-col transition-all duration-300">
      <div className="flex items-center justify-center md:justify-start md:px-6 h-16 md:h-[65px] border-b border-gray-700">
        <WarehouseIcon className="h-8 w-8 text-blue-400" />
        <span className="hidden md:block ml-3 font-semibold text-lg">Kho Hàng</span>
      </div>
      <nav className="flex-1 px-2 md:px-4 py-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as 'dashboard' | 'products')}
            className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${
              currentView === item.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="hidden md:block ml-4 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
