/** @odoo-module */
import { AbstractAwaitablePopup } from "@point_of_sale/app/popup/abstract_awaitable_popup";

import { _t } from "@web/core/l10n/translation";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { useRef, onMounted } from "@odoo/owl";

export class CustomButtonPopup extends AbstractAwaitablePopup {
   static template = "pos_custom.CustomButtonPopup";
   static defaultProps = {
       closePopup: _t("Cancel"),
       confirmText: _t("Save"),
       title: _t("Customer Details"),
   };
}