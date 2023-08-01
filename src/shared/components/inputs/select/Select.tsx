import { Select as SelectAntd, SelectProps as SelectPropsAntd } from 'antd'
import { BoxSelect, TitleSelect } from './select.styles';

interface SelectProps extends SelectPropsAntd {
    title?: string;
    margin?: string;
}

const Select = ({title, margin, ...props}:  SelectProps) => {
    return (
        <BoxSelect style={{margin}}>
            {title && (
                <TitleSelect>
                    {title}
                </TitleSelect >
            )}  
            <SelectAntd {...props}/>
        </BoxSelect>
    );
}

export default Select;