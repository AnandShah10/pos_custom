/**@odoo-module **/
import { _t } from "@web/core/l10n/translation";
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { useService } from "@web/core/utils/hooks";
import { Component } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { CustomButtonPopup } from "./custom_popup";
import {ConfirmationDialog} from "@web/core/confirmation_dialog/confirmation_dialog";
import { CustomDialog } from "./custom_dialog"
export class CustomButton extends Component {
    static template = "pos_custom.CustomButton";
 setup() {
        this.pos = usePos();
        this.popup = useService("popup");
    }

 async onClick() {
//       const order = this.pos.get_order();
       await this.popup.add(CustomButtonPopup, {
           title: _t("Order Details"),
       });
     }

    async showDialog() {
        const dialog = this.env.services.dialog;
        await dialog.add(ConfirmationDialog,{
        title:_t("Dialog"),
        body:_t("Are You sure?"),
        confirm:()=>
        {
            console.log("Confirmed");
        },
        cancel:()=>{
            console.log("Canceled");
        },
    }
    );
    }

    async showCustomDialog() {
        const dialog = this.env.services.dialog;
        await dialog.add(CustomDialog,{
        title:_t("Custom Dialog Box"),
        body:_t("Hello!Welcome to PoS!"),
        confirm:()=>
        {
            this.showDialog()
        },
        cancel:()=>{
            this.onClick()
        },
    }
    );
    }
}
ProductScreen.addControlButton({
component: CustomButton,
position: ["before", "SetFiscalPositionButton"],
condition: function () {
       return true;
   },
});