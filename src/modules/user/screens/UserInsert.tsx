import Button from "../../../shared/components/Buttons/button/Button";
import Input from "../../../shared/components/inputs/input/input";
import Screen from "../../../shared/components/screen/Screen";
import { DisplayFlexJustifyCenter, DisplayFlexJustifyRight } from "../../../shared/components/styles/display.styled";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { useUserInsert } from "../hooks/useUserInsert";
import { UserRoutesEnum } from "../routes";

const UserInsert = () => {
    const {user,
        disabledButton,
        loading,
        handleCancelInsert,
        handleInsertAdmin,
        handleOnChangeInput} = useUserInsert();
    return (
        <Screen listBreadcrumb={[
            {
                name:'HOME'
              },
              {
                name:'USUARIOS',
                navigateTo: UserRoutesEnum.USER
              },
              {
                name:'INSERIR'
              }
        ]}>
            <DisplayFlexJustifyCenter>
                <LimitedContainer width={400}>
                <Input value={user.name} onChange={(event) => handleOnChangeInput(event,'name')} margin='0px 0px 16px 0px' title='Nome' placeholder='Nome'/>
                <Input value={user.phone} onChange={(event) => handleOnChangeInput(event,'phone')} margin='0px 0px 16px 0px' title='Telefone' placeholder='Telefone'/>
                <Input value={user.email} onChange={(event) => handleOnChangeInput(event,'email')} margin='0px 0px 16px 0px' title='Email' placeholder='Email'/>
                <Input value={user.cpf} onChange={(event) => handleOnChangeInput(event,'cpf')} margin='0px 0px 16px 0px' title='Cpf' placeholder='Cpf'/>
                <Input value={user.password} onChange={(event) => handleOnChangeInput(event,'password')}  margin='0px 0px 16px 0px' title='Senha' placeholder='Senha'/>
                <DisplayFlexJustifyRight>
                    <LimitedContainer margin='0px 8px' width={120}>
                        <Button danger onClick={handleCancelInsert} >Cancelar</Button>
                    </LimitedContainer>
                    <LimitedContainer width={120}>
                        <Button  onClick={handleInsertAdmin} loading={loading} disabled={disabledButton} type="primary" >Inserir Admin</Button>
                    </LimitedContainer>
                </DisplayFlexJustifyRight>
                </LimitedContainer>
            </DisplayFlexJustifyCenter>
        </Screen>
    )
}

export default UserInsert;