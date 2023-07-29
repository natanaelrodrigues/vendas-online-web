import { ContainerExternal, ContainerTootip } from "./tootip.style"
import { Tooltip as TootipAntD } from "antd";

interface TootipProps{
    children: React.ReactNode,
    tootip?: React.ReactNode,
    title?: string;
}
const Tootip = ({children, tootip, title}: TootipProps )=>{

    if(title){
        <TootipAntD title={title}>
            {children}
        </TootipAntD>
    }

    return (
        <ContainerTootip>
            <ContainerExternal>
                {tootip}
            </ContainerExternal>
            {children}            
        </ContainerTootip>
    )
}

export default Tootip