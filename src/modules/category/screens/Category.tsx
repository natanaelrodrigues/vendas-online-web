import { ColumnsType } from "antd/es/table";
import Screen from "../../../shared/components/screen/Screen";
import Table from "../../../shared/components/table/Table";
import { CategoryType } from "../../../shared/types/CategoryTypes";
import { useCategory } from "../hooks/useCategory";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { Input, Modal } from "antd";
import Button from "../../../shared/components/Buttons/button/Button";
import { DisplayFlex, DisplayFlexJustifyBetween } from "../../../shared/components/styles/display.styled";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Search } = Input;

const Category = () =>{
    const { categories, openModalDelete,  handleOnChangeSearch, handleOnClickCategory ,handleOpenModalDelete,  handleCloseModalDelete, handleConfirmDeleteCategory} = useCategory(); 
    


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
      ,
      {
        title: 'Ações',
        dataIndex: '',
        width: 240,
        key: 'x',
        render: (_, category) => (
        <LimitedContainer width={180}>
          <DisplayFlex>
            <LimitedContainer margin='0px 16px 0px 0px' width={90}>
              <Button onClick={() => {}} icon={<EditOutlined />}>Editar</Button>
            </LimitedContainer>
            {category.amountProducts <= 0 && (<Button danger onClick={() => handleOpenModalDelete(category.id)} icon={<DeleteOutlined />}>Remover</Button>) }
            
          </DisplayFlex>
        </LimitedContainer>
        )
      }
    ];

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
             <Modal 
                  title="Atenção"
                  open={openModalDelete}
                  onOk={handleConfirmDeleteCategory}
                  onCancel={handleCloseModalDelete}
                  okText="Sim"
                  cancelText="Não"
              >
                  <p>Tem certeza que deseja excluir esta categoria?</p>
            </Modal>
            <DisplayFlexJustifyBetween  margin='0px px 16px 0px'>
                <LimitedContainer width={240}>
                <Search placeholder='Buscar categoria' onSearch={handleOnChangeSearch} enterButton />
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