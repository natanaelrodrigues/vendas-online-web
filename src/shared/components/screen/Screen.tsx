import Breadcrumb, { ListBreadcrumb } from "../breadcrumb/Breadcrumb";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { ScreenContainer } from "./screen.style"
import { Divider } from 'antd'

interface ScreenProps{
    children: React.ReactNode;
    listBreadcrumb?: ListBreadcrumb[];
}

const Screen = ({ children, listBreadcrumb}: ScreenProps) =>{
    return(
        <>
            <Header />
            <ScreenContainer>
                <Menu />
                {listBreadcrumb && (
                    <>
                        <Breadcrumb listBreadcrumb={listBreadcrumb}/>
                        <Divider />
                    </>
                )}
                {children}
            </ScreenContainer>
        </>
    )
}

export default Screen;