import { Body } from "./Body/Body";
import { NothingFound } from "./Body/NothingFound/NothingFound";
import "./Catalog.css";
import { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { MiddleHeader } from "./MiddleHeader/MiddleHeader";
import { Footer } from "../../User/Footer/Footer";
import { Delete } from "./Body/DeleteComponent/Delete";
import ProductService from "../../ProductService";
import { Product } from "../../types";
interface Products {
  data: Product[];
}
export function ACatalog() {
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Products | undefined>(undefined);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ProductService.getInfo();
        setProducts(result);
        console.log(result);
      } catch (error) {
        setError("Failed to fetch products");
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const handleDeleteProduct = (id: string) => {
    setProducts((prevProducts) => {
      // Проверяем, существует ли prevProducts и содержит ли он массив данных
      if (prevProducts && prevProducts.data) {
        return {
          data: prevProducts.data.filter((product) => product.id !== id)
        };
      }
      // Если products не установлены, возвращаем текущее значение
      return prevProducts;
    });
  };

  if (error) return <div>{error}</div>;
  let filteredProducts: Product[] | undefined = undefined;

  if (search) {
    filteredProducts = products?.data?.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    filteredProducts = products?.data;
  }

  const optionsCost = ["Сначала дороже", "Сначала дешевле"];
  const optionsCategory = [
    "Все",
    "Одежда",
    "Аксесуары",
    "Канцелярия",
    "Другое",
  ];

  const [selectedOptionCost, setSelectedOptionCost] = useState<string>(
    optionsCost[0]
  ); // Для фильтров стоимости
  const [selectedOptionCategory, setSelectedOptionCategory] = useState<string>(
    optionsCategory[0]
  ); // Для фильтров категории
  const [activeFilter, setActiveFilter] = useState<"cost" | "category" | null>(
    null
  );
  if (selectedOptionCategory != "Все") {
    filteredProducts = filteredProducts?.filter(
      (item) => item.category === selectedOptionCategory
    );
  }

  if (selectedOptionCost == "Сначала дороже") {
    filteredProducts?.sort((a, b) => b.price - a.price);
  } else {
    filteredProducts?.sort((a, b) => a.price - b.price);
  }

  const [isDeleteOn, setIsDeleteOn] = useState(false);
  const [id, setId] = useState("");

  return (
    <>
      <Header setSearch={setSearch} />
      {search && filteredProducts?.length == 0 ? (
        <NothingFound />
      ) : search.length == 0 && filteredProducts?.length == 0 ? (
        <NothingFound />
      ) : (
        <div>
          <MiddleHeader
            selectedOptionCost={selectedOptionCost}
            setSelectedOptionCost={setSelectedOptionCost}
            selectedOptionCategory={selectedOptionCategory}
            setSelectedOptionCategory={setSelectedOptionCategory}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          <Body
            setId={setId}
            setIsDeleteOn={setIsDeleteOn}
            filteredProducts={filteredProducts}
          />
        </div>
      )}
      {isDeleteOn ? (
        <Delete
          id={id}
          setIsDeleteOn={setIsDeleteOn}
          onDelete={handleDeleteProduct}
        />
      ) : null}

      <Footer />
    </>
  );
}
