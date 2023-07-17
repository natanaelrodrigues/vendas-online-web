import { useState } from "react";
import axios from 'axios'
import Button from "../../../shared/Buttons/button/Botton";
import Input from "../../../shared/inputs/input/input";
import { BackgroundImage, ContainerLogin, ContainerLoginScreen, LimitedContainer, LogoImage, TitleLogin } from "../styles/loginScreen.styles";
import SVGLogo from "../../../shared/icons/SVGLogo";

const LoginScreen = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setUsername(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value)
    }

    const handleSubmit = async () => {
         await axios({
                method: "post",
                url: 'http://localhost:8080/auth',
                data: {
                    email: username,
                    password
                }
             }).then((result) =>{
                alert('Fez o login')
                console.log('lofin', result.data)             
                return result.data
                
             })
             .catch((error) => {
                alert('Usuario ou senha inválido')
             })
    }

    return (
        <ContainerLoginScreen>
            <BackgroundImage src="./background.png" />
            <ContainerLogin>
            <LimitedContainer>
                <SVGLogo />
                <TitleLogin level={2} type='secondary'>LOGIN</TitleLogin>
                <Input title='Usuario' margin="32px 0px 0px" onChange={handleUsername} value={username}/>
                <Input type="password" title= 'Senha' margin="32px 0px 0px" onChange={handlePassword} value={password}/>
                <Button type='primary' margin='64px 0px 16px 0px' onClick={handleSubmit}>ENTRAR</Button>
            </LimitedContainer>
            </ContainerLogin>
        </ContainerLoginScreen>
    )
}

export default LoginScreen;