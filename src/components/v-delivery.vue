<template>
  <div class="v-delivery">
    <div class="div1">
      <p class="subheader2 location">Томск, Северск</p>
      <p class="subheader3 deliv_cash">Доставка</p>
      <p class="text">Бесплатно при заказе свыше 2000 руб. Стоимость доставки при заказе менее 2000 руб. составит 150 руб. Доставка в отдаленные районы города дополнительно 150 руб.</p>
      <p class="subheader3 deliv_cash">Оплата</p>
      <p class="text">Оплата за товар при доставке курьером по Томску и Северску производится наличными, либо по картам VISA, Mastercard, при получении заказа.</p>
    </div>
    <div class="div2">
      <p class="subheader2 location">Межгород</p>
      <p class="subheader3 deliv_cash">Доставка</p>
      <p class="text">Отправка заказов в другие города осуществляется только после оплаты. Товар резервируется, при отсутствии оплаты в течении 3-х дней, заказ отменяется. Наложенным платежем не отправляем.</p>
      <p class="subheader3 deliv_cash">Оплата</p>
      <p class="text">Для оплаты междугородних заказов вам необходимо произвести 100% предоплату стоимости товаров + стоимость доставки (рассчитывается при оформлении заказа). Для этого вы можете использовать следующие способы: VISA, Mastercard</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-delivery"
}
</script>

<style scoped lang="scss">
.v-delivery{
  text-align: left;
}
.deliv_cash{
  margin-bottom: 0;
}
.location{
  color: $red-bg-hover;
  margin-top: 0;
}
.div1{
  width: 35%;
  min-height: 150px;
  margin-left: 70px;
  float: left;
}
.div2{
  width: 38%;
  min-height: 150px;
  margin-left: 62%;
}
p{
  margin-top: 5px;
}
</style>