/**@odoo-module**/

import { SectionAndNoteListRenderer } from "@account/components/section_and_note_fields_backend/section_and_note_fields_backend";
import { patch } from "@web/core/utils/patch";

patch(SectionAndNoteListRenderer.prototype,{
    setup()
    {
        super.setup();
    },
   onClickSortColumn(column) {
        const hasNoteOrSection = this.props.list.records.some(record => {
                return record.data.display_type === 'line_section' || record.data.display_type === 'line_note';
            });
        if(this.props.list._config.resModel == 'sale.order.line' && hasNoteOrSection)
        {
            return
        }
        else
        {
            super.onClickSortColumn(column)
        }
    }
})