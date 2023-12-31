import { ColumnsType } from "antd/es/table";
import Screen from "../../../shared/components/screen/Screen";
import { OrderType } from "../../../shared/types/OrderTypes";
import { useOrder } from "../hooks/useOrder";
import Table from "../../../shared/components/table/Table";
import { useNavigate } from "react-router-dom";
import { OrderRoutesEnum } from "../routes";

const columns: ColumnsType<OrderType> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Data',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Usuario',
      dataIndex: 'user',
      key: 'user',
      render: (_, target) => <a>{target.user?.name}</a>,
    }
    ,
    {
      title: 'Qtde. Produtos',
      dataIndex: 'amountProducts',
      key: 'amountProducts',
      render: (text) => <a>{text}</a>,
    }
  ];

const Order = () =>{
    const { orders } = useOrder();
    const navigate = useNavigate();

    return (
        <Screen
        listBreadcrumb={[
            {
              name:'HOME'
            },
            {
              name:'PEDIDOS'
            }
          ]}>
            <Table 
            onRow={(record) => ({
                  onClick: () => navigate(`${OrderRoutesEnum.ORDER}\${record.id}`),
              })}
            columns={columns} dataSource={orders} /> 
        </Screen>
    )
}

export default Order;