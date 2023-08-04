import { ColumnsType } from "antd/es/table";
import Screen from "../../../shared/components/screen/Screen";
import Table from "../../../shared/components/table/Table";
import { CategoryType } from "../../../shared/types/CategoryTypes";
import { useCategory } from "../hooks/useCategory";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { Input } from "antd";
import Button from "../../../shared/components/Buttons/button/Button";
import { useNavigate } from "react-router-dom";
import { CategoryRoutesEnum } from "./routes";
import { DisplayFlexJustifyBetween } from "../../../shared/components/styles/display.styled";

const { Search } = Input;

const columns: ColumnsType<CategoryType> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a,b) => a.name.localeCompare(b.name),
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Produtos',
      dataIndex: 'amountProducts',
      key: 'amountProducts',
      render: (text) => <a>{text}</a>,
    }
  ];

const Category = () =>{
    const { categories } = useCategory(); 
    const navigate = useNavigate();


    const handleOnClickCategory = () =>{
        navigate(CategoryRoutesEnum.CATEGORY_INSERT)
    }

    const handleOnSearch =(value: string) =>{
        alert(value)
    }

    return (
        <Screen 
        listBreadcrumb={[
            {
              name:'HOME'
            },
            {
              name:'CATEGORIAS'
            }
          ]}>
            <DisplayFlexJustifyBetween  margin='0px px 16px 0px'>
                <LimitedContainer width={240}>
                <Search placeholder='Buscar categoria' onSearch={handleOnSearch} enterButton />
                </LimitedContainer>        

                <LimitedContainer width={240}>
                <Button type="primary" onClick={handleOnClickCategory}>Inserir</Button>
                </LimitedContainer>   
            
            </DisplayFlexJustifyBetween>
            <Table columns={columns} dataSource={categories} /> 
        </Screen>
    )
}

export default Category;