import { ColumnsType } from "antd/es/table";
import Screen from "../../../shared/components/screen/Screen"
import { UserType } from "../../login/types/UserType";
import { useUser } from "../hooks/useUser";
import { insertMaskInPhone } from "../../../shared/functions/phone";
import { insertMaskInCpf } from "../../../shared/functions/cpf";
import Table from "../../../shared/components/table/Table";
import { DisplayFlexJustifyBetween, DisplayFlexJustifyCenter } from "../../../shared/components/styles/display.styled";
import { Spin } from "antd";
import { Input } from 'antd';
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import Button from "../../../shared/components/Buttons/button/Button";
const { Search } = Input;

const columns: ColumnsType<UserType> = [
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
      render: (text) => <a>{text}</a>,
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Telefone',
        dataIndex: 'phone',
        key: 'phone',
        render: (text) => <a>{insertMaskInPhone(text)}</a>,
    },
    {
        title: 'CPF',
        dataIndex: 'cpf',
        key: 'cpf',
        render: (text) => <a>{insertMaskInCpf(text)}</a>,
    },
  ];
  

const User = () => {
    const { users, loading, hendleOnChangeSearch } = useUser();
    return (
        <Screen
        listBreadcrumb={[
            {
              name:'HOME'
            },
            {
              name:'USUARIOS'
            }
          ]}>
            {loading ? (
                <DisplayFlexJustifyCenter>
                    <Spin size='large'/>
                </DisplayFlexJustifyCenter>
            ) : ( 
               <>
                <DisplayFlexJustifyBetween margin='0px px 16px 0px'>
                    <LimitedContainer width={240}>
                        <Search placeholder='Buscar usuário' onSearch={hendleOnChangeSearch} enterButton />
                    </LimitedContainer>     

                    <LimitedContainer width={240}>
                        <Button type="primary" onClick={() => null}>Inserir</Button>
                    </LimitedContainer>
   
                </DisplayFlexJustifyBetween>
                <Table columns={columns} dataSource={users} /> 
               </> 
            )}
           
          </Screen>
    )
}

export default User