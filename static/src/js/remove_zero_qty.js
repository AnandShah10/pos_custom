/**@odoo-module **/
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { patch } from "@web/core/utils/patch";
import { Order,Orderline } from "@point_of_sale/app/store/models";
import { ErrorPopup } from "@point_of_sale/app/errors/popups/error_popup";
import { _t } from "@web/core/l10n/translation";
import { ActionpadWidget } from "@point_of_sale/app/screens/product_screen/action_pad/action_pad";

patch(Orderline.prototype,{
      set_quantity(quantity, keep_price) {
        const res = super.set_quantity(quantity,keep_price)
        console.log("Response :=>>>>",res,quantity)
        if (quantity <= 0) {
            this.env.services.popup.add(ErrorPopup, { title:_t('Invalid Quantity'),
             body: _t('Quantity must be greater than zero.') });
            return false;
        }
    },
})

patch(Order.prototype,{
    async pay()
    {
     const hasEmptyLine = this.orderlines.some(line=> {return line.get_quantity()==0})
     console.log("Hello why ????????????????????",hasEmptyLine)
     if(hasEmptyLine)
     {
         this.env.services.popup.add(ErrorPopup, { title:_t('Invalid Quantity'),
             body: _t('Quantity must be greater than zero.') });
            return false;
     }
     super.pay(...arguments)
    }
})
