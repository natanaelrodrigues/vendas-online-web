import Screen from "../../../shared/components/screen/Screen";
import { useOrder } from "../hooks/useOrder";

const Order = () =>{
    const { orders } = useOrder();

    return (
        <Screen>
            <div>Pedidos</div>

        </Screen>
    )
}

export default Order;