from src.models.base import db, BaseModel

class Expense(BaseModel):
    __tablename__ = 'expenses'
    
    expense_date = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.Text, nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    category = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Relationships
    user = db.relationship('User')

