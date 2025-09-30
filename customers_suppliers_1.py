from src.models.base import db, BaseModel

class Supplier(BaseModel):
    __tablename__ = 'suppliers'
    
    name = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(20))
    address = db.Column(db.String(255))
    email = db.Column(db.String(100))
    balance = db.Column(db.Numeric(10, 2), default=0.0)
    
    # Relationships
    purchase_invoices = db.relationship('PurchaseInvoice', back_populates='supplier')

class Customer(BaseModel):
    __tablename__ = 'customers'
    
    name = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(20))
    address = db.Column(db.String(255))
    email = db.Column(db.String(100))
    balance = db.Column(db.Numeric(10, 2), default=0.0)
    
    # Relationships
    sale_invoices = db.relationship('SaleInvoice', back_populates='customer')

