import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';


import Table from '../../../shared/components/table/Table';
import { URL_PRODUCT } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ProductType } from '../../../shared/types/ProductType';
import CategoryColumn from '../components/CategoryColumn';
import TootipImage from '../components/TootipImage';
import { convertNumberToMoney } from '../../../shared/functions/money';
import Screen from '../../../shared/components/screen/Screen';
import Button from '../../../shared/components/Buttons/button/Button';
import { ProductRoutesEnum } from '../routes';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { DisplayFlexJustifyBetween } from '../../../shared/components/styles/display.styled';


const { Search } = Input;


const columns: ColumnsType<ProductType> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (_, product) => <TootipImage product={product}/>,
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    sorter: (a,b) => a.name.localeCompare(b.name),
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Categoria',
    dataIndex: 'category',
    key: 'category',
    render: (_,product) => <CategoryColumn category={product.category} />,
  },
  {
    title: 'Preço',
    dataIndex: 'price',
    key: 'price',
    sorter: (a,b) => a.price - b.price,
    render: (_, product) => <a>{convertNumberToMoney(product.price)}</a>,
  },
];


const Product = () => {
  const { products, setProducts } = useDataContext();
  const [ productsFiltered, setProductsFiltered ] = useState<ProductType[]>([])
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() =>{
    setProductsFiltered([...products])
  }, [products]);

  useEffect(() =>{
    request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts);
  }, []);

  const handleOnClickInsert = () =>{
    navigate(ProductRoutesEnum.PRODUCT_INSERT)
  }

  const onSearch = (value: string) => {
    if(!value){
      setProductsFiltered([...products])
    } else {
      setProductsFiltered([...productsFiltered.filter((product) =>  product.name.includes(value))])
    }
  }

  return ( 
    <Screen listBreadcrumb={[
      {
        name:'HOME'
      },
      {
        name:'PRODUTOS'
      }
    ]}> 
      <DisplayFlexJustifyBetween margin='0px px 16px 0px'>
        <LimitedContainer width={240}>
          <Search placeholder='Buscar produto' onSearch={onSearch} enterButton />
        </LimitedContainer>        

        <LimitedContainer width={240}>
          <Button type="primary" onClick={handleOnClickInsert}>Inserir</Button>
        </LimitedContainer>

      </DisplayFlexJustifyBetween>
      <Table columns={columns} dataSource={productsFiltered} /> 
    </Screen>
  );
};

export default Product;