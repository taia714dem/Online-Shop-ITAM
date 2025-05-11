import "./MiddleHeader.css";
import { useState } from "react";
import { FilterOptions } from "./FilterOptions/FilterOptions";
import { useNavigate } from "react-router-dom";
interface MiddleHeaderProps {
  selectedOptionCost: string; // Выбранная опция по цене
  setSelectedOptionCost: (option: string) => void; // Функция для обновления опции по цене
  selectedOptionCategory: string; // Выбранная опция по категории
  setSelectedOptionCategory: (option: string) => void; // Функция для обновления опции по категории
  activeFilter: "cost" | "category" | null; // Активный фильтр
  setActiveFilter: (filter: "cost" | "category" | null) => void;
}


export function MiddleHeader({
  selectedOptionCost,
  setSelectedOptionCost,
  selectedOptionCategory,
  setSelectedOptionCategory,
  activeFilter,
  setActiveFilter,
}: MiddleHeaderProps) {
  const [isFilterCostOn, setIsFilterCostOn] = useState(false);
  const [isFilterCategoryOn, setIsFilterCategoryOn] = useState(false);
  const navigate=useNavigate();
  const [filterThing, setFilterThing] = useState("filterDown.svg");
  const [filterThingCategory, setFilterThingCategory] =
    useState("filterDown.svg");

  const toggleFilter = () => {
    setIsFilterCostOn((prev) => !prev);
    setFilterThing((prev) =>
      prev === "filterDown.svg" ? "filterUp.svg" : "filterDown.svg"
    );
    setActiveFilter(isFilterCostOn ? null : "cost");
  };
  const col2 = isFilterCategoryOn ? "grey" : "white";
  const toggleFilter2 = () => {
    setIsFilterCategoryOn((prev) => !prev);
    setFilterThingCategory((prev) =>
      prev === "filterDown.svg" ? "filterUp.svg" : "filterDown.svg"
    );
    setActiveFilter(isFilterCategoryOn ? null : "category"); // Обновляем активный фильтр
  };
  const col = isFilterCostOn ? "grey" : "white";

  const optionsCost = ["Сначала дороже", "Сначала дешевле"];
  const optionsCategory = [
    "Все",
    "Одежда",
    "Аксесуары",
    "Канцелярия",
    "Другое",
  ];

  return (
    <>
      <div className="middleHeader">
        <div className="leftPart">
          <span className="word">Все товары</span>
          <div className="filters">
            <div
              className="costFilter"
              style={{ color: col }}
              onClick={toggleFilter}
            >
              <span className="wordCost">Сначала дороже</span>
              <img className="filterThing" src={filterThing} />
            </div>
            <div
              className="CategoryFilter"
              style={{ color: col2 }}
              onClick={toggleFilter2}
            >
              <span className="wordCost">Категория</span>
              <img className="filterThing" src={filterThingCategory} />
            </div>
            <img className="addProduct" src="addG.svg"  onClick={()=>navigate("/admin/addProduct/new")} />
          </div>
        </div>

        <div className="filts">
          {isFilterCostOn ? (
            <FilterOptions
              options={optionsCost}
              selectedOption={selectedOptionCost}
              setSelectedOption={setSelectedOptionCost}
            />
          ) : null}
          {isFilterCategoryOn ? (
            <FilterOptions
              options={optionsCategory}
              selectedOption={selectedOptionCategory}
              setSelectedOption={setSelectedOptionCategory}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
