import { DataSource } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';

import { CreateProducts1649336396354 } from './migrations/1649336396354-CreateProducts';
import { CreateUsers1649680378449 } from './migrations/1649680378449-CreateUsers';
import { CreateUserTokens1649792175468 } from './migrations/1649792175468-CreateUserTokens';
import { CreateCustomers1652209795184 } from './migrations/1652209795184-CreateCustomers';
import { CreateOrders1652294233699 } from './migrations/1652294233699-CreateOrders';
import { AddCustomerIdToOrders1652294572603 } from './migrations/1652294572603-AddCustomerIdToOrders';
import { CreateOrdersProducts1652295404709 } from './migrations/1652295404709-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1652295820563 } from './migrations/1652295820563-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1652296245354 } from './migrations/1652296245354-AddProductIdToOrdersProducts';
// import { AddOrderFieldtoOrders1619889809717 } from './migrations/1619889809717-AddOrderFieldtoOrders';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 12345,
  username: 'postgres',
  password: 'Jxg1WQYr0ltwMNaK',
  database: 'sales',
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1649336396354,
    CreateUsers1649680378449,
    CreateUserTokens1649792175468,
    CreateCustomers1652209795184,
    CreateOrders1652294233699,
    AddCustomerIdToOrders1652294572603,
    CreateOrdersProducts1652295404709,
    AddOrderIdToOrdersProducts1652295820563,
    AddProductIdToOrdersProducts1652296245354,
    // AddOrderFieldtoOrders1619889809717,
  ],
});
