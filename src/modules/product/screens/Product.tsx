import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import Table from '../../../shared/components/table/Table';
import { ProductType } from '../../../shared/types/ProductType';
import CategoryColumn from '../components/CategoryColumn';
import TootipImage from '../components/TootipImage';
import { convertNumberToMoney } from '../../../shared/functions/money';
import Screen from '../../../shared/components/screen/Screen';
import Button from '../../../shared/components/Buttons/button/Button';
import { Input } from 'antd';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { DisplayFlexJustifyBetween } from '../../../shared/components/styles/display.styled';
import { useProduct } from '../hooks/useProducts';

const { Search } = Input;

const Product = () => {

  const { productsFiltered, handleOnClickInsert, onSearch, handleDeleteProduct, handleEditProduct} = useProduct();
   
  const columns: ColumnsType<ProductType> = useMemo(() => [
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
    {
      title: 'Excluir',
      dataIndex: '',
      key: 'x',
      render: (_, product) => 
      <>
        <a onClick={() => handleEditProduct(product.id)}>Editar</a>
        <a onClick={() => handleDeleteProduct(product.id)}>Remover</a> 
      </>
    }
  ],[])
  
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