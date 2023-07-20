import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import Button from "../../../shared/components/Buttons/button/Button";
import { ContainerPageNotFound } from '../styles/pageNotFound.styles';
import { loginRoutesEnum } from '../../login/routes';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleOnClickButton = () => {
    navigate(loginRoutesEnum.LOGIN);
  };
  return (
    <ContainerPageNotFound>
      <Result
        status="404"
        title="404"
        subTitle="Desculpe, a página que você está visitando não existe."
        extra={
          <Button onClick={handleOnClickButton} type="primary">
            Página de Login
          </Button>
        }
      />
    </ContainerPageNotFound>
  );
};

export default PageNotFound;