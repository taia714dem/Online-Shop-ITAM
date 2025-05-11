import { Body } from "./Body/Body";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { useState } from "react";
export function ProductCard(){
    const [search, setSearch]=useState("")
    return(
    <>
        <Header setSearch={setSearch} />
        <Body />
        {/*<Footer />*/}
    </>)
}