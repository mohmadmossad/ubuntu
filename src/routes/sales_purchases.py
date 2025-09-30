from flask import Blueprint, request, jsonify
from src.models.user import db
from src.models.purchases import Purchase, PurchaseItem, PurchaseReturn
from src.models.sales import Sale, SaleItem, SaleReturn
from src.models.inventory import Product, Inventory, InventoryMovement
from src.models.customers_suppliers import Customer, Supplier
from datetime import datetime

sales_purchases_bp = Blueprint('sales_purchases', __name__)

# Purchases endpoints
@sales_purchases_bp.route('/purchases', methods=['GET'])
def get_purchases():
    supplier_id = request.args.get('supplier_id')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    query = Purchase.query
    
    if supplier_id:
        query = query.filter(Purchase.supplier_id == supplier_id)
    
    if start_date:
        query = query.filter(Purchase.purchase_date >= start_date)
    
    if end_date:
        query = query.filter(Purchase.purchase_date <= end_date)
    
    purchases = query.order_by(Purchase.purchase_date.desc()).all()
    return jsonify([purchase.to_dict() for purchase in purchases])

@sales_purchases_bp.route('/purchases', methods=['POST'])
def create_purchase():
    data = request.get_json()
    
    purchase = Purchase(
        supplier_id=data['supplier_id'],
        purchase_date=datetime.fromisoformat(data['purchase_date']),
        total_amount=data['total_amount'],
        discount_amount=data.get('discount_amount', 0),
        tax_amount=data.get('tax_amount', 0),
        payment_type=data['payment_type'],
        payment_status=data.get('payment_status', 'Pending'),
        notes=data.get('notes', ''),
        user_id=data['user_id']
    )
    
    db.session.add(purchase)
    db.session.flush()  # Get the purchase ID
    
    # Add purchase items
    for item_data in data['items']:
        purchase_item = PurchaseItem(
            purchase_id=purchase.id,
            product_id=item_data['product_id'],
            quantity=item_data['quantity'],
            unit_price=item_data['unit_price'],
            total_price=item_data['quantity'] * item_data['unit_price']
        )
        db.session.add(purchase_item)
        
        # Update inventory
        inventory = Inventory.query.filter_by(
            product_id=item_data['product_id'],
            warehouse_id=data.get('warehouse_id', 1)  # Default warehouse
        ).first()
        
        if not inventory:
            inventory = Inventory(
                product_id=item_data['product_id'],
                warehouse_id=data.get('warehouse_id', 1),
                quantity=0
            )
            db.session.add(inventory)
        
        inventory.quantity += item_data['quantity']
        
        # Record inventory movement
        movement = InventoryMovement(
            product_id=item_data['product_id'],
            warehouse_id=data.get('warehouse_id', 1),
            movement_type='In',
            quantity=item_data['quantity'],
            movement_date=datetime.utcnow(),
            reference_type='Purchase',
            reference_id=purchase.id,
            user_id=data['user_id']
        )
        db.session.add(movement)
    
    db.session.commit()
    return jsonify(purchase.to_dict()), 201

@sales_purchases_bp.route('/purchases/<int:purchase_id>', methods=['GET'])
def get_purchase(purchase_id):
    purchase = Purchase.query.get_or_404(purchase_id)
    purchase_data = purchase.to_dict()
    
    # Include items
    items = PurchaseItem.query.filter_by(purchase_id=purchase_id).all()
    purchase_data['items'] = [item.to_dict() for item in items]
    
    return jsonify(purchase_data)

@sales_purchases_bp.route('/purchases/<int:purchase_id>', methods=['PUT'])
def update_purchase(purchase_id):
    purchase = Purchase.query.get_or_404(purchase_id)
    data = request.get_json()
    
    purchase.supplier_id = data.get('supplier_id', purchase.supplier_id)
    purchase.total_amount = data.get('total_amount', purchase.total_amount)
    purchase.discount_amount = data.get('discount_amount', purchase.discount_amount)
    purchase.tax_amount = data.get('tax_amount', purchase.tax_amount)
    purchase.payment_type = data.get('payment_type', purchase.payment_type)
    purchase.payment_status = data.get('payment_status', purchase.payment_status)
    purchase.notes = data.get('notes', purchase.notes)
    
    db.session.commit()
    return jsonify(purchase.to_dict())

