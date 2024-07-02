/*@odoo-module*/
import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/store/pos_store";

patch(PosStore.prototype,{
        async _processData(loadedData) {
        await super._processData(...arguments);
        this.favorite_products = await this.getFavoriteProducts()
        this.popupMessage = ''
    },
    async getFavoriteProducts()
    {
            const data = await this.env.services.rpc("/get_favorites",{
                domain: [['available_in_pos','=',true],['additional_product_tag_ids.name','=','favorites']]
            })
            console.log(data)
            return data
    },
    async setFavoriteProducts()
    {
        this.favorite_products = await this.getFavoriteProducts()
    }
})