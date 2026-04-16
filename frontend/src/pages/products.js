import React from "react";
import Layout from "@layout/Layout";
import ProductCatalog from "@components/product/ProductCatalog";

const Products = () => {
  return (
    <Layout title="Products" description="PowerQ Test & Tag Melbourne Products">
      <div className="bg-[#f8f9fa] min-h-screen">
        <ProductCatalog />
      </div>
    </Layout>
  );
};

export default Products;

