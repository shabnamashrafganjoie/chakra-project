"use client";
import MultiSelectDropdown from "@/components/ui/MultiSelectDropdown";
import { useState, useEffect } from "react";

export default function GameFilter() {
  const [products, setProducts] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <div>
      <MultiSelectDropdown
        options={products}
        onChange={setSelected}
      />
      <div className="mt-4">
        <h2>محصولات انتخاب شده:</h2>
        {selected.map(p => (
          <div key={p.id}>{p.title}</div>
        ))}
      </div>
    </div>
  );
}