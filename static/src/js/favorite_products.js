/*@odoo-module*/

import { usePos } from "@point_of_sale/app/store/pos_hook";
import { Component, onMounted, useExternalListener, useState } from "@odoo/owl";
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { patch } from "@web/core/utils/patch";

patch(ProductScreen.prototype,{
    setup()
    {
        super.setup()
        console.log("Done?",this.pos.db)
    },
    get favoriteProducts()
    {
        let products = this.pos.db.get_product_by_category(6)
        return products
    }
})