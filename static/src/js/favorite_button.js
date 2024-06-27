/**@odoo-module **/
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { Component } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/store/pos_hook";
export class FavoriteButton extends Component {
    static template = "pos_custom.FavoriteButton";
 setup() {
        this.pos = usePos();
    }

 async onClick() {
        this.pos.showScreen("FavoriteProductScreen");
     }
}
ProductScreen.addControlButton({
component: FavoriteButton,
position: ["after", "SetFiscalPositionButton"],
condition: function () {
       return true;
   },
});