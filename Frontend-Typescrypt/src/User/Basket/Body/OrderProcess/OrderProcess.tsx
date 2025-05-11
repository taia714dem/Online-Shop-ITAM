import { Confirm } from "./Confirm";
import { Error } from "./Error";
import { Success } from "./Success";

interface OrderProcessProps {
  confirm: boolean;
  success: boolean;
  error: boolean;
  setConfirm: (confirm: boolean) => void;
  setError: (error: boolean) => void;
  setSuccess: (success: boolean) => void;
  totalPrice: number | undefined;
}

export function OrderProcess({ confirm, success, error, setConfirm, setSuccess,setError, totalPrice}: OrderProcessProps) {
  return (
    <>
    
      {confirm ? (
        <Confirm totalPrice={totalPrice} setConfirm={setConfirm} setSuccess={setSuccess} />
      ) : success ? (
        <Success setSuccess={setSuccess} />
      ) : error ? (
        <Error setError={setError} />
      ) : null}
    </>
  );
}
