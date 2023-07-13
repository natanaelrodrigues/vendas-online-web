import { useState } from "react";
import Button from "../../../shared/Buttons/button/Botton";
import Input from "../../../shared/inputs/input/input";
import { BackgroundImage, ContainerLogin, ContainerLoginScreen, LimitedContainer, LogoImage, TitleLogin } from "../styles/loginScreen.styles";

const LoginScreen = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setUsername(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value)
    }

    return (
        <ContainerLoginScreen>
            <BackgroundImage src="./background.png" />
            <ContainerLogin>
            <LimitedContainer>
                <LogoImage src="./logo.png" />
                <TitleLogin level={2} type='secondary'>LOGIN</TitleLogin>
                <Input title='Usuario' margin="32px 0px 0px" onChange={handleUsername} value={username}/>
                <Input type="password" title= 'Senha' margin="32px 0px 0px" onChange={handlePassword} value={password}/>
                <Button type='primary' margin='64px 0px 16px 0px'>ENTRAR</Button>
            </LimitedContainer>
            </ContainerLogin>
        </ContainerLoginScreen>
    )
}

export default LoginScreen;