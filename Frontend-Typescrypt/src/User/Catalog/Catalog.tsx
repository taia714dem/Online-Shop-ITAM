import { Body } from "./Body/Body";
import { NothingFound } from "./Body/NothingFound/NothingFound";
import "./Catalog.css";
import { useEffect, useState } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { MiddleHeader } from "./MiddleHeader/MiddleHeader";
import ProductService from "../../ProductService";
import { Product } from "../../types";
import {observer} from 'mobx-react-lite'
interface Products {
  data: Product[];
}

function Catalog() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Products | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
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
    let filteredProducts: Product[] | undefined = undefined;

    if (search) {
      filteredProducts = products?.data?.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      filteredProducts = products?.data;
    }
  if (error) return <div>{error}</div>;

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
    filteredProducts=filteredProducts?.filter((item) => item.category === selectedOptionCategory);
  }

  if (selectedOptionCost == "Сначала дороже") {
    filteredProducts?.sort((a, b) => b.price - a.price);
  } else {
    filteredProducts?.sort((a, b) => a.price - b.price);
  }

  return (
    <>
      <Header setSearch={setSearch} />
      {search && filteredProducts?.length == 0 ? (
              <NothingFound />
            ) : search.length==0 && filteredProducts?.length==0 ? (<NothingFound />):(
              <div>
                <MiddleHeader
                  selectedOptionCost={selectedOptionCost}
                  setSelectedOptionCost={setSelectedOptionCost}
                  selectedOptionCategory={selectedOptionCategory}
                  setSelectedOptionCategory={setSelectedOptionCategory}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />
                <Body filteredProducts={filteredProducts} />
              </div>
            )}

      <Footer />
    </>
  );
}

export default observer(Catalog)