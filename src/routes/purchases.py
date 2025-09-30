from src.models.base import db, BaseModel

class PurchaseInvoice(BaseModel):
    __tablename__ = 'purchase_invoices'
    
    supplier_id = db.Column(db.Integer, db.ForeignKey('suppliers.id'), nullable=False)
    invoice_date = db.Column(db.DateTime, nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), default=0.0)
    discount = db.Column(db.Numeric(10, 2), default=0.0)
    net_amount = db.Column(db.Numeric(10, 2), default=0.0)
    payment_status = db.Column(db.String(50), default='Due')  # Paid, Partial, Due
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Relationships
    supplier = db.relationship('Supplier', back_populates='purchase_invoices')
    user = db.relationship('User')
    items = db.relationship('PurchaseInvoiceItem', back_populates='invoice', cascade='all, delete-orphan')
    returns = db.relationship('PurchaseReturn', back_populates='invoice')

class PurchaseInvoiceItem(BaseModel):
    __tablename__ = 'purchase_invoice_items'
    
    invoice_id = db.Column(db.Integer, db.ForeignKey('purchase_invoices.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Numeric(10, 2), nullable=False)
    unit_price = db.Column(db.Numeric(10, 2), nullable=False)
    total_price = db.Column(db.Numeric(10, 2), nullable=False)
    
    # Relationships
    invoice = db.relationship('PurchaseInvoice', back_populates='items')
    product = db.relationship('Product')

class PurchaseReturn(BaseModel):
    __tablename__ = 'purchase_returns'
    
    invoice_id = db.Column(db.Integer, db.ForeignKey('purchase_invoices.id'), nullable=False)
    return_date = db.Column(db.DateTime, nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    
    # Relationships
    invoice = db.relationship('PurchaseInvoice', back_populates='returns')