# Sales endpoints
@sales_purchases_bp.route('/sales', methods=['GET'])
def get_sales():
    customer_id = request.args.get('customer_id')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    query = Sale.query
    
    if customer_id:
        query = query.filter(Sale.customer_id == customer_id)
    
    if start_date:
        query = query.filter(Sale.sale_date >= start_date)
    
    if end_date:
        query = query.filter(Sale.sale_date <= end_date)
    
    sales = query.order_by(Sale.sale_date.desc()).all()
    return jsonify([sale.to_dict() for sale in sales])

@sales_purchases_bp.route('/sales', methods=['POST'])
def create_sale():
    data = request.get_json()
    
    sale = Sale(
        customer_id=data.get('customer_id'),
        sale_date=datetime.fromisoformat(data['sale_date']),
        total_amount=data['total_amount'],
        discount_amount=data.get('discount_amount', 0),
        tax_amount=data.get('tax_amount', 0),
        payment_type=data['payment_type'],
        payment_status=data.get('payment_status', 'Pending'),
        notes=data.get('notes', ''),
        user_id=data['user_id']
    )
    
    db.session.add(sale)
    db.session.flush()  # Get the sale ID
    
    # Add sale items
    for item_data in data['items']:
        sale_item = SaleItem(
            sale_id=sale.id,
            product_id=item_data['product_id'],
            quantity=item_data['quantity'],
            unit_price=item_data['unit_price'],
            total_price=item_data['quantity'] * item_data['unit_price']
        )
        db.session.add(sale_item)
        
        # Update inventory
        inventory = Inventory.query.filter_by(
            product_id=item_data['product_id'],
            warehouse_id=data.get('warehouse_id', 1)  # Default warehouse
        ).first()
        
        if inventory and inventory.quantity >= item_data['quantity']:
            inventory.quantity -= item_data['quantity']
            
            # Record inventory movement
            movement = InventoryMovement(
                product_id=item_data['product_id'],
                warehouse_id=data.get('warehouse_id', 1),
                movement_type='Out',
                quantity=item_data['quantity'],
                movement_date=datetime.utcnow(),
                reference_type='Sale',
                reference_id=sale.id,
                user_id=data['user_id']
            )
            db.session.add(movement)
        else:
            db.session.rollback()
            return jsonify({'error': f'Insufficient inventory for product {item_data["product_id"]}'}), 400
    
    db.session.commit()
    return jsonify(sale.to_dict()), 201

@sales_purchases_bp.route('/sales/<int:sale_id>', methods=['GET'])
def get_sale(sale_id):
    sale = Sale.query.get_or_404(sale_id)
    sale_data = sale.to_dict()
    
    # Include items
    items = SaleItem.query.filter_by(sale_id=sale_id).all()
    sale_data['items'] = [item.to_dict() for item in items]
    
    return jsonify(sale_data)

@sales_purchases_bp.route('/sales/<int:sale_id>', methods=['PUT'])
def update_sale(sale_id):
    sale = Sale.query.get_or_404(sale_id)
    data = request.get_json()
    
    sale.customer_id = data.get('customer_id', sale.customer_id)
    sale.total_amount = data.get('total_amount', sale.total_amount)
    sale.discount_amount = data.get('discount_amount', sale.discount_amount)
    sale.tax_amount = data.get('tax_amount', sale.tax_amount)
    sale.payment_type = data.get('payment_type', sale.payment_type)
    sale.payment_status = data.get('payment_status', sale.payment_status)
    sale.notes = data.get('notes', sale.notes)
    
    db.session.commit()
    return jsonify(sale.to_dict())

# Purchase Returns endpoints
@sales_purchases_bp.route('/purchase-returns', methods=['GET'])
def get_purchase_returns():
    returns = PurchaseReturn.query.order_by(PurchaseReturn.return_date.desc()).all()
    return jsonify([ret.to_dict() for ret in returns])

@sales_purchases_bp.route('/purchase-returns', methods=['POST'])
def create_purchase_return():
    data = request.get_json()
    
    purchase_return = PurchaseReturn(
        purchase_id=data['purchase_id'],
        return_date=datetime.fromisoformat(data['return_date']),
        total_amount=data['total_amount'],
        reason=data.get('reason', ''),
        user_id=data['user_id']
    )
    
    db.session.add(purchase_return)
    db.session.commit()
    return jsonify(purchase_return.to_dict()), 201

# Sale Returns endpoints
@sales_purchases_bp.route('/sale-returns', methods=['GET'])
def get_sale_returns():
    returns = SaleReturn.query.order_by(SaleReturn.return_date.desc()).all()
    return jsonify([ret.to_dict() for ret in returns])

@sales_purchases_bp.route('/sale-returns', methods=['POST'])
def create_sale_return():
    data = request.get_json()
    
    sale_return = SaleReturn(
        sale_id=data['sale_id'],
        return_date=datetime.fromisoformat(data['return_date']),
        total_amount=data['total_amount'],
        reason=data.get('reason', ''),
        user_id=data['user_id']
    )
    
    db.session.add(sale_return)
    db.session.commit()
    return jsonify(sale_return.to_dict()), 201

# Invoice generation endpoint
@sales_purchases_bp.route('/sales/<int:sale_id>/invoice', methods=['GET'])
def generate_sale_invoice(sale_id):
    sale = Sale.query.get_or_404(sale_id)
    sale_data = sale.to_dict()
    
    # Include items with product details
    items = db.session.query(SaleItem, Product).join(Product).filter(SaleItem.sale_id == sale_id).all()
    sale_data['items'] = []
    
    for sale_item, product in items:
        item_data = sale_item.to_dict()
        item_data['product'] = product.to_dict()
        sale_data['items'].append(item_data)
    
    # Include customer details if available
    if sale.customer_id:
        customer = Customer.query.get(sale.customer_id)
        sale_data['customer'] = customer.to_dict() if customer else None
    
    return jsonify(sale_data)

@sales_purchases_bp.route('/purchases/<int:purchase_id>/invoice', methods=['GET'])
def generate_purchase_invoice(purchase_id):
    purchase = Purchase.query.get_or_404(purchase_id)
    purchase_data = purchase.to_dict()
    
    # Include items with product details
    items = db.session.query(PurchaseItem, Product).join(Product).filter(PurchaseItem.purchase_id == purchase_id).all()
    purchase_data['items'] = []
    
    for purchase_item, product in items:
        item_data = purchase_item.to_dict()
        item_data['product'] = product.to_dict()
        purchase_data['items'].append(item_data)
    
    # Include supplier details
    supplier = Supplier.query.get(purchase.supplier_id)
    purchase_data['supplier'] = supplier.to_dict() if supplier else None
    
    return jsonify(purchase_data)

# Quick search endpoints
@sales_purchases_bp.route('/search/suppliers', methods=['GET'])
def search_suppliers():
    search_term = request.args.get('q', '')
    suppliers = Supplier.query.filter(
        Supplier.name.contains(search_term) | 
        Supplier.phone.contains(search_term)
    ).limit(10).all()
    return jsonify([supplier.to_dict() for supplier in suppliers])

@sales_purchases_bp.route('/search/customers', methods=['GET'])
def search_customers():
    search_term = request.args.get('q', '')
    customers = Customer.query.filter(
        Customer.name.contains(search_term) | 
        Customer.phone.contains(search_term)
    ).limit(10).all()
    return jsonify([customer.to_dict() for customer in customers])

@sales_purchases_bp.route('/search/products', methods=['GET'])
def search_products():
    search_term = request.args.get('q', '')
    products = Product.query.filter(
        Product.name.contains(search_term) | 
        Product.barcode.contains(search_term)
    ).limit(10).all()
    
    result = []
    for product in products:
        product_data = product.to_dict()
        # Include current inventory
        inventory = Inventory.query.filter_by(product_id=product.id).all()
        product_data['inventory'] = [inv.to_dict() for inv in inventory]
        result.append(product_data)
    
    return jsonify(result)

