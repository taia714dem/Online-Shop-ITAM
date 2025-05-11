import { useEffect, useState } from "react";
import "./Delete.css";
import ProductService from "../../../../ProductService";
interface DeleteProps {
  setIsDeleteOn: (d: boolean) => void;
  id: string;
  onDelete: (id: string) => void;
}
export function Delete({ setIsDeleteOn, id, onDelete }: DeleteProps) {
  const [toDelete, setToDelete] = useState(false);
  useEffect(() => {
    if (toDelete) {
      const Del = async () => {
        try {
          const result = await ProductService.deleteProduct(id);
          console.log("Успешно удалено:", result);
          onDelete(id);
          setIsDeleteOn(false);
        } catch (error) {
          console.error("Ошибка при удалении продукта:", error);
        }
      };
      Del();
    }
  }, [toDelete, id, setIsDeleteOn]);
  function OnClickDelete() {
    console.log("Кнопка 'Удалить' нажата");
    setToDelete(true);
  }
  function OnClickDelay() {
    setIsDeleteOn(false);
  }
  return (
    <>
      <div className="overlay" />

      <div className="delete">
        <div className="deleteBox">
          <span className="quest">Удалить этот товар?</span>
          <div className="buttonsDEL">
            <button className="deleteB" onClick={OnClickDelete}>
              Удалить
            </button>
            <button className="no" onClick={OnClickDelay}>
              Отмена
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
