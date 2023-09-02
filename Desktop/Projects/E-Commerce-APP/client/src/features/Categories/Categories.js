import Category from "../../components/Category/Category";
import {useEffect, useState} from 'react';
import './categories.css'
import axios from 'axios';
function Categories() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/products/categories").then(res => {
            const categories = res.data

            setCategories(categories)
        }, [categories])


    }, [categories])

    return (
      <div className="categories">
        {categories.map((category) => {
            return <Category category = {category}/>
        })}
        
        
      </div>
    );
  }
  export default Categories;