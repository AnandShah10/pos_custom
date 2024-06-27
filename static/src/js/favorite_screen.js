/*@odoo-module*/
import { ControlButtonsMixin } from "@point_of_sale/app/utils/control_buttons_mixin";
import { registry } from "@web/core/registry";
import { Component, onMounted, useExternalListener, useState,onWillStart } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { Numpad } from "@point_of_sale/app/generic_components/numpad/numpad";
import { _t } from "@web/core/l10n/translation";
import { ActionpadWidget } from "@point_of_sale/app/screens/product_screen/action_pad/action_pad";
import { MessagePopupButton } from "./message_popup_button"
class FavoriteProductScreen extends ControlButtonsMixin(Component){
    static template = 'FavoriteProductScreen'
    static components = {
        Numpad,ActionpadWidget,MessagePopupButton
    }
    setup()
    {
        super.setup()
        this.pos = usePos();
        this.state = useState({
            activeProduct:{},
            isFavorite:true,
            favorite_products : [],
            products:[],
        })
        onWillStart(async ()=>{
            this.state.favorite_products = this.pos.favorite_products,
            this.getProducts()
        })
    }
    getProducts()
    {
        let products = this.pos.db.product_by_id
        console.log(products)
        let product_list=[]
        if(this.state.isFavorite && this.state.favorite_products)
        {
            this.state.favorite_products.forEach(p=>product_list.push(products[p]))
        }
        else{
            Object.entries(products).forEach(p=>product_list.push(p[1]))
        }
        this.state.isFavorite=!this.state.isFavorite
        this.state.products = product_list
    }
    setActiveProduct(product)
    {
        this.state.activeProduct = product
    }
     getNumpadButtons() {
        return [
            { value: "1" },
            { value: "2" },
            { value: "3" },
            { value: "quantity", text: _t("Qty") },
            { value: "4" },
            { value: "5" },
            { value: "6" },
            { value: "discount", text: _t("% Disc"), disabled: !this.pos.config.manual_discount },
            { value: "7" },
            { value: "8" },
            { value: "9" },
            { value: "price", text: _t("Price"), disabled: !this.pos.cashierHasPriceControlRights() },
            { value: "-", text: "+/-" },
            { value: "0" },
            { value: this.env.services.localization.decimalPoint },
            // Unicode: https://www.compart.com/en/unicode/U+232B
            { value: "Backspace", text: "⌫" },
        ].map((button) => ({
            ...button,
            class: this.pos.numpadMode === button.value ? "active border-primary" : "",
        }));
    }

}
registry.category("pos_screens").add("FavoriteProductScreen", FavoriteProductScreen);
