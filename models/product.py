from odoo import fields,models

class ProductProduct(models.Model):
    _inherit = 'product.template'

    qty_limit = fields.Boolean(string="Apply Qty limit")
    max_limit = fields.Integer(string="Max Limit")
    min_limit = fields.Integer(string="Min Limit")
    remove_limit_after = fields.Integer(string="Remove Customer Limit After (Days)")
