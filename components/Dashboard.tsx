
import React from 'react';
import { Product } from '../types';
import { DollarSignIcon, PackageIcon, AlertTriangleIcon, PackageSearchIcon } from './icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  products: Product[];
}

const Dashboard: React.FC<DashboardProps> = ({ products }) => {
  const totalProducts = products.length;
  const totalStockValue = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const lowStockItems = products.filter(p => p.quantity < 10).length;
  const distinctCategories = new Set(products.map(p => p.category)).size;

  const categoryData = products.reduce((acc, product) => {
    const existingCategory = acc.find(item => item.name === product.category);
    if (existingCategory) {
      existingCategory.quantity += product.quantity;
    } else {
      acc.push({ name: product.category, quantity: product.quantity });
    }
    return acc;
  }, [] as { name: string; quantity: number }[]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value * 25000); // Approximate conversion
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Tổng số sản phẩm"
          value={totalProducts.toString()}
          icon={PackageIcon}
          color="blue"
        />
        <DashboardCard
          title="Tổng giá trị kho"
          value={formatCurrency(totalStockValue)}
          icon={DollarSignIcon}
          color="green"
        />
        <DashboardCard
          title="Sản phẩm sắp hết"
          value={lowStockItems.toString()}
          icon={AlertTriangleIcon}
          color="red"
        />
        <DashboardCard
          title="Số loại sản phẩm"
          value={distinctCategories.toString()}
          icon={PackageSearchIcon}
          color="purple"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Số lượng hàng theo loại</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={categoryData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ 
                    backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                    borderColor: '#4b5563'
                }}
                labelStyle={{ color: '#f3f4f6' }}
              />
              <Legend />
              <Bar dataKey="quantity" name="Số lượng" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: 'blue' | 'green' | 'red' | 'purple';
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon: Icon, color }) => {
    const colorClasses = {
        blue: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300',
        green: 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300',
        red: 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300',
        purple: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300',
    };

    return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${colorClasses[color]}`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  );
};

export default Dashboard;
