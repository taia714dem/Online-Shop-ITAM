import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import "./Card.css";
import { FilterOptions } from "./FilterOptions/FilterOptions";
import { Product } from "../../types";
import ProductService from "../../ProductService";
import imageCompression from "browser-image-compression";

export function ACard() {
  const navigate = useNavigate();
  const { id } = useParams<Record<string, string | undefined>>();
  const [search, setSearch] = useState("");
  const [isUniqueOpened, setIsUniqueOpened] = useState(false);
  const [isCategoryOpened, setIsCategoryOpened] = useState(false);
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState("Канцелярия");
  const [selectedIsUniqueOption, setSelectedIsUniqueOption] = useState(
    "Множественная покупка"
  );
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [nameInput, setNameInput] = useState("");
  const [priceInput, setPriceInput] = useState<number | "">("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [quantityInput, setQuantityInput] = useState<number | "">("");
  const [save, setSave] = useState(false);
  const [imageInput, setImageInput] = useState(
    product ? product.picture : "/BigImage.svg"
  );
  const ToSave = () => {
    setSave(true);
  };
  useEffect(() => {
    const loadProduct = async () => {
      if (id && id !== "new") {
        const result = await ProductService.getProduct(id);
        if (result) {
          setProduct(result);
          setNameInput(result.name);
          setPriceInput(result.price);
          setDescriptionInput(result.description);
          setQuantityInput(result.quantity);
          setSelectedCategoryOption(result.category);
          setSelectedIsUniqueOption(result.uniqueness);
          setImageInput(result.picture || "");
        } else {
          console.error("Продукт не найден");
        }
      }
    };

    loadProduct();
  }, [id]);

  useEffect(() => {
    const saveProduct = async () => {
      if (save) {
        const formData = new FormData();
        formData.append("name", nameInput);
        formData.append("price", String(priceInput));
        formData.append("description", descriptionInput);
        formData.append("quantity", String(quantityInput));
        formData.append("uniqueness", selectedIsUniqueOption);
        formData.append("category", selectedCategoryOption);

        if (imageInput && imageInput !== "/BigImage.svg") {
          const imageBlob = await fetch(imageInput).then((res) => res.blob());
          formData.append("picture", imageBlob, "image.png");
        }

        if (id === "new") {
          await ProductService.createProduct(formData);
          navigate("/admin");
        } else {
          formData.append("id", id as string); // Добавляем id в FormData
          await ProductService.updateProduct(formData);
          navigate("/admin");
        }

        setSave(false);
      }
    };

    saveProduct();
  }, [
    save,
    imageInput,
    nameInput,
    priceInput,
    descriptionInput,
    quantityInput,
    imageInput,
    selectedIsUniqueOption,
    selectedCategoryOption,
  ]);

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
  };
  const handlePriceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPriceInput(value ? Number(value) : "");
  };
  const handleDescriptionInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionInput(event.target.value);
  };
  const handleQuantityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuantityInput(value ? Number(value) : "");
  };
  const handleImageInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageInput(reader.result as string);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Ошибка сжатия изображения:", error);
      }
    } else {
      setImageInput("");
    }
  };
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };


  useEffect(() => {
    console.log("Новое значение imageInput:", imageInput);
  }, [imageInput]);

  function OpenCategory() {
    setIsCategoryOpened((prev) => !prev);
  }
  function OpenIsUnique() {
    setIsUniqueOpened((prev) => !prev);
  }
  const CategoryOptions = ["Одежда", "Аксессуары", "Канцелярия", "Другое"];
  const isUniqueOptions = ["Множественная покупка", "Единоразовая покупка"];

  return (
    <>
      <Header setSearch={setSearch} />
      <img className="back" src="/backBtn.svg" onClick={() => navigate(-1)} />
      <img className="image" src={imageInput} />
      <div className="name">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageInput}
          style={{ display: 'none' }} // Скрыть стандартный ввод
          ref={fileInputRef}

        />
        <button className="addPict" onClick={handleButtonClick} >
          Добавить фото
        </button>

      </div>

      <div className="infoBlockACard">
        <div className="infoA">
          <div className="name">
            <span className="nameW">Название:</span>
            <input
              className="inputN"
              placeholder="Блокнот"
              value={nameInput}
              onChange={handleNameInput}
            />
          </div>
          <div className="name">
            <span className="nameW">Цена:</span>
            <input
              value={priceInput}
              onChange={handlePriceInput}
              className="inputN"
              placeholder="15 коинов"
            />
          </div>
          <div className="name">
            <span className="nameW">Описание:</span>
            <input
              value={descriptionInput}
              onChange={handleDescriptionInput}
              className="inputN"
              placeholder="Блокнот формата а5 без разметки"
            />
          </div>
          <div className="name">
            <span className="nameW">Количество в наличии:</span>
            <input
              className="inputN"
              placeholder="5 шт"
              value={quantityInput}
              onChange={handleQuantityInput}
            />
          </div>
          <div className="name">
            <span className="nameW">Уникальность:</span>
            <div className="choices" onClick={OpenIsUnique}>
              <span className="wordIsUniqueAd">{selectedIsUniqueOption}</span>

              <img className="img1A" src="/DownBlack.svg" />
            </div>
          </div>
          <div className="name">
            <span className="nameW">Категория:</span>
            <div className="choices" onClick={OpenCategory}>
              <span className="wordCategoryAd">{selectedCategoryOption}</span>
              <img className="img2A" src="/DownBlack.svg" />
            </div>
          </div>
        </div>
        <div className="ACardButtons">
          <button className="saveA" onClick={ToSave}>
            Сохранить
          </button>
          <button className="noA" onClick={() => navigate("/admin")}>
            Отмена
          </button>
        </div>
      </div>
      {isCategoryOpened ? (
        <FilterOptions
          options={CategoryOptions}
          selectedOption={selectedCategoryOption}
          setSelectedOption={setSelectedCategoryOption}
        />
      ) : null}
      {isUniqueOpened ? (
        <FilterOptions
          options={isUniqueOptions}
          selectedOption={selectedIsUniqueOption}
          setSelectedOption={setSelectedIsUniqueOption}
        />
      ) : null}
    </>
  );
}
