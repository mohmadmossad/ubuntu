from flask import Blueprint, request, jsonify
from src.models.user import db
from src.models.customers_suppliers import Customer, Supplier, CustomerAccount, SupplierAccount, PaymentVoucher, ReceiptVoucher
from src.models.purchases import Purchase
from src.models.sales import Sale
from datetime import datetime

customers_suppliers_bp = Blueprint('customers_suppliers', __name__)

# Customers endpoints
@customers_suppliers_bp.route('/customers', methods=['GET'])
def get_customers():
    search = request.args.get('search', '')
    
    query = Customer.query
    
    if search:
        query = query.filter(
            Customer.name.contains(search) | 
            Customer.phone.contains(search) |
            Customer.email.contains(search)
        )
    
    customers = query.order_by(Customer.name).all()
    return jsonify([customer.to_dict() for customer in customers])

@customers_suppliers_bp.route('/customers', methods=['POST'])
def create_customer():
    data = request.get_json()
    
    customer = Customer(
        name=data['name'],
        phone=data.get('phone', ''),
        email=data.get('email', ''),
        address=data.get('address', ''),
        tax_number=data.get('tax_number', ''),
        credit_limit=data.get('credit_limit', 0),
        notes=data.get('notes', '')
    )
    
    db.session.add(customer)
    db.session.commit()
    return jsonify(customer.to_dict()), 201

