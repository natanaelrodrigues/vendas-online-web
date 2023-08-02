import { useEffect, useState } from "react";
import Screen from "../../../shared/components/screen/Screen";
import { ProductRoutesEnum } from "../routes";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequests";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { URL_CATEGORY, URL_PRODUCT } from "../../../shared/constants/urls";
import { ProductInsertContainer } from "../styles/productInsert.style";
import Input from "../../../shared/components/inputs/input/input";
import Button from "../../../shared/components/Buttons/button/Button";
import Select from "../../../shared/components/inputs/select/Select";
import { InsertProduct } from "../../../shared/dtos/InsertProduct.dto";
import { connectionAPIPost } from "../../../shared/functions/connections/connectionsAPI";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { DisplayFlexJustifyRight } from "../../../shared/components/styles/display.styled";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../shared/hooks/useGlobalContext";



const ProductInsert = () =>{
  const [ product, setProduct ] = useState<InsertProduct>({
    name: '',
    price: 0,
    image: '',
  });
  const { categories, setCategories  } = useDataContext();
  const { setNotification } = useGlobalContext();
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    if(categories.length === 0) {
      request(URL_CATEGORY, MethodsEnum.GET,setCategories)
    }
  },[])

  const handleInsertProduct = async () =>{
    await connectionAPIPost(URL_PRODUCT,product)
    .then(() =>{
      setNotification('Sucesso', 'success', 'Produto inserido com saucesso!')
      navigate(ProductRoutesEnum.PRODUCT)
    })
    .catch((error: Error)=>{
      setNotification(error.message, 'error')
    })
    
  }

  const handleOnClickCancel = () =>{
    navigate(ProductRoutesEnum.PRODUCT)
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string, isNumber?:boolean) =>{
    setProduct({
      ...product,
      [nameObject]: isNumber ? Number(event.target.value) :  event.target.value,
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
      <ProductInsertContainer>
        <LimitedContainer width={400}>
          <Input onChange={(event) => onChange(event, 'name')}  value={product.name} margin='0px 0px 16px 0px' title='Nome' placeholder='Nome'/>
          <Input onChange={(event) => onChange(event, 'image')} value={product.image} margin='0px 0px 16px 0px' title='Url Imagem' placeholder='Url Imagem' />
          <Input onChange={(event) => onChange(event, 'price', true)} value={product.price} margin='0px 0px 16px 0px' title='Preço' placeholder='Preço' />
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
            <DisplayFlexJustifyRight>
              <LimitedContainer margin='0px 8px' width={120}>
                <Button danger onClick={handleOnClickCancel}>Cancelar</Button>
              </LimitedContainer>
              <LimitedContainer width={120}>
                <Button type="primary" onClick={handleInsertProduct}>Inserir produto</Button>
              </LimitedContainer>
            </DisplayFlexJustifyRight>
          </LimitedContainer>

      </ProductInsertContainer>
    </Screen>
}

export default ProductInsert;