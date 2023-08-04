import Screen from "../../../shared/components/screen/Screen";
import { useCategory } from "./hooks/useCategory";

const Category = () =>{
    const { categories } = useCategory(); 
    return (
        <Screen>
            <h1>Categoria</h1>
            {categories.map((category) => <h2 key={category.id}>{category.name}</h2>)}
        </Screen>
    )
}

export default Category;