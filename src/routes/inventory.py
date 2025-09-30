from flask import Blueprint, request, jsonify
from src.models.user import db, Warehouse, Category, Unit, Product, Inventory, InventoryMovement
from datetime import datetime

inventory_bp = Blueprint('inventory', __name__)

# Warehouses endpoints
@inventory_bp.route('/warehouses', methods=['GET'])
def get_warehouses():
    warehouses = Warehouse.query.all()
    return jsonify([warehouse.to_dict() for warehouse in warehouses])

@inventory_bp.route('/warehouses', methods=['POST'])
def create_warehouse():
    data = request.get_json()
    warehouse = Warehouse(
        name=data['name'],
        location=data.get('location', '')
    )
    db.session.add(warehouse)
    db.session.commit()
    return jsonify(warehouse.to_dict()), 201

@inventory_bp.route('/warehouses/<int:warehouse_id>', methods=['PUT'])
def update_warehouse(warehouse_id):
    warehouse = Warehouse.query.get_or_404(warehouse_id)
    data = request.get_json()
    warehouse.name = data.get('name', warehouse.name)
    warehouse.location = data.get('location', warehouse.location)
    db.session.commit()
    return jsonify(warehouse.to_dict())

@inventory_bp.route('/warehouses/<int:warehouse_id>', methods=['DELETE'])
def delete_warehouse(warehouse_id):
    warehouse = Warehouse.query.get_or_404(warehouse_id)
    db.session.delete(warehouse)
    db.session.commit()
    return '', 204

# Categories endpoints
@inventory_bp.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories])

@inventory_bp.route('/categories', methods=['POST'])
def create_category():
    data = request.get_json()
    category = Category(
        name=data['name'],
        parent_id=data.get('parent_id')
    )
    db.session.add(category)
    db.session.commit()
    return jsonify(category.to_dict()), 201

@inventory_bp.route('/categories/<int:category_id>', methods=['PUT'])
def update_category(category_id):
    category = Category.query.get_or_404(category_id)
    data = request.get_json()
    category.name = data.get('name', category.name)
    category.parent_id = data.get('parent_id', category.parent_id)
    db.session.commit()
    return jsonify(category.to_dict())

@inventory_bp.route('/categories/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    category = Category.query.get_or_404(category_id)
    db.session.delete(category)
    db.session.commit()
    return '', 204

# Units endpoints
@inventory_bp.route('/units', methods=['GET'])
def get_units():
    units = Unit.query.all()
    return jsonify([unit.to_dict() for unit in units])

@inventory_bp.route('/units', methods=['POST'])
def create_unit():
    data = request.get_json()
    unit = Unit(
        name=data['name'],
        conversion_factor=data.get('conversion_factor', 1.0)
    )
    db.session.add(unit)
    db.session.commit()
    return jsonify(unit.to_dict()), 201

@inventory_bp.route('/units/<int:unit_id>', methods=['PUT'])
def update_unit(unit_id):
    unit = Unit.query.get_or_404(unit_id)
    data = request.get_json()
    unit.name = data.get('name', unit.name)
    unit.conversion_factor = data.get('conversion_factor', unit.conversion_factor)
    db.session.commit()
    return jsonify(unit.to_dict())

@inventory_bp.route('/units/<int:unit_id>', methods=['DELETE'])
def delete_unit(unit_id):
    unit = Unit.query.get_or_404(unit_id)
    db.session.delete(unit)
    db.session.commit()
    return '', 204

# Products endpoints
@inventory_bp.route('/products', methods=['GET'])
def get_products():
    search = request.args.get('search', '')
    category_id = request.args.get('category_id')
    
    query = Product.query
    
    if search:
        query = query.filter(Product.name.contains(search) | Product.barcode.contains(search))
    
    if category_id:
        query = query.filter(Product.category_id == category_id)
    
    products = query.all()
    return jsonify([product.to_dict() for product in products])

@inventory_bp.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    product = Product(
        name=data['name'],
        description=data.get('description', ''),
        barcode=data.get('barcode'),
        purchase_price=data.get('purchase_price', 0),
        sale_price=data.get('sale_price', 0),
        category_id=data.get('category_id'),
        base_unit_id=data.get('base_unit_id'),
        reorder_level=data.get('reorder_level', 0)
    )
    db.session.add(product)
    db.session.commit()
    return jsonify(product.to_dict()), 201

@inventory_bp.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product = Product.query.get_or_404(product_id)
    data = request.get_json()
    
    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.barcode = data.get('barcode', product.barcode)
    product.purchase_price = data.get('purchase_price', product.purchase_price)
    product.sale_price = data.get('sale_price', product.sale_price)
    product.category_id = data.get('category_id', product.category_id)
    product.base_unit_id = data.get('base_unit_id', product.base_unit_id)
    product.reorder_level = data.get('reorder_level', product.reorder_level)
    
    db.session.commit()
    return jsonify(product.to_dict())

@inventory_bp.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return '', 204

# Inventory endpoints
@inventory_bp.route('/inventory', methods=['GET'])
def get_inventory():
    warehouse_id = request.args.get('warehouse_id')
    
    query = db.session.query(Inventory, Product, Warehouse).join(Product).join(Warehouse)
    
    if warehouse_id:
        query = query.filter(Inventory.warehouse_id == warehouse_id)
    
    inventory_items = query.all()
    
    result = []
    for inventory, product, warehouse in inventory_items:
        item = inventory.to_dict()
        item['product'] = product.to_dict()
        item['warehouse'] = warehouse.to_dict()
        result.append(item)
    
    return jsonify(result)

@inventory_bp.route('/inventory/movements', methods=['POST'])
def create_inventory_movement():
    data = request.get_json()
    
    movement = InventoryMovement(
        product_id=data['product_id'],
        warehouse_id=data['warehouse_id'],
        movement_type=data['movement_type'],
        quantity=data['quantity'],
        movement_date=datetime.utcnow(),
        user_id=data['user_id']
    )
    
    # Update inventory
    inventory = Inventory.query.filter_by(
        product_id=data['product_id'],
        warehouse_id=data['warehouse_id']
    ).first()
    
    if not inventory:
        inventory = Inventory(
            product_id=data['product_id'],
            warehouse_id=data['warehouse_id'],
            quantity=0
        )
        db.session.add(inventory)
    
    if data['movement_type'] == 'In':
        inventory.quantity += data['quantity']
    elif data['movement_type'] == 'Out':
        inventory.quantity -= data['quantity']
    
    db.session.add(movement)
    db.session.commit()
    
    return jsonify(movement.to_dict()), 201

@inventory_bp.route('/inventory/movements', methods=['GET'])
def get_inventory_movements():
    product_id = request.args.get('product_id')
    warehouse_id = request.args.get('warehouse_id')
    
    query = InventoryMovement.query
    
    if product_id:
        query = query.filter(InventoryMovement.product_id == product_id)
    
    if warehouse_id:
        query = query.filter(InventoryMovement.warehouse_id == warehouse_id)
    
    movements = query.order_by(InventoryMovement.movement_date.desc()).all()
    return jsonify([movement.to_dict() for movement in movements])

@inventory_bp.route('/products/barcode/<barcode>', methods=['GET'])
def get_product_by_barcode(barcode):
    product = Product.query.filter_by(barcode=barcode).first()
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    return jsonify(product.to_dict())

