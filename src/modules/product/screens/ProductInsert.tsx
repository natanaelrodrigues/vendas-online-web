import { useEffect, useState } from "react";
import Screen from "../../../shared/components/screen/Screen";
import { ProductRoutesEnum } from "../routes";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequests";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { URL_CATEGORY, URL_PRODUCT } from "../../../shared/constants/urls";
import { LimitedContainer } from "../styles/productInsert.style";
import Input from "../../../shared/components/inputs/input/input";
import Button from "../../../shared/components/Buttons/button/Button";
import Select from "../../../shared/components/inputs/select/Select";
import { InsertProduct } from "../../../shared/dtos/InsertProduct.dto";
import { connectionAPIPost } from "../../../shared/functions/connections/connectionsAPI";



const ProductInsert = () =>{
  const [ product, setProduct ] = useState<InsertProduct>({
    name: '',
    price: 0,
    image: '',
  });
  const { categories, setCategories  } = useDataContext();
  const { request } = useRequests();

  useEffect(() => {
    if(categories.length === 0) {
      request(URL_CATEGORY, MethodsEnum.GET,setCategories)
    }
  },[])

  const handleInsertProduct = () =>{
    connectionAPIPost(URL_PRODUCT,product)
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) =>{
    setProduct({
      ...product,
      [nameObject]: event.target.value,
    })
  }

  const onChangePrice = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setProduct({
      ...product,
      price: Number( event.target.value)
    })
  }

  const handleChange = (value: string) => {
    setProduct({
      ...product,
      categoryId: Number(value)
    })
  };

    return <Screen listBreadcrumb={[
      {
        name:'HOME'
      },
      {
        name:'PRODUTOS',
        navigateTo: ProductRoutesEnum.PRODUCT
      },
      {
        name:'INSERIR PRODUTOS'
      }
    ]}>
      <LimitedContainer>
       <Input onChange={(event) => onChange(event, 'name')}  value={product.name} margin='0px 0px 16px 0px' title='Nome' placeholder='Nome'/>
        <Input onChange={(event) => onChange(event, 'image')} value={product.image} margin='0px 0px 16px 0px' title='Url Imagem' placeholder='Url Imagem' />
        <Input onChange={onChangePrice} value={product.price} margin='0px 0px 16px 0px' title='Preço' placeholder='Preço' />
        <Select
          title='Categoria'
          margin='0px 0px 32px 0px'
          style={{  width: '100%' }}
          onChange={handleChange}
          options={
            categories.map((category) => ({
              value: `${category.id}`,
              label: `${category.name}`,
            }))
          }
        />
        <Button type="primary" onclick={handleInsertProduct}>Inserir produto</Button>
      </LimitedContainer>
    </Screen>
}

export default ProductInsert;