import { useState } from "react";
import Button from "../../../shared/components/Buttons/button/Button";
import Input from "../../../shared/components/inputs/input/input";
import { BackgroundImage, ContainerLogin, ContainerLoginScreen, LimitedContainer, LogoImage, TitleLogin } from "../styles/loginScreen.styles";
import SVGLogo from "../../../shared/components/icons/SVGLogo";
import { useRequests } from "../../../shared/hooks/useRequests";



const LoginScreen = () => {
    const { navigate } = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { authRequest, loading } = useRequests()

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setUsername(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value)
    }

    const handleSubmit = () => {
        authRequest({
            navigate,
            email: username,
            password
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
                <Button loading={loading} type='primary' margin='64px 0px 16px 0px' onClick={handleSubmit}>ENTRAR</Button>
            </LimitedContainer>
            </ContainerLogin>
        </ContainerLoginScreen>
    )
}

export default LoginScreen;