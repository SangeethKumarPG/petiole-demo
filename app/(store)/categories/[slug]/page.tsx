import React from 'react';
import { getProductByCategory } from '@/sanity/lib/products/getProductByCategory';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import ProductsView from '@/components/ProductsView';

async function CategoryPage({ params }: { params: Promise<{ slug: string }> }){
  const {slug} = await params;
  const products = await getProductByCategory(slug);
  const categories = await getAllCategories();
  
  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-brand-dark p-4">
      <div className="bg-brand-card p-8 rounded-lg shadow-lg w-full max-w-4xl border border-brand-border">
        <h1 className="text-3xl font-bold mb-6 text-center text-brand-text">
          {slug
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}{' '}
          <span className="text-brand-gold">Collection</span>
        </h1>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}

export default CategoryPage;