from src.models.base import db, BaseModel

class CashBox(BaseModel):
    __tablename__ = 'cash_boxes'
    
    name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # NULL for main cashbox
    balance = db.Column(db.Numeric(10, 2), default=0.0)
    
    # Relationships
    user = db.relationship('User')
    movements = db.relationship('CashBoxMovement', back_populates='cashbox')

class CashBoxMovement(BaseModel):
    __tablename__ = 'cash_box_movements'
    
    cashbox_id = db.Column(db.Integer, db.ForeignKey('cash_boxes.id'), nullable=False)
    movement_type = db.Column(db.String(50), nullable=False)  # Deposit, Withdrawal, Transfer
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    movement_date = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Relationships
    cashbox = db.relationship('CashBox', back_populates='movements')
    user = db.relationship('User')

