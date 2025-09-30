from src.models.base import db, BaseModel

class SaleInvoice(BaseModel):
    __tablename__ = 'sale_invoices'
    
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)
    invoice_date = db.Column(db.DateTime, nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), default=0.0)
    discount = db.Column(db.Numeric(10, 2), default=0.0)
    net_amount = db.Column(db.Numeric(10, 2), default=0.0)
    payment_status = db.Column(db.String(50), default='Due')  # Paid, Partial, Due
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Relationships
    customer = db.relationship('Customer', back_populates='sale_invoices')
    user = db.relationship('User')
    items = db.relationship('SaleInvoiceItem', back_populates='invoice', cascade='all, delete-orphan')
    returns = db.relationship('SaleReturn', back_populates='invoice')

class SaleInvoiceItem(BaseModel):
    __tablename__ = 'sale_invoice_items'
    
    invoice_id = db.Column(db.Integer, db.ForeignKey('sale_invoices.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Numeric(10, 2), nullable=False)
    unit_price = db.Column(db.Numeric(10, 2), nullable=False)
    total_price = db.Column(db.Numeric(10, 2), nullable=False)
    
    # Relationships
    invoice = db.relationship('SaleInvoice', back_populates='items')
    product = db.relationship('Product')

class SaleReturn(BaseModel):
    __tablename__ = 'sale_returns'
    
    invoice_id = db.Column(db.Integer, db.ForeignKey('sale_invoices.id'), nullable=False)
    return_date = db.Column(db.DateTime, nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    
    # Relationships
    invoice = db.relationship('SaleInvoice', back_populates='returns')

