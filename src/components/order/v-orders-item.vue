<template>
  <div class="v-orders-item">
    <div class="one_order">
      <table class="text">
        <tr class="head">
          <td class="leftcol">Заказ № {{order_data.id}} от {{ order_data.created[2] }}.{{ order_data.created[1] }}.{{ order_data.created[0] }}</td>
          <td class="rightcol"></td>
          <td class="rightcol">Статус {{order_data.orderStatus}}</td>
        </tr>
        <tr class="gray">
          <td class="leftcol">Способ доставки: {{order_data.delivery}}</td>
          <td class="rightcol">Метод оплаты: {{order_data.paymentMethod}}</td>
          <td class="rightcol">Сумма: {{order_data.allPrice}}</td>
        </tr>

        <tr class="gray">
          <td class="leftcol"><b>Состав заказа:</b></td>
          <td class="rightcol"></td>
          <td class="rightcol"></td>
        </tr>

        <tr class="gray">
          <td class="leftcol ml">Название</td>
          <td class="rightcol">Количество</td>
          <td class="rightcol">Цена</td>
        </tr>
      </table>
      <vMyProductItem
          v-for="product in order_data.products"
          :key="product.id"
          v-bind:product_data="product"
      />
    </div>
  </div>
</template>

<script>
import vMyProductItem from "@/components/order/v-my-product-item";

export default {
  name: "v-orders-item",
  components: {
    vMyProductItem
  },
  props: {
    order_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
}
</script>

<style lang="scss">
table.text  {
  width:  909px; /* Ширина таблицы */
  border-spacing: 0; /* Расстояние между ячейками */
}
table.text td {
  width: 30%; /* Ширина ячеек */
  vertical-align: top; /* Выравнивание по верхнему краю */
}

table{
  padding-left: 100px;
}

td.rightcol { /* Правая ячейка */
  text-align: right; /* Выравнивание по правому краю */
}
td.leftcol { /* Правая ячейка */
  text-align: left; /* Выравнивание по правому краю */
}
.one_order {
  margin: 20px;
}
.head {
  background: rgba(112, 248, 134, 0.15);
  background: rgba(255, 158, 46, 0.45);
  background: rgba(240, 102, 102, 0.33);
}
.gray {
  background: $gray
}
</style>