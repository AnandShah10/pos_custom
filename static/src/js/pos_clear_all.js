/**@odoo-module **/
import { _t } from "@web/core/l10n/translation";
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { useService } from "@web/core/utils/hooks";
import { Component } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { ConfirmPopup } from "@point_of_sale/app/utils/confirm_popup/confirm_popup";

export class ClearButton extends Component {
 static template = "pos_custom.ClearButton";
 setup() {
        this.pos = usePos();
        this.popup= useService('popup')
    }

 async onClick() {
       const { confirmed }= await this.popup.add(ConfirmPopup,{
                title:_t('Confirm Popup'),
                body:_t('Are You sure you want to continue?'),
                confirmText: _t("Yes"),
                cancelText:_t('No'),
            });
            if(confirmed)
            {
            let currentOrder = this.pos.get_order();
            currentOrder.orderlines.filter(line=>line.get_product()).forEach(single_line=>currentOrder.removeOrderline(single_line));
            }
      }

}
ProductScreen.addControlButton({
component: ClearButton,
condition: function () {
       return true;
   },
});