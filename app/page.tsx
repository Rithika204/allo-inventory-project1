"use client";

import { useEffect, useState } from "react";

export default function HomePage() {

  const [products, setProducts] = useState<any[]>([]);

  async function loadProducts() {

    const res = await fetch("/api/products");

    const data = await res.json();

    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <main style={{ padding: 30 }}>

      <h1>Inventory Reservation System</h1>

      {products.map((product) => (

        <div
          key={product.id}
          style={{
            border: "1px solid gray",
            padding: 20,
            marginTop: 20,
          }}
        >

          <h2>{product.name}</h2>

          {product.stocks.map((stock: any) => (

            <div key={stock.stockId}>

              <p>
                Warehouse:
                {" "}
                {stock.warehouseName}
              </p>

              <p>
                Available Stock:
                {" "}
                {stock.availableStock}
              </p>

              <button>
                Reserve
              </button>

            </div>
          ))}

        </div>
      ))}

    </main>
  );
}