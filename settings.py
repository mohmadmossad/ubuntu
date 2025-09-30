from src.models.base import db, BaseModel

class Setting(BaseModel):
    __tablename__ = 'settings'
    
    key = db.Column(db.String(100), unique=True, nullable=False)
    value = db.Column(db.Text)

