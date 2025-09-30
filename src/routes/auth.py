from src.models.base import db, BaseModel
from werkzeug.security import generate_password_hash, check_password_hash

class User(BaseModel):
    __tablename__ = 'users'
    
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relationships
    roles = db.relationship('UserRole', back_populates='user', cascade='all, delete-orphan')
    
    def set_password(self, password):
        """Set password hash"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Check password"""
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        data = super().to_dict()
        data.pop('password_hash', None)  # Never include password hash
        return data

class Role(BaseModel):
    __tablename__ = 'roles'
    
    role_name = db.Column(db.String(50), unique=True, nullable=False)
    
    # Relationships
    users = db.relationship('UserRole', back_populates='role')
    permissions = db.relationship('RolePermission', back_populates='role', cascade='all, delete-orphan')

class Permission(BaseModel):
    __tablename__ = 'permissions'
    
    permission_name = db.Column(db.String(100), unique=True, nullable=False)
    
    # Relationships
    roles = db.relationship('RolePermission', back_populates='permission')

class UserRole(BaseModel):
    __tablename__ = 'user_roles'
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    
    # Relationships
    user = db.relationship('User', back_populates='roles')
    role = db.relationship('Role', back_populates='users')

class RolePermission(BaseModel):
    __tablename__ = 'role_permissions'
    
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    permission_id = db.Column(db.Integer, db.ForeignKey('permissions.id'), nullable=False)
    
    # Relationships
    role = db.relationship('Role', back_populates='permissions')
    permission = db.relationship('Permission', back_populates='roles')

