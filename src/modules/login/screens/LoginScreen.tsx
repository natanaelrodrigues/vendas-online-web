import Button from "../../../shared/Buttons/button/Botton";
import Input from "../../../shared/inputs/input/input";
import { BackgroundImage, ContainerLogin, ContainerLoginScreen, LimitedContainer, LogoImage, TitleLogin } from "../styles/loginScreen.styles";

const LoginScreen = () => {
    return (
        <ContainerLoginScreen>
            <BackgroundImage src="./background.png" />
            <ContainerLogin>
            <LimitedContainer>
                <LogoImage src="./logo.png" />
                <TitleLogin level={2} type='secondary'>LOGIN</TitleLogin>
                <Input title='Usuario'/>
                <Input title= 'Senha'/>
                <Button type='primary' margin='64px 0px 16px 0px'>ENTRAR</Button>
            </LimitedContainer>
            </ContainerLogin>
        </ContainerLoginScreen>
    )
}

export default LoginScreen;