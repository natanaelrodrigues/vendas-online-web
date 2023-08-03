import { useEffect } from "react";
import Screen from "../../../shared/components/screen/Screen";
import { ProductRoutesEnum } from "../routes";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequests";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { URL_CATEGORY } from "../../../shared/constants/urls";
import { ProductInsertContainer } from "../styles/productInsert.style";
import Input from "../../../shared/components/inputs/input/input";
import Button from "../../../shared/components/Buttons/button/Button";
import Select from "../../../shared/components/inputs/select/Select";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { DisplayFlexJustifyRight } from "../../../shared/components/styles/display.styled";
import { useNavigate } from "react-router-dom";
import InputMoney from "../../../shared/components/inputs/inputMondy/InputMoney";
import { useInsertProduct } from "../hooks/useInsertProduct";



const ProductInsert = () =>{
  const { product, loading, disableButton, onChangeInput, handleChangeSelect, handleInsertProduct } = useInsertProduct();
  const { categories, setCategories  } = useDataContext();
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    if(categories.length === 0) {
      request(URL_CATEGORY, MethodsEnum.GET,setCategories)
    }
  },[])

  const handleOnClickCancel = () =>{
    navigate(ProductRoutesEnum.PRODUCT)
  }

 

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
          <Input onChange={(event) => onChangeInput(event, 'name')}  value={product.name} margin='0px 0px 16px 0px' title='Nome' placeholder='Nome'/>
          <Input onChange={(event) => onChangeInput(event, 'image')} value={product.image} margin='0px 0px 16px 0px' title='Url Imagem' placeholder='Url Imagem' />
          <InputMoney onChange={(event) => onChangeInput(event, 'price', true)} value={product.price} margin='0px 0px 16px 0px' title='Preço' placeholder='Preço' />
          <Select
            title='Categoria'
            margin='0px 0px 32px 0px'
            style={{  width: '100%' }}
            onChange={handleChangeSelect}
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
                <Button loading={loading} disabled={disableButton} type="primary" onClick={handleInsertProduct}>Inserir produto</Button>
              </LimitedContainer>
            </DisplayFlexJustifyRight>
          </LimitedContainer>

      </ProductInsertContainer>
    </Screen>
}

export default ProductInsert;