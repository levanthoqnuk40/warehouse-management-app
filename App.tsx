
import React, { useState, useMemo } from 'react';
import { Product } from './types';
import { INITIAL_PRODUCTS } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import ProductModal from './components/ProductModal';
import { PlusIcon } from './components/icons';

type View = 'dashboard' | 'products';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    setProducts(prev => [...prev, { ...product, id: Date.now() }]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const openModalForNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard products={products} />;
      case 'products':
        return (
          <ProductList
            products={filteredProducts}
            onEdit={openModalForEdit}
            onDelete={handleDeleteProduct}
          />
        );
      default:
        return <Dashboard products={products} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100">
      <Sidebar currentView={view} setView={setView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 sm:p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white capitalize">{view === 'dashboard' ? 'Bảng điều khiển' : 'Sản phẩm'}</h1>
          </div>
          <div className="flex items-center space-x-4">
             {view === 'products' && (
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="hidden md:block w-64 px-4 py-2 text-sm text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <button
              onClick={openModalForNew}
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
            >
              <PlusIcon className="w-5 h-5" />
              <span className="hidden sm:inline ml-2">Thêm sản phẩm</span>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
          {renderView()}
        </main>
      </div>
      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={(product) => {
            if ('id' in product) {
              handleUpdateProduct(product as Product);
            } else {
              handleAddProduct(product);
            }
          }}
        />
      )}
    </div>
  );
};

export default App;
