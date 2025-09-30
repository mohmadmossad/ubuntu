from src.models.base import db, BaseModel

class Warehouse(BaseModel):
    __tablename__ = 'warehouses'
    
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(255))
    
    # Relationships
    inventory = db.relationship('Inventory', back_populates='warehouse')

class Category(BaseModel):
    __tablename__ = 'categories'
    
    name = db.Column(db.String(100), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    
    # Relationships
    parent = db.relationship('Category', remote_side=[id], backref='children')
    products = db.relationship('Product', back_populates='category')

class Unit(BaseModel):
    __tablename__ = 'units'
    
    name = db.Column(db.String(50), nullable=False)
    conversion_factor = db.Column(db.Numeric(10, 4), default=1.0)
    
    # Relationships
    products = db.relationship('Product', back_populates='base_unit')

class Product(BaseModel):
    __tablename__ = 'products'
    
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    barcode = db.Column(db.String(50), unique=True)
    purchase_price = db.Column(db.Numeric(10, 2), default=0.0)
    sale_price = db.Column(db.Numeric(10, 2), default=0.0)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    base_unit_id = db.Column(db.Integer, db.ForeignKey('units.id'))
    reorder_level = db.Column(db.Integer, default=0)
    
    # Relationships
    category = db.relationship('Category', back_populates='products')
    base_unit = db.relationship('Unit', back_populates='products')
    inventory = db.relationship('Inventory', back_populates='product')
    movements = db.relationship('InventoryMovement', back_populates='product')

class Inventory(BaseModel):
    __tablename__ = 'inventory'
    
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    warehouse_id = db.Column(db.Integer, db.ForeignKey('warehouses.id'), nullable=False)
    quantity = db.Column(db.Numeric(10, 2), default=0.0)
    
    # Relationships
    product = db.relationship('Product', back_populates='inventory')
    warehouse = db.relationship('Warehouse', back_populates='inventory')

class InventoryMovement(BaseModel):
    __tablename__ = 'inventory_movements'
    
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    warehouse_id = db.Column(db.Integer, db.ForeignKey('warehouses.id'), nullable=False)
    movement_type = db.Column(db.String(50), nullable=False)  # In, Out, Transfer
    quantity = db.Column(db.Numeric(10, 2), nullable=False)
    movement_date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Relationships
    product = db.relationship('Product', back_populates='movements')
    warehouse = db.relationship('Warehouse')
    user = db.relationship('User')

