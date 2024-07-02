from odoo import http

class ProductFavorites(http.Controller):
    @http.route('/get_favorites',type='json',auth='user',csrf=False)
    def get_favorites(self,**data):
        print(data)
        products = http.request.env['product.product'].search(data['domain']).ids
        print(products)
        return products
    @http.route('/mark_favorite',type='json',auth='user',csrf=False)
    def mark_favorite(self,**data):
        tag = http.request.env['product.tag'].search([('name','=','favorites')],limit=1)
        product = http.request.env['product.product'].search([('id','=',data['id'])])
        product.additional_product_tag_ids = [(4,tag.id)]

    @http.route('/mark_not_favorite', type='json', auth='user', csrf=False)
    def mark_not_favorite(self,**data):
        tag = http.request.env['product.tag'].search([('name', '=', 'favorites')], limit=1)
        product = http.request.env['product.product'].search([('id', '=', data['id'])])
        product.additional_product_tag_ids = [(3, tag.id)]