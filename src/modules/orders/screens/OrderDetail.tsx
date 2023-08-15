import { Descriptions, Divider, Spin } from 'antd';

import Screen from '../../../shared/components/screen/Screen';
import { OrderRoutesEnum } from '../routes';
import { useOrderDetail } from '../hooks/useOrderDetail';
import { useParams } from 'react-router-dom';
import { DisplayFlexJustifyCenter } from '../../../shared/components/styles/display.styled';
import ListOrderProduct from '../components/ListOrderProducts';
import ListOrdersProduct from '../components/ListOrderProducts';
import { convertNumberToMoney } from '../../../shared/functions/money';

const OrderDetail = () => {

    const { orderId } = useParams<{orderId: string}>();

    const { order, loading } = useOrderDetail(orderId);

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'PEDIDOS',
          navigateTo: OrderRoutesEnum.ORDER,
        },
        {
          name: 'Detalhes',
        },
      ]}
    >
      {(!order || loading) ? (
        <DisplayFlexJustifyCenter>
          <Spin tip="Loading" size='large' />
        </DisplayFlexJustifyCenter>
      ) : (
        <>
          <Descriptions title="Dados do usuário" bordered>
          <Descriptions.Item label="Nome">{order.user?.name}</Descriptions.Item>
          <Descriptions.Item label="Email" span={2}>
          {order.user?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Telefone">{order.user?.phone}</Descriptions.Item>
          <Descriptions.Item label="CPF" span={2}>
            {order.user?.cpf}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <Descriptions title="Dados do pagamento" bordered>
          <Descriptions.Item label="Preço">{convertNumberToMoney(order.payment?.price || 0)}</Descriptions.Item>
          <Descriptions.Item label="Desconto" span={2}>
          {convertNumberToMoney(order.payment?.discount || 0)}
          </Descriptions.Item>
          <Descriptions.Item label="Preço final">{convertNumberToMoney(order.payment?.finalPrice || 0)}</Descriptions.Item>
          <Descriptions.Item label="Tipo de pagamento" span={2}>
          {order.payment?.type}
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={2}>
          {order.payment?.paymentStatus?.name}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <Descriptions title="Dados do endereço" bordered>
          <Descriptions.Item label="Cidade">{order.address?.city?.name}</Descriptions.Item>
          <Descriptions.Item label="Estado">
          {order.address?.city?.state?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Complemento">{order.address?.complement}</Descriptions.Item>
          <Descriptions.Item label="Numero">
            {order.address?.numberAddress}
          </Descriptions.Item>
          <Descriptions.Item label="CEP" span={2}>
            {order.address?.cep}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        {order.ordersProduct && order.ordersProduct?.length > 0 && (
          <ListOrdersProduct ordersProduct={order.ordersProduct} />
        )}
        
      </>
      )}
      
    </Screen>
  );
};

export default OrderDetail;