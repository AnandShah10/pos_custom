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
        console.log("Done?",this.pos)

        onWillStart(async ()=>{
            console.log(this.pos.favorite_products)
            this.favorite_products = this.pos.favorite_products
        })
    },
    get favoriteProducts()
    {
//        let products = this.pos.db.get_product_by_category(6)
        let products = this.pos.db.product_by_id
        let favorites = []
        this.favorite_products.forEach(p=>favorites.push(products[p]))
        return favorites
    },
    getNumpadButtons() //for numpad
    {
        const old_numpad= super.getNumpadButtons()
        for(let i=0;i<old_numpad.length;i++)
        {
            if(old_numpad[i].value==='Backspace' && this.pos.config.visible_backspace_btn)
            {
                old_numpad.splice(i,1)
            }
        }
        return old_numpad
    }

})
