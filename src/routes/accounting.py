from src.models.base import db, BaseModel

class ChartOfAccount(BaseModel):
    __tablename__ = 'chart_of_accounts'
    
    account_code = db.Column(db.String(50), unique=True, nullable=False)
    account_name = db.Column(db.String(255), nullable=False)
    account_type = db.Column(db.String(50), nullable=False)  # Assets, Liabilities, Equity, Revenue, Expenses
    parent_account_id = db.Column(db.Integer, db.ForeignKey('chart_of_accounts.id'))
    is_active = db.Column(db.Boolean, default=True)
    
    # Relationships
    parent = db.relationship('ChartOfAccount', remote_side=[id], backref='children')
    journal_entries = db.relationship('JournalEntryItem', back_populates='account')

class JournalEntry(BaseModel):
    __tablename__ = 'journal_entries'
    
    entry_date = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Relationships
    user = db.relationship('User')
    items = db.relationship('JournalEntryItem', back_populates='entry', cascade='all, delete-orphan')

class JournalEntryItem(BaseModel):
    __tablename__ = 'journal_entry_items'
    
    entry_id = db.Column(db.Integer, db.ForeignKey('journal_entries.id'), nullable=False)
    account_id = db.Column(db.Integer, db.ForeignKey('chart_of_accounts.id'), nullable=False)
    debit = db.Column(db.Numeric(10, 2), default=0.0)
    credit = db.Column(db.Numeric(10, 2), default=0.0)
    
    # Relationships
    entry = db.relationship('JournalEntry', back_populates='items')
    account = db.relationship('ChartOfAccount', back_populates='journal_entries')

