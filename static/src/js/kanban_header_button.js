/**@odoo-module**/

import { KanbanController } from "@web/views/kanban/kanban_controller";
import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";

patch(KanbanController.prototype,{
    setup()
    {
        super.setup();
        this.action = useService('action');
    },
   onClick(){
        this.action.doAction({
            type : 'ir.actions.act_window',
            name : 'Inventory',
            view_mode : 'kanban',
            views:[[false,'kanban']],
            target : 'current',
            res_model : 'stock.picking.type',
            domain:[],
            context:{},
        });
    }
})