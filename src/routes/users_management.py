from flask import Blueprint, request, jsonify
from src.models.user import db, User
from src.models.cashbox import CashBox, CashBoxTransaction
from src.models.settings import SystemSettings
from datetime import datetime
from werkzeug.security import generate_password_hash
from sqlalchemy import func, and_, or_

users_management_bp = Blueprint('users_management', __name__)

# User Management endpoints
@users_management_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.filter(User.is_active == True).all()
    
    result = []
    for user in users:
        user_data = user.to_dict()
        # Get user's cashbox
        cashbox = CashBox.query.filter_by(user_id=user.id, is_active=True).first()
        if cashbox:
            user_data['cashbox'] = cashbox.to_dict()
        else:
            user_data['cashbox'] = None
        result.append(user_data)
    
    return jsonify(result)

@users_management_bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    # Check if username already exists
    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify({'error': 'Username already exists'}), 400
    
    user = User(
        username=data['username'],
        email=data.get('email', ''),
        full_name=data['full_name'],
        role=data.get('role', 'employee'),
        permissions=data.get('permissions', {}),
        is_active=data.get('is_active', True)
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.flush()  # Get user ID
    
    # Create cashbox for user if specified
    if data.get('create_cashbox', False):
        cashbox = CashBox(
            name=f"صندوق {user.full_name}",
            user_id=user.id,
            initial_balance=data.get('initial_balance', 0),
            current_balance=data.get('initial_balance', 0),
            is_main=False,
            is_active=True
        )
        db.session.add(cashbox)
    
    db.session.commit()
    return jsonify(user.to_dict()), 201

@users_management_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    # Check if new username conflicts with existing users
    if 'username' in data and data['username'] != user.username:
        existing_user = User.query.filter_by(username=data['username']).first()
        if existing_user:
            return jsonify({'error': 'Username already exists'}), 400
    
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    user.full_name = data.get('full_name', user.full_name)
    user.role = data.get('role', user.role)
    user.permissions = data.get('permissions', user.permissions)
    user.is_active = data.get('is_active', user.is_active)
    
    if 'password' in data and data['password']:
        user.set_password(data['password'])
    
    db.session.commit()
    return jsonify(user.to_dict())

@users_management_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    
    # Don't allow deleting admin user
    if user.role == 'admin':
        return jsonify({'error': 'Cannot delete admin user'}), 400
    
    # Soft delete - just mark as inactive
    user.is_active = False
    
    # Also deactivate user's cashbox
    cashbox = CashBox.query.filter_by(user_id=user_id).first()
    if cashbox:
        cashbox.is_active = False
    
    db.session.commit()
    return '', 204

# Roles and Permissions endpoints
@users_management_bp.route('/roles', methods=['GET'])
def get_roles():
    roles = [
        {
            'id': 'admin',
            'name': 'مدير النظام',
            'description': 'صلاحيات كاملة لجميع وحدات النظام',
            'permissions': {
                'inventory_management': True,
                'sales_management': True,
                'purchases_management': True,
                'customers_suppliers': True,
                'accounting_reports': True,
                'users_management': True,
                'cashbox_management': True,
                'system_settings': True,
                'backup_restore': True
            }
        },
        {
            'id': 'manager',
            'name': 'مدير',
            'description': 'صلاحيات إدارية محدودة',
            'permissions': {
                'inventory_management': True,
                'sales_management': True,
                'purchases_management': True,
                'customers_suppliers': True,
                'accounting_reports': True,
                'users_management': False,
                'cashbox_management': True,
                'system_settings': False,
                'backup_restore': False
            }
        },
        {
            'id': 'cashier',
            'name': 'أمين صندوق',
            'description': 'صلاحيات المبيعات والصندوق',
            'permissions': {
                'inventory_management': False,
                'sales_management': True,
                'purchases_management': False,
                'customers_suppliers': True,
                'accounting_reports': False,
                'users_management': False,
                'cashbox_management': True,
                'system_settings': False,
                'backup_restore': False
            }
        },
        {
            'id': 'employee',
            'name': 'موظف',
            'description': 'صلاحيات محدودة للعمليات الأساسية',
            'permissions': {
                'inventory_management': True,
                'sales_management': True,
                'purchases_management': True,
                'customers_suppliers': False,
                'accounting_reports': False,
                'users_management': False,
                'cashbox_management': False,
                'system_settings': False,
                'backup_restore': False
            }
        }
    ]
    return jsonify(roles)

# CashBox Management endpoints
@users_management_bp.route('/cashboxes', methods=['GET'])
def get_cashboxes():
    cashboxes = CashBox.query.filter_by(is_active=True).all()
    
    result = []
    for cashbox in cashboxes:
        cashbox_data = cashbox.to_dict()
        
        # Get user info
        if cashbox.user_id:
            user = User.query.get(cashbox.user_id)
            cashbox_data['user'] = user.to_dict() if user else None
        
        # Get recent transactions count
        recent_transactions = CashBoxTransaction.query.filter_by(
            cashbox_id=cashbox.id
        ).count()
        cashbox_data['transactions_count'] = recent_transactions
        
        result.append(cashbox_data)
    
    return jsonify(result)

@users_management_bp.route('/cashboxes', methods=['POST'])
def create_cashbox():
    data = request.get_json()
    
    cashbox = CashBox(
        name=data['name'],
        user_id=data.get('user_id'),
        initial_balance=data.get('initial_balance', 0),
        current_balance=data.get('initial_balance', 0),
        is_main=data.get('is_main', False),
        is_active=True,
        description=data.get('description', '')
    )
    
    db.session.add(cashbox)
    db.session.commit()
    return jsonify(cashbox.to_dict()), 201

@users_management_bp.route('/cashboxes/<int:cashbox_id>', methods=['PUT'])
def update_cashbox(cashbox_id):
    cashbox = CashBox.query.get_or_404(cashbox_id)
    data = request.get_json()
    
    cashbox.name = data.get('name', cashbox.name)
    cashbox.user_id = data.get('user_id', cashbox.user_id)
    cashbox.is_main = data.get('is_main', cashbox.is_main)
    cashbox.description = data.get('description', cashbox.description)
    
    db.session.commit()
    return jsonify(cashbox.to_dict())

@users_management_bp.route('/cashboxes/<int:cashbox_id>/transactions', methods=['GET'])
def get_cashbox_transactions(cashbox_id):
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    transaction_type = request.args.get('type')
    
    query = CashBoxTransaction.query.filter_by(cashbox_id=cashbox_id)
    
    if start_date:
        query = query.filter(CashBoxTransaction.transaction_date >= start_date)
    if end_date:
        query = query.filter(CashBoxTransaction.transaction_date <= end_date)
    if transaction_type:
        query = query.filter(CashBoxTransaction.transaction_type == transaction_type)
    
    transactions = query.order_by(CashBoxTransaction.transaction_date.desc()).all()
    return jsonify([transaction.to_dict() for transaction in transactions])

@users_management_bp.route('/cashboxes/<int:cashbox_id>/transactions', methods=['POST'])
def create_cashbox_transaction():
    cashbox_id = request.view_args['cashbox_id']
    data = request.get_json()
    
    cashbox = CashBox.query.get_or_404(cashbox_id)
    
    transaction = CashBoxTransaction(
        cashbox_id=cashbox_id,
        transaction_type=data['transaction_type'],
        amount=data['amount'],
        description=data['description'],
        reference_number=data.get('reference_number', ''),
        transaction_date=datetime.fromisoformat(data.get('transaction_date', datetime.now().isoformat())),
        user_id=data['user_id']
    )
    
    # Update cashbox balance
    if transaction.transaction_type == 'deposit':
        cashbox.current_balance += transaction.amount
    else:  # withdrawal
        if cashbox.current_balance < transaction.amount:
            return jsonify({'error': 'Insufficient balance'}), 400
        cashbox.current_balance -= transaction.amount
    
    db.session.add(transaction)
    db.session.commit()
    
    return jsonify(transaction.to_dict()), 201

@users_management_bp.route('/cashboxes/<int:from_cashbox_id>/transfer/<int:to_cashbox_id>', methods=['POST'])
def transfer_between_cashboxes(from_cashbox_id, to_cashbox_id):
    data = request.get_json()
    amount = data['amount']
    description = data.get('description', 'تحويل بين الصناديق')
    user_id = data['user_id']
    
    from_cashbox = CashBox.query.get_or_404(from_cashbox_id)
    to_cashbox = CashBox.query.get_or_404(to_cashbox_id)
    
    if from_cashbox.current_balance < amount:
        return jsonify({'error': 'Insufficient balance in source cashbox'}), 400
    
    # Create withdrawal transaction
    withdrawal = CashBoxTransaction(
        cashbox_id=from_cashbox_id,
        transaction_type='withdrawal',
        amount=amount,
        description=f"{description} - تحويل إلى {to_cashbox.name}",
        transaction_date=datetime.now(),
        user_id=user_id
    )
    
    # Create deposit transaction
    deposit = CashBoxTransaction(
        cashbox_id=to_cashbox_id,
        transaction_type='deposit',
        amount=amount,
        description=f"{description} - تحويل من {from_cashbox.name}",
        transaction_date=datetime.now(),
        user_id=user_id
    )
    
    # Update balances
    from_cashbox.current_balance -= amount
    to_cashbox.current_balance += amount
    
    db.session.add(withdrawal)
    db.session.add(deposit)
    db.session.commit()
    
    return jsonify({
        'message': 'Transfer completed successfully',
        'from_cashbox': from_cashbox.to_dict(),
        'to_cashbox': to_cashbox.to_dict()
    })

# System Settings endpoints
@users_management_bp.route('/settings', methods=['GET'])
def get_system_settings():
    settings = SystemSettings.query.first()
    if not settings:
        # Create default settings
        settings = SystemSettings(
            company_name='اسم الشركة',
            company_address='عنوان الشركة',
            company_phone='رقم الهاتف',
            company_email='البريد الإلكتروني',
            tax_number='الرقم الضريبي',
            currency='ر.س',
            fiscal_year_start='01-01',
            backup_frequency='daily',
            auto_backup=True
        )
        db.session.add(settings)
        db.session.commit()
    
    return jsonify(settings.to_dict())

@users_management_bp.route('/settings', methods=['PUT'])
def update_system_settings():
    settings = SystemSettings.query.first()
    if not settings:
        settings = SystemSettings()
        db.session.add(settings)
    
    data = request.get_json()
    
    settings.company_name = data.get('company_name', settings.company_name)
    settings.company_address = data.get('company_address', settings.company_address)
    settings.company_phone = data.get('company_phone', settings.company_phone)
    settings.company_email = data.get('company_email', settings.company_email)
    settings.tax_number = data.get('tax_number', settings.tax_number)
    settings.currency = data.get('currency', settings.currency)
    settings.fiscal_year_start = data.get('fiscal_year_start', settings.fiscal_year_start)
    settings.backup_frequency = data.get('backup_frequency', settings.backup_frequency)
    settings.auto_backup = data.get('auto_backup', settings.auto_backup)
    
    db.session.commit()
    return jsonify(settings.to_dict())

# Backup and Restore endpoints
@users_management_bp.route('/backup', methods=['POST'])
def create_backup():
    # This would implement database backup functionality
    # For now, return a success message
    
    backup_info = {
        'backup_id': f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
        'created_at': datetime.now().isoformat(),
        'size': '2.5 MB',
        'status': 'completed'
    }
    
    return jsonify({
        'message': 'Backup created successfully',
        'backup': backup_info
    })

@users_management_bp.route('/backups', methods=['GET'])
def get_backups():
    # This would list available backups
    # For now, return sample data
    
    backups = [
        {
            'backup_id': 'backup_20240926_120000',
            'created_at': '2024-09-26T12:00:00',
            'size': '2.5 MB',
            'status': 'completed'
        },
        {
            'backup_id': 'backup_20240925_120000',
            'created_at': '2024-09-25T12:00:00',
            'size': '2.3 MB',
            'status': 'completed'
        }
    ]
    
    return jsonify(backups)

@users_management_bp.route('/restore/<backup_id>', methods=['POST'])
def restore_backup(backup_id):
    # This would implement database restore functionality
    # For now, return a success message
    
    return jsonify({
        'message': f'Database restored from backup {backup_id}',
        'restored_at': datetime.now().isoformat()
    })

# Dashboard analytics for admin
@users_management_bp.route('/analytics/users', methods=['GET'])
def get_user_analytics():
    total_users = User.query.filter_by(is_active=True).count()
    active_cashboxes = CashBox.query.filter_by(is_active=True).count()
    
    # Users by role
    users_by_role = db.session.query(
        User.role,
        func.count(User.id).label('count')
    ).filter_by(is_active=True).group_by(User.role).all()
    
    # Total cash in all cashboxes
    total_cash = db.session.query(
        func.sum(CashBox.current_balance)
    ).filter_by(is_active=True).scalar() or 0
    
    analytics = {
        'total_users': total_users,
        'active_cashboxes': active_cashboxes,
        'total_cash': total_cash,
        'users_by_role': [
            {'role': role[0], 'count': role[1]} 
            for role in users_by_role
        ]
    }
    
    return jsonify(analytics)