@customers_suppliers_bp.route('/customers/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    customer = Customer.query.get_or_404(customer_id)
    customer_data = customer.to_dict()
    
    # Include account balance
    account = CustomerAccount.query.filter_by(customer_id=customer_id).first()
    customer_data['balance'] = account.balance if account else 0
    
    # Include recent transactions
    sales = Sale.query.filter_by(customer_id=customer_id).order_by(Sale.sale_date.desc()).limit(10).all()
    customer_data['recent_sales'] = [sale.to_dict() for sale in sales]
    
    return jsonify(customer_data)

@customers_suppliers_bp.route('/customers/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    customer = Customer.query.get_or_404(customer_id)
    data = request.get_json()
    
    customer.name = data.get('name', customer.name)
    customer.phone = data.get('phone', customer.phone)
    customer.email = data.get('email', customer.email)
    customer.address = data.get('address', customer.address)
    customer.tax_number = data.get('tax_number', customer.tax_number)
    customer.credit_limit = data.get('credit_limit', customer.credit_limit)
    customer.notes = data.get('notes', customer.notes)
    
    db.session.commit()
    return jsonify(customer.to_dict())

@customers_suppliers_bp.route('/customers/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    customer = Customer.query.get_or_404(customer_id)
    db.session.delete(customer)
    db.session.commit()
    return '', 204

# Suppliers endpoints
@customers_suppliers_bp.route('/suppliers', methods=['GET'])
def get_suppliers():
    search = request.args.get('search', '')
    
    query = Supplier.query
    
    if search:
        query = query.filter(
            Supplier.name.contains(search) | 
            Supplier.phone.contains(search) |
            Supplier.email.contains(search)
        )
    
    suppliers = query.order_by(Supplier.name).all()
    return jsonify([supplier.to_dict() for supplier in suppliers])

@customers_suppliers_bp.route('/suppliers', methods=['POST'])
def create_supplier():
    data = request.get_json()
    
    supplier = Supplier(
        name=data['name'],
        phone=data.get('phone', ''),
        email=data.get('email', ''),
        address=data.get('address', ''),
        tax_number=data.get('tax_number', ''),
        notes=data.get('notes', '')
    )
    
    db.session.add(supplier)
    db.session.commit()
    return jsonify(supplier.to_dict()), 201

@customers_suppliers_bp.route('/suppliers/<int:supplier_id>', methods=['GET'])
def get_supplier(supplier_id):
    supplier = Supplier.query.get_or_404(supplier_id)
    supplier_data = supplier.to_dict()
    
    # Include account balance
    account = SupplierAccount.query.filter_by(supplier_id=supplier_id).first()
    supplier_data['balance'] = account.balance if account else 0
    
    # Include recent transactions
    purchases = Purchase.query.filter_by(supplier_id=supplier_id).order_by(Purchase.purchase_date.desc()).limit(10).all()
    supplier_data['recent_purchases'] = [purchase.to_dict() for purchase in purchases]
    
    return jsonify(supplier_data)

@customers_suppliers_bp.route('/suppliers/<int:supplier_id>', methods=['PUT'])
def update_supplier(supplier_id):
    supplier = Supplier.query.get_or_404(supplier_id)
    data = request.get_json()
    
    supplier.name = data.get('name', supplier.name)
    supplier.phone = data.get('phone', supplier.phone)
    supplier.email = data.get('email', supplier.email)
    supplier.address = data.get('address', supplier.address)
    supplier.tax_number = data.get('tax_number', supplier.tax_number)
    supplier.notes = data.get('notes', supplier.notes)
    
    db.session.commit()
    return jsonify(supplier.to_dict())

@customers_suppliers_bp.route('/suppliers/<int:supplier_id>', methods=['DELETE'])
def delete_supplier(supplier_id):
    supplier = Supplier.query.get_or_404(supplier_id)
    db.session.delete(supplier)
    db.session.commit()
    return '', 204

# Customer Account endpoints
@customers_suppliers_bp.route('/customers/<int:customer_id>/account', methods=['GET'])
def get_customer_account(customer_id):
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    customer = Customer.query.get_or_404(customer_id)
    
    # Get account balance
    account = CustomerAccount.query.filter_by(customer_id=customer_id).first()
    if not account:
        account = CustomerAccount(customer_id=customer_id, balance=0)
        db.session.add(account)
        db.session.commit()
    
    # Get transactions (sales and receipts)
    transactions = []
    
    # Sales
    sales_query = Sale.query.filter_by(customer_id=customer_id)
    if start_date:
        sales_query = sales_query.filter(Sale.sale_date >= start_date)
    if end_date:
        sales_query = sales_query.filter(Sale.sale_date <= end_date)
    
    sales = sales_query.order_by(Sale.sale_date.desc()).all()
    for sale in sales:
        transactions.append({
            'id': sale.id,
            'date': sale.sale_date.isoformat(),
            'type': 'sale',
            'description': f'فاتورة مبيعات رقم {sale.id}',
            'debit': sale.total_amount,
            'credit': 0,
            'balance': 0  # Will be calculated
        })
    
    # Receipt vouchers
    receipts_query = ReceiptVoucher.query.filter_by(customer_id=customer_id)
    if start_date:
        receipts_query = receipts_query.filter(ReceiptVoucher.voucher_date >= start_date)
    if end_date:
        receipts_query = receipts_query.filter(ReceiptVoucher.voucher_date <= end_date)
    
    receipts = receipts_query.order_by(ReceiptVoucher.voucher_date.desc()).all()
    for receipt in receipts:
        transactions.append({
            'id': receipt.id,
            'date': receipt.voucher_date.isoformat(),
            'type': 'receipt',
            'description': f'سند قبض رقم {receipt.id}',
            'debit': 0,
            'credit': receipt.amount,
            'balance': 0  # Will be calculated
        })
    
    # Sort transactions by date
    transactions.sort(key=lambda x: x['date'], reverse=True)
    
    # Calculate running balance
    running_balance = account.balance
    for transaction in reversed(transactions):
        running_balance = running_balance - transaction['debit'] + transaction['credit']
        transaction['balance'] = running_balance
    
    return jsonify({
        'customer': customer.to_dict(),
        'account': account.to_dict(),
        'transactions': transactions
    })

# Supplier Account endpoints
@customers_suppliers_bp.route('/suppliers/<int:supplier_id>/account', methods=['GET'])
def get_supplier_account(supplier_id):
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    supplier = Supplier.query.get_or_404(supplier_id)
    
    # Get account balance
    account = SupplierAccount.query.filter_by(supplier_id=supplier_id).first()
    if not account:
        account = SupplierAccount(supplier_id=supplier_id, balance=0)
        db.session.add(account)
        db.session.commit()
    
    # Get transactions (purchases and payments)
    transactions = []
    
    # Purchases
    purchases_query = Purchase.query.filter_by(supplier_id=supplier_id)
    if start_date:
        purchases_query = purchases_query.filter(Purchase.purchase_date >= start_date)
    if end_date:
        purchases_query = purchases_query.filter(Purchase.purchase_date <= end_date)
    
    purchases = purchases_query.order_by(Purchase.purchase_date.desc()).all()
    for purchase in purchases:
        transactions.append({
            'id': purchase.id,
            'date': purchase.purchase_date.isoformat(),
            'type': 'purchase',
            'description': f'فاتورة مشتريات رقم {purchase.id}',
            'debit': 0,
            'credit': purchase.total_amount,
            'balance': 0  # Will be calculated
        })
    
    # Payment vouchers
    payments_query = PaymentVoucher.query.filter_by(supplier_id=supplier_id)
    if start_date:
        payments_query = payments_query.filter(PaymentVoucher.voucher_date >= start_date)
    if end_date:
        payments_query = payments_query.filter(PaymentVoucher.voucher_date <= end_date)
    
    payments = payments_query.order_by(PaymentVoucher.voucher_date.desc()).all()
    for payment in payments:
        transactions.append({
            'id': payment.id,
            'date': payment.voucher_date.isoformat(),
            'type': 'payment',
            'description': f'سند صرف رقم {payment.id}',
            'debit': payment.amount,
            'credit': 0,
            'balance': 0  # Will be calculated
        })
    
    # Sort transactions by date
    transactions.sort(key=lambda x: x['date'], reverse=True)
    
    # Calculate running balance
    running_balance = account.balance
    for transaction in reversed(transactions):
        running_balance = running_balance + transaction['credit'] - transaction['debit']
        transaction['balance'] = running_balance
    
    return jsonify({
        'supplier': supplier.to_dict(),
        'account': account.to_dict(),
        'transactions': transactions
    })

# Receipt Vouchers endpoints
@customers_suppliers_bp.route('/receipt-vouchers', methods=['GET'])
def get_receipt_vouchers():
    vouchers = ReceiptVoucher.query.order_by(ReceiptVoucher.voucher_date.desc()).all()
    return jsonify([voucher.to_dict() for voucher in vouchers])

@customers_suppliers_bp.route('/receipt-vouchers', methods=['POST'])
def create_receipt_voucher():
    data = request.get_json()
    
    voucher = ReceiptVoucher(
        customer_id=data.get('customer_id'),
        voucher_date=datetime.fromisoformat(data['voucher_date']),
        amount=data['amount'],
        payment_method=data.get('payment_method', 'Cash'),
        reference_number=data.get('reference_number', ''),
        notes=data.get('notes', ''),
        user_id=data['user_id']
    )
    
    db.session.add(voucher)
    
    # Update customer account if customer is specified
    if data.get('customer_id'):
        account = CustomerAccount.query.filter_by(customer_id=data['customer_id']).first()
        if not account:
            account = CustomerAccount(customer_id=data['customer_id'], balance=0)
            db.session.add(account)
        account.balance -= data['amount']  # Reduce customer debt
    
    db.session.commit()
    return jsonify(voucher.to_dict()), 201

# Payment Vouchers endpoints
@customers_suppliers_bp.route('/payment-vouchers', methods=['GET'])
def get_payment_vouchers():
    vouchers = PaymentVoucher.query.order_by(PaymentVoucher.voucher_date.desc()).all()
    return jsonify([voucher.to_dict() for voucher in vouchers])

@customers_suppliers_bp.route('/payment-vouchers', methods=['POST'])
def create_payment_voucher():
    data = request.get_json()
    
    voucher = PaymentVoucher(
        supplier_id=data.get('supplier_id'),
        voucher_date=datetime.fromisoformat(data['voucher_date']),
        amount=data['amount'],
        payment_method=data.get('payment_method', 'Cash'),
        reference_number=data.get('reference_number', ''),
        notes=data.get('notes', ''),
        user_id=data['user_id']
    )
    
    db.session.add(voucher)
    
    # Update supplier account if supplier is specified
    if data.get('supplier_id'):
        account = SupplierAccount.query.filter_by(supplier_id=data['supplier_id']).first()
        if not account:
            account = SupplierAccount(supplier_id=data['supplier_id'], balance=0)
            db.session.add(account)
        account.balance -= data['amount']  # Reduce supplier debt
    
    db.session.commit()
    return jsonify(voucher.to_dict()), 201

# Search endpoints
@customers_suppliers_bp.route('/search/customers', methods=['GET'])
def search_customers():
    search_term = request.args.get('q', '')
    customers = Customer.query.filter(
        Customer.name.contains(search_term) | 
        Customer.phone.contains(search_term)
    ).limit(10).all()
    return jsonify([customer.to_dict() for customer in customers])

@customers_suppliers_bp.route('/search/suppliers', methods=['GET'])
def search_suppliers():
    search_term = request.args.get('q', '')
    suppliers = Supplier.query.filter(
        Supplier.name.contains(search_term) | 
        Supplier.phone.contains(search_term)
    ).limit(10).all()
    return jsonify([supplier.to_dict() for supplier in suppliers])

# Account statements
@customers_suppliers_bp.route('/customers/<int:customer_id>/statement', methods=['GET'])
def get_customer_statement(customer_id):
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    customer = Customer.query.get_or_404(customer_id)
    account_data = get_customer_account(customer_id)
    
    # This would generate a formatted statement for printing
    return jsonify({
        'customer': customer.to_dict(),
        'statement_date': datetime.now().isoformat(),
        'period': {
            'start_date': start_date,
            'end_date': end_date
        },
        'transactions': account_data.json['transactions'],
        'balance': account_data.json['account']['balance']
    })

@customers_suppliers_bp.route('/suppliers/<int:supplier_id>/statement', methods=['GET'])
def get_supplier_statement(supplier_id):
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    supplier = Supplier.query.get_or_404(supplier_id)
    account_data = get_supplier_account(supplier_id)
    
    # This would generate a formatted statement for printing
    return jsonify({
        'supplier': supplier.to_dict(),
        'statement_date': datetime.now().isoformat(),
        'period': {
            'start_date': start_date,
            'end_date': end_date
        },
        'transactions': account_data.json['transactions'],
        'balance': account_data.json['account']['balance']
    })

