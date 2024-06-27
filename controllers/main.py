from odoo import http

class ProductFavorites(http.Controller):
    @http.route('/get_favorites',type='json',auth='user',csrf=False)
    def get_favorites(self,**data):
        print(data)
        products = http.request.env['product.product'].search(data['domain']).ids
        print(products)
        return products