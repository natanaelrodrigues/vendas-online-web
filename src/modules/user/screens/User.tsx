import { useMemo } from "react";
import { ColumnsType } from "antd/es/table";
import Screen from "../../../shared/components/screen/Screen"
import { UserType } from "../../login/types/UserType";
import { useUser } from "../hooks/useUser";
import { insertMaskInPhone } from "../../../shared/functions/phone";
import { insertMaskInCpf } from "../../../shared/functions/cpf";
import Table from "../../../shared/components/table/Table";
import { DisplayFlexJustifyBetween, DisplayFlexJustifyCenter } from "../../../shared/components/styles/display.styled";
import { Input } from 'antd';
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import Button from "../../../shared/components/Buttons/button/Button";
import { getUserInfoByToken } from "../../../shared/functions/connections/auth";
import { UserTypeEnum } from "../../../shared/enums/userType.enum";
import { useNavigate } from "react-router-dom";
import { UserRoutesEnum } from "../routes";
import Loading from "../../../shared/components/loading/Loading";
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
    const navigate = useNavigate();

    const userToken = useMemo(() =>{
      return getUserInfoByToken();
    },[])

    const handleGoToInsertAdmin = () =>{
      navigate(UserRoutesEnum.USER_INSERT)
    }

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
                    <Loading size='large'/>
                </DisplayFlexJustifyCenter>
            ) : ( 
               <>
                <DisplayFlexJustifyBetween margin='0px px 16px 0px'>
                    <LimitedContainer width={240}>
                        <Search placeholder='Buscar usuário' onSearch={hendleOnChangeSearch} enterButton />
                    </LimitedContainer>     

                    <LimitedContainer width={180}>
                      {userToken?.typeUser === UserTypeEnum.Root &&
                        <Button type="primary" onClick={handleGoToInsertAdmin}>Inserir Administrador</Button>
                      }
                      
                    </LimitedContainer>
   
                </DisplayFlexJustifyBetween>
                <Table columns={columns} dataSource={users} /> 
               </> 
            )}
           
          </Screen>
    )
}

export default User