# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
{
    'name': 'pos_custom',
    'version': '1.0',
    'summary': "PoS custom module",
    'sequence': 15,
    'author': "anand",
    'description': """
PoS Custom module
""",
    'category': 'Custom/Pos',
    'depends': ['point_of_sale','base','web','web_editor','sale','account'],
    'data': ['views/form_disable.xml'],
    'installable': True,
    'application': False,
    'license': 'LGPL-3',
    'assets':{
        'point_of_sale._assets_pos': [
            'pos_custom/static/src/scss/favorite_screen.scss',
            'pos_custom/static/src/scss/favorite_product.scss',
            'pos_custom/static/src/js/custom_popup.js',
            'pos_custom/static/src/js/custom_button.js',
            'pos_custom/static/src/js/pos_clear_all.js',
            'pos_custom/static/src/xml/popup_custom.xml',
            'pos_custom/static/src/xml/pos_custom.xml',
            'pos_custom/static/src/xml/pos_clear_all.xml',
            'pos_custom/static/src/xml/favorite_screen.xml',
            'pos_custom/static/src/js/favorite_screen.js',
            'pos_custom/static/src/js/favorite_button.js',
            'pos_custom/static/src/xml/favorite_button.xml',
            'pos_custom/static/src/js/message_popup_button.js',
            'pos_custom/static/src/xml/message_popup_button.xml',
            'pos_custom/static/src/js/message_popup.js',
            'pos_custom/static/src/xml/message_popup.xml',
            'pos_custom/static/src/js/custom_dialog.js',
            'pos_custom/static/src/xml/custom_dialog.xml',
            'pos_custom/static/src/xml/favorite_products.xml',
            'pos_custom/static/src/js/favorite_products.js',
        ],
        'web.assets_backend':['pos_custom/static/src/js/form_disable.js',
                              'pos_custom/static/src/js/kanban_header_button.js',
                              'pos_custom/static/src/xml/kanban_header_button.xml',
                              'pos_custom/static/src/js/list_sort_freeze.js',
                              ],
    }
}
