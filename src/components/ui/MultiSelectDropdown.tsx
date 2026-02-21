"use client";
import { Fragment, useMemo, useRef, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Product } from "@/features/products/types/product.types";

interface MultiSelectDropdownProps {
  options: Product[];
  onChange: (selected: Product[]) => void;
}

// تابع گروه‌بندی محصولات بر اساس دسته‌بندی
const groupProductsByCategory = (products: Product[]) => {
  return products.reduce((groups, product) => {
    const category = product.category || 'سایر';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {} as Record<string, Product[]>);
};

export default function MultiSelectDropdown({ options, onChange }: MultiSelectDropdownProps) {
  const [selected, setSelected] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // فیلتر براساس جستجو
  const filteredOptions = useMemo(() => {
    if (query === "") return options;
    return options.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query]);

  // گروه‌بندی محصولات فیلتر شده
  const groupedOptions = useMemo(() => {
    return groupProductsByCategory(filteredOptions);
  }, [filteredOptions]);

  const handleSelect = (option: Product) => {
    const alreadySelected = selected.find(s => s.id === option.id);
    let newSelected;
    if (alreadySelected) {
      newSelected = selected.filter(s => s.id !== option.id);
    } else {
      newSelected = [...selected, option];
    }
    setSelected(newSelected);
    onChange(newSelected);
  };

  // انتخاب همه محصولات فیلتر شده
  const handleSelectAll = () => {
    setSelected(filteredOptions);
    onChange(filteredOptions);
  };

  // پاک کردن همه انتخاب‌ها
  const handleClearAll = () => {
    setSelected([]);
    onChange([]);
  };

  const listboxRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // رفرنس برای محاسبه مجدد virtualizer
  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => listboxRef.current,
    estimateSize: () => 48,
  });

  // محاسبه مجدد virtualizer وقتی drop-down باز می‌شود
  useEffect(() => {
    if (isOpen && mounted) {
      setTimeout(() => {
        virtualizer.measure();
      }, 10);
    }
  }, [isOpen, filteredOptions.length, mounted, virtualizer]);

  useEffect(() => setMounted(true), []);

  // تبدیل آرایه تخت به آرایه‌ای با ساختار گروه‌بندی برای virtualizer
  const virtualizedRows = useMemo(() => {
    const rows: Array<{ type: 'group' | 'item'; key: string; data: any; items?: Product[] }> = [];
    
    Object.entries(groupedOptions).forEach(([category, products]) => {
      // اضافه کردن هدر گروه
      rows.push({
        type: 'group',
        key: `group-${category}`,
        data: category,
        items: products
      });
      
      // اضافه کردن محصولات گروه
      products.forEach(product => {
        rows.push({
          type: 'item',
          key: `item-${product.id}`,
          data: product
        });
      });
    });
    
    return rows;
  }, [groupedOptions]);

  return (
    <div className="w-full max-w-sm mx-auto">
      <Listbox value={selected} onChange={() => {}} as="div">
        <div className="relative mt-1">
          <Listbox.Button
            className="relative w-full cursor-default rounded-lg bg-white border border-gray-300 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="block truncate">
              {selected.length === 0
                ? "انتخاب کنید..."
                : `${selected.length} محصول انتخاب شده`}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            show={isOpen}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              ref={listboxRef}
              className="absolute mt-1 max-h-96 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50"
            >
              {/* جستجو */}
              <div className="px-3 pb-2 pt-1 sticky top-0 bg-white z-10 border-b">
                <input
                  type="text"
                  placeholder="جستجو..."
                  className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              {/* دکمه‌های انتخاب همه/پاک کردن همه */}
              {filteredOptions.length > 0 && (
                <div className="flex gap-2 px-3 py-2 sticky top-[43px] bg-white z-10 border-b">
                  <button
                    onClick={handleSelectAll}
                    className="flex-1 bg-green-500 text-white text-xs py-1 px-2 rounded hover:bg-green-600 transition"
                  >
                    انتخاب همه
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="flex-1 bg-red-500 text-white text-xs py-1 px-2 rounded hover:bg-red-600 transition"
                  >
                    پاک کردن همه
                  </button>
                </div>
              )}

              {/* نمایش تعداد انتخاب‌ها */}
              {selected.length > 0 && (
                <div className="px-3 py-2 bg-blue-50 text-blue-700 text-xs border-b">
                  {selected.length} محصول انتخاب شده
                </div>
              )}

              {/* لیست محصولات با گروه‌بندی */}
              {mounted && (
                <div
                  style={{
                    height: `${virtualizer.getTotalSize()}px`,
                    position: "relative",
                  }}
                >
                  {virtualizer.getVirtualItems().map((virtualRow) => {
                    const rowData = virtualizedRows[virtualRow.index];
                    
                    if (rowData.type === 'group') {
                      // رندر هدر گروه
                      return (
                        <div
                          key={rowData.key}
                          className="sticky top-[104px] bg-gray-100 py-1 px-3 text-xs font-bold text-gray-700 border-y"
                          style={{
                            position: "absolute",
                            top: 8,
                            left: 0,
                            width: "100%",
                            transform: `translateY(${virtualRow.start}px)`,
                            zIndex: 5
                          }}
                        >
                          {rowData.data} ({rowData.items?.length} محصول)
                        </div>
                      );
                    } else {
                      // رندر آیتم محصول
                      const option = rowData.data as Product;
                      const isSelected = selected.some(s => s.id === option.id);

                      return (
                        <Listbox.Option
                          key={rowData.key}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? "bg-green-100 text-green-900" : "text-gray-900"
                            } ${isSelected ? "bg-green-50" : ""}`
                          }
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            transform: `translateY(${virtualRow.start}px)`,
                          }}
                          value={option}
                          onClick={() => handleSelect(option)}
                        >
                          <span className={`block truncate ${isSelected ? "font-medium" : "font-normal"}`}>
                            {option.title}
                          </span>
                          {isSelected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                              <CheckIcon className="h-5 w-5" />
                            </span>
                          )}
                        </Listbox.Option>
                      );
                    }
                  })}
                </div>
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}