/*@odoo-module*/

import { usePos } from "@point_of_sale/app/store/pos_hook";
import { Component, onMounted, onWillStart, useState } from "@odoo/owl";
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { patch } from "@web/core/utils/patch";
import { jsonrpc } from "@web/core/network/rpc_service";
patch(ProductScreen.prototype,{
    setup()
    {
        super.setup()
        console.log("Done?",this.pos.db)

        onWillStart(async ()=>{
            const data = await jsonrpc("/get_favorites",{
                domain: [['available_in_pos','=',true],['additional_product_tag_ids.name','=','favorites']]
            })
            console.log(data)
            this.favorite_products = data
        })
    },
    get favoriteProducts()
    {
//        let products = this.pos.db.get_product_by_category(6)
        let products = this.pos.db.product_by_id
        let favorites = []
        this.favorite_products.forEach(p=>favorites.push(products[p]))
        return favorites
    }
})