<template>
  <div class="v-my-product-item">
    <table class="text">
        <tr class="gray">
          <td class="leftcol tt">{{ product_data.productResponseDto.name }}</td>
          <td class="rightcol">{{ product_data.quantity }}</td>
          <td class="rightcol">{{ allPrice }}</td>
        </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "v-my-product-item",

  data() {
    return {
    }
  },
  props: {
    product_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed:{
    allPrice() {
      return this.product_data.productResponseDto.price * this.product_data.quantity
    },
  }
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
.tt{
  padding-left: 25px;
}

td.rightcol { /* Правая ячейка */
  text-align: right; /* Выравнивание по правому краю */
}
td.leftcol { /* Правая ячейка */
  text-align: left; /* Выравнивание по правому краю */
}

</style>