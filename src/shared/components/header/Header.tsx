import { logout } from "../../functions/connections/auth";
import { HeaderContainer, LogoExit } from "./header.style";

import { ExclamationCircleOutlined } from "@ant-design/icons"; 
import { Button, Modal, Space } from "antd"; 
import { useState } from "react"; 


const Header = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)

    const showModal = () =>{
        setOpen(true)
    }

    const hideModal = () =>{
        setOpen(false)
    }

    return(
        <>
            <Modal
                title="Atenção"
                open={open}
                onOk={() => logout(navigate)}
                onCancel={hideModal}
                okText="Sim"
                cancelText="Não"
            >
                <p>Tem certeza que deseja sair?</p>
            </Modal>
            <HeaderContainer>
                <LogoExit onClick={showModal} />
            </HeaderContainer>
        </>
    )
}

export default Header;