import Screen from "../../../shared/components/screen/Screen";
import { ProductRoutesEnum } from "../routes";
import Input from "../../../shared/components/inputs/input/input";
import Button from "../../../shared/components/Buttons/button/Button";
import Select from "../../../shared/components/inputs/select/Select";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { DisplayFlex, DisplayFlexJustifyCenter, DisplayFlexJustifyRight } from "../../../shared/components/styles/display.styled";
import InputMoney from "../../../shared/components/inputs/inputMondy/InputMoney";
import { useInsertProduct } from "../hooks/useInsertProduct";
import { useCategory } from "../../category/hooks/useCategory";
import { useParams } from "react-router-dom";



const ProductInsert = () =>{
  const { productId } = useParams<{productId: string}>();
  const { product, isEdit,loading, loadingRequest,  disableButton, onChangeInput, handleChangeSelect, handleInsertProduct, handleOnClickCancel } = useInsertProduct(productId);
  const { categories } = useCategory();
  
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
      {loadingRequest ? (
        <div>carregando</div>
      ):(
        <DisplayFlexJustifyCenter>
        <LimitedContainer width={400}>
          <Input onChange={(event) => onChangeInput(event, 'name')}  value={product.name} margin='0px 0px 16px 0px' title='Nome' placeholder='Nome'/>
          <Input onChange={(event) => onChangeInput(event, 'image')} value={product.image} margin='0px 0px 16px 0px' title='Url Imagem' placeholder='Url Imagem' />
          <InputMoney onChange={(event) => onChangeInput(event, 'price', true)} value={product.price} margin='0px 0px 16px 0px' title='Preço' placeholder='Preço' />
          <Select
            title='Categoria'
            margin='0px 0px 16px 0px'
            style={{  width: '100%' }}
            onChange={handleChangeSelect}
            defaultValue={`${product.categoryId || ''}`}
            options={
              categories.map((category) => ({
                value: `${category.id}`,
                label: `${category.name}`,
              }))
            }
          />
          <DisplayFlex>
            <InputMoney addonBefore="kg" onChange={(event) => onChangeInput(event, 'weight', true)} value={product.weight} margin='0px 16px 16px 0px' title='Peso' placeholder='Peso' />
            <InputMoney addonBefore="cm" onChange={(event) => onChangeInput(event, 'length', true)} value={product.length} margin='0px 0px 16px 0px' title='Comprimento' placeholder='Comprimento' />
          </DisplayFlex>
          <DisplayFlex>
            <InputMoney addonBefore="cm"  onChange={(event) => onChangeInput(event, 'heigth', true)} value={product.height} margin='0px 16px 16px 0px' title='Altura' placeholder='Altura' />
            <InputMoney addonBefore="cm"  onChange={(event) => onChangeInput(event, 'width', true)} value={product.width} margin='0px 0px 16px 0px' title='Largura' placeholder='Largura' />
          </DisplayFlex>
          <InputMoney addonBefore="cm"  onChange={(event) => onChangeInput(event, 'diameter', true)} value={product.diameter} margin='0px 0px 32px 0px' title='Diâmetro' placeholder='Diâmetro' />
          <DisplayFlexJustifyRight>
              <LimitedContainer margin='0px 8px' width={120}>
                <Button danger onClick={handleOnClickCancel}>Cancelar</Button>
              </LimitedContainer>
              <LimitedContainer width={120}>
                <Button loading={loading} disabled={disableButton} type="primary" onClick={handleInsertProduct}>{isEdit? 'Salvar' : 'Inserir produto'}</Button>
              </LimitedContainer>
            </DisplayFlexJustifyRight>
          </LimitedContainer>

        </DisplayFlexJustifyCenter>
      )}

    </Screen>
}

export default ProductInsert;