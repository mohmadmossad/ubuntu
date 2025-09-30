from src.models.base import db
from src.models.auth import User, Role, Permission, UserRole, RolePermission
from src.models.inventory import Warehouse, Category, Unit, Product, Inventory, InventoryMovement
from src.models.customers_suppliers import Supplier, Customer
from src.models.purchases import PurchaseInvoice, PurchaseInvoiceItem, PurchaseReturn
from src.models.sales import SaleInvoice, SaleInvoiceItem, SaleReturn
from src.models.expenses import Expense
from src.models.accounting import ChartOfAccount, JournalEntry, JournalEntryItem
from src.models.cashbox import CashBox, CashBoxMovement
from src.models.settings import Setting

# Export all models for easy import
__all__ = [
    'db', 'User', 'Role', 'Permission', 'UserRole', 'RolePermission',
    'Warehouse', 'Category', 'Unit', 'Product', 'Inventory', 'InventoryMovement',
    'Supplier', 'Customer', 'PurchaseInvoice', 'PurchaseInvoiceItem', 'PurchaseReturn',
    'SaleInvoice', 'SaleInvoiceItem', 'SaleReturn', 'Expense',
    'ChartOfAccount', 'JournalEntry', 'JournalEntryItem',
    'CashBox', 'CashBoxMovement', 'Setting'
]
