/** @odoo-module */
import { AbstractAwaitablePopup } from "@point_of_sale/app/popup/abstract_awaitable_popup";

import { _t } from "@web/core/l10n/translation";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { useRef, onMounted,useState } from "@odoo/owl";

export class MessagePopup extends AbstractAwaitablePopup {
   static template = "pos_custom.MessagePopup";
   static defaultProps = {
       confirmText: _t("Confirm"),
        cancelText: _t("Discard"),
        confirmKey: "Enter",
        title: "This is a title",
        body: "This is a body",
        startingValue: "",
        placeholder: "This is a placeholder",
   };
   setup() {
        super.setup();
//        this.state = useState({ inputValue: this.props.startingValue });
        this.inputRef = useRef("input");
        this.state = useState({
            inputValue: this.props.startingValue,
            isDragging: false,
            offset: { x: 0, y: 0 },
            position: { x: 0, y: 0 },
        });
        this.popupRef = useRef('root');
        onMounted(this.onMounted);
    }
    _onWindowKeyup(event) {
        if (event.key === this.props.confirmKey) {
            this.confirm();
        } else {
            super._onWindowKeyup(...arguments);
        }
    }
    onMounted() {
        this.inputRef.el.focus();
    }
    getPayload() {
        return this.state.inputValue;
    }

     onDragStart(event) {
          this.state.isDragging = true;
        this.state.offset = {
            x: event.clientX - this.state.position.x,
            y: event.clientY - this.state.position.y,
        };
        event.preventDefault();
    }

    onDragEnd(event) {
        this.state.isDragging = false;
        this.updatePopupPosition()
    }
    onDrag(event) {
        if (this.state.isDragging) {
            this.state.position = {
                x: event.clientX - this.state.offset.x,
                y: event.clientY - this.state.offset.y,
            };
            this.updatePopupPosition();
        }
    }
     updatePopupPosition() {
        const popupElement = this.popupRef.el;
        popupElement.style.transform = `translate(${this.state.position.x}px, ${this.state.position.y}px)`;
    }
}