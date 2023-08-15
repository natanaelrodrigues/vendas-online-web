import { ColumnsType } from "antd/es/table";
import { OrdersProductType } from "../../../shared/types/OrdersProductType";
import Table from "../../../shared/components/table/Table";
import { convertNumberToMoney } from "../../../shared/functions/money";

interface ListOrdersProductProps {
    ordersProduct?: OrdersProductType[];
}

const columns: ColumnsType<OrdersProductType> = [
    {
      title: 'Nome Produto',
      dataIndex: 'name',
      key: 'name',
      render: (_, target) => <a>{target.product?.name}</a>,
    },
    {
      title: 'Quantidade',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <a>{text}</a>,
    },
    {
        title: 'Preço',
        dataIndex: 'price',
        key: 'price',
        render: (text) => <a>{convertNumberToMoney(text)}</a>,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (_, target) => <a>{convertNumberToMoney(target.price * target.amount)}</a>,
    }
  ];

const ListOrdersProduct = ({ordersProduct}: ListOrdersProductProps) => {
    if( !ordersProduct || ordersProduct.length <= 0){
        return null
    }
    return (
        <Table 
        columns={columns} dataSource={ordersProduct} /> 
    )

}

export default ListOrdersProduct;