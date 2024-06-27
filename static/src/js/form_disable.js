/**@odoo-module**/

import { registry } from "@web/core/registry";
import { formView } from "@web/views/form/form_view";
import { FormController } from "@web/views/form/form_controller";
import { useEffect } from "@odoo/owl";

class SaleOrderFormController extends FormController{
    setup()
    {
        super.setup();
//        console.log(this.model.root.data.state);
        useEffect(()=>
        {
        this.disableForm();
        },
        () => [this.model.root.data.state]);
        this.onNotebookPageChange = (notebookId, page) => {
            this.disableForm();
        };
    }
    async beforeLeave()
    {
        if(this.model.root.data.state == "cancel") return;
        super.beforeLeave();
    }
    async beforeUnload(ev)
    {
        if(this.model.root.data.state == "cancel") return;
        super.beforeUnload(ev);
    }
    disableForm()
    {   console.log("In disable");
        const inputElement = document.querySelectorAll(".o_form_sheet input");
        const fieldWidgets = document.querySelectorAll("o_form_sheet .o_field_widget");

        if(this.model.root.data.state == "cancel")
        {
            console.log("Hello",inputElement);
            if(inputElement) inputElement.forEach((e)=>e.setAttribute('disabled',true));
            if(fieldWidgets) fieldWidgets.forEach((e)=>e.classList.add('pe-none'));
            this.canEdit=false;
        }
        else{
            if(inputElement) inputElement.forEach((e)=>e.removeAttribute('disabled'));
            if(fieldWidgets) fieldWidgets.forEach((e)=>e.classList.remove('pe-none'));
            this.canEdit = true;
        }
    }

}
const saleOrderFormView = {
        ...formView,
        Controller : SaleOrderFormController,
    }
registry.category('views').add('sale_order_form_disable_on_cancel',saleOrderFormView);