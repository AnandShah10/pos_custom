/**@odoo-module **/
import { _t } from "@web/core/l10n/translation";
import { useService } from "@web/core/utils/hooks";
import { Component } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { MessagePopup } from "./message_popup";
export class MessagePopupButton extends Component {
    static template = "pos_custom.MessagePopupButton";
 setup() {
        this.pos = usePos();
        console.log(this.pos)
        this.popup = useService("popup");
    }

 async ShowMessagePopup() {
        const {confirm,payload}= await this.popup.add(MessagePopup,{
            title:_t("This is a message Popup"),
            body:_t("Hello!"),
            placeholder:_t('Enter Your Name'),
        })
        if(confirm)
        {
            this.pos.popupMessage=payload;
        }
     }

}
