import Tootip from "../../../shared/components/tootip/Tootip";
import { ProductType } from "../../../shared/types/ProductType";
import { ImageProduct } from "../styles/tootipImage.styles";

interface TootipImageProps{
    product: ProductType
}

const TootipImage = ({product}: TootipImageProps) => {
    return (
    <Tootip tootip={<ImageProduct src={product.image} />}>
        <span>{product.id}</span>
    </Tootip>
    )
}

export default TootipImage;