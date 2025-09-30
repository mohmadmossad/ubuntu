import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users, 
  Shield, 
  Wallet, 
  Settings, 
  Key,
  UserCheck,
  UserX,
  Crown,
  Eye,
  EyeOff,
  Download,
  Upload,
  Database,
  Building,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  ArrowUpDown
} from 'lucide-react'

const UsersManagement = () => {
  const [activeTab, setActiveTab] = useState('users')
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState([])
  const [cashboxes, setCashboxes] = useState([])
  const [roles, setRoles] = useState([])
  const [systemSettings, setSystemSettings] = useState({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [dialogType, setDialogType] = useState('user')

  // Sample data
  useEffect(() => {
    setUsers([
      {
        id: 1,
        username: 'admin',
        full_name: 'مدير النظام',
        email: 'admin@company.com',
        role: 'admin',
        is_active: true,
        created_at: '2024-01-01',
        last_login: '2024-09-26T10:30:00',
        permissions: {
          inventory_management: true,
          sales_management: true,
          purchases_management: true,
          customers_suppliers: true,
          accounting_reports: true,
          users_management: true,
          cashbox_management: true,
          system_settings: true,
          backup_restore: true
        }
      },
      {
        id: 2,
        username: 'cashier1',
        full_name: 'أحمد محمد',
        email: 'ahmed@company.com',
        role: 'cashier',
        is_active: true,
        created_at: '2024-02-15',
        last_login: '2024-09-26T09:15:00',
        permissions: {
          inventory_management: false,
          sales_management: true,
          purchases_management: false,
          customers_suppliers: true,
          accounting_reports: false,
          users_management: false,
          cashbox_management: true,
          system_settings: false,
          backup_restore: false
        }
      },
      {
        id: 3,
        username: 'employee1',
        full_name: 'فاطمة علي',
        email: 'fatima@company.com',
        role: 'employee',
        is_active: true,
        created_at: '2024-03-10',
        last_login: '2024-09-25T16:45:00',
        permissions: {
          inventory_management: true,
          sales_management: true,
          purchases_management: true,
          customers_suppliers: false,
          accounting_reports: false,
          users_management: false,
          cashbox_management: false,
          system_settings: false,
          backup_restore: false
        }
      }
    ])

    setCashboxes([
      {
        id: 1,
        name: 'الصندوق الرئيسي',
        user_id: 1,
        user: { full_name: 'مدير النظام' },
        current_balance: 25000,
        initial_balance: 20000,
        is_main: true,
        is_active: true,
        transactions_count: 45,
        created_at: '2024-01-01'
      },
      {
        id: 2,
        name: 'صندوق أحمد محمد',
        user_id: 2,
        user: { full_name: 'أحمد محمد' },
        current_balance: 3500,
        initial_balance: 2000,
        is_main: false,
        is_active: true,
        transactions_count: 23,
        created_at: '2024-02-15'
      },
      {
        id: 3,
        name: 'صندوق المبيعات',
        user_id: null,
        user: null,
        current_balance: 8200,
        initial_balance: 5000,
        is_main: false,
        is_active: true,
        transactions_count: 67,
        created_at: '2024-01-15'
      }
    ])

    setRoles([
      {
        id: 'admin',
        name: 'مدير النظام',
        description: 'صلاحيات كاملة لجميع وحدات النظام',
        permissions: {
          inventory_management: true,
          sales_management: true,
          purchases_management: true,
          customers_suppliers: true,
          accounting_reports: true,
          users_management: true,
          cashbox_management: true,
          system_settings: true,
          backup_restore: true
        }
      },
      {
        id: 'manager',
        name: 'مدير',
        description: 'صلاحيات إدارية محدودة',
        permissions: {
          inventory_management: true,
          sales_management: true,
          purchases_management: true,
          customers_suppliers: true,
          accounting_reports: true,
          users_management: false,
          cashbox_management: true,
          system_settings: false,
          backup_restore: false
        }
      },
      {
        id: 'cashier',
        name: 'أمين صندوق',
        description: 'صلاحيات المبيعات والصندوق',
        permissions: {
          inventory_management: false,
          sales_management: true,
          purchases_management: false,
          customers_suppliers: true,
          accounting_reports: false,
          users_management: false,
          cashbox_management: true,
          system_settings: false,
          backup_restore: false
        }
      },
      {
        id: 'employee',
        name: 'موظف',
        description: 'صلاحيات محدودة للعمليات الأساسية',
        permissions: {
          inventory_management: true,
          sales_management: true,
          purchases_management: true,
          customers_suppliers: false,
          accounting_reports: false,
          users_management: false,
          cashbox_management: false,
          system_settings: false,
          backup_restore: false
        }
      }
    ])

    setSystemSettings({
      company_name: 'شركة التقنية المتقدمة',
      company_address: 'الرياض - حي العليا - شارع الملك فهد',
      company_phone: '0112345678',
      company_email: 'info@company.com',
      tax_number: '123456789012345',
      currency: 'ر.س',
      fiscal_year_start: '01-01',
      backup_frequency: 'daily',
      auto_backup: true
    })
  }, [])

  const filteredUsers = users.filter(user =>
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4 text-yellow-600" />
      case 'manager': return <Shield className="w-4 h-4 text-blue-600" />
      case 'cashier': return <Wallet className="w-4 h-4 text-green-600" />
      default: return <Users className="w-4 h-4 text-gray-600" />
    }
  }

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-yellow-100 text-yellow-800'
      case 'manager': return 'bg-blue-100 text-blue-800'
      case 'cashier': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const UsersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="البحث في المستخدمين..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 w-80"
            />
          </div>
        </div>
        <Button onClick={() => {
          setEditingItem(null)
          setDialogType('user')
          setIsDialogOpen(true)
        }}>
          <Plus className="w-4 h-4 ml-2" />
          إضافة مستخدم جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    {getRoleIcon(user.role)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <h3 className="font-semibold text-lg">{user.full_name}</h3>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {roles.find(r => r.id === user.role)?.name || user.role}
                      </Badge>
                      {user.is_active ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <UserCheck className="w-3 h-3 ml-1" />
                          نشط
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-red-100 text-red-800">
                          <UserX className="w-3 h-3 ml-1" />
                          غير نشط
                        </Badge>
                      )}
                    </div>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="font-medium">اسم المستخدم:</span>
                        <span>{user.username}</span>
                      </div>
                      {user.email && (
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Mail className="w-4 h-4" />
                          <span>{user.email}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Calendar className="w-4 h-4" />
                        <span>تاريخ الإنشاء: {new Date(user.created_at).toLocaleDateString('ar-SA')}</span>
                      </div>
                      {user.last_login && (
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span>آخر دخول: {new Date(user.last_login).toLocaleString('ar-SA')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingItem(user)
                      setDialogType('permissions')
                      setIsDialogOpen(true)
                    }}
                  >
                    <Key className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingItem(user)
                      setDialogType('user')
                      setIsDialogOpen(true)
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const CashboxesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">إدارة الصناديق</h3>
        <Button onClick={() => {
          setEditingItem(null)
          setDialogType('cashbox')
          setIsDialogOpen(true)
        }}>
          <Plus className="w-4 h-4 ml-2" />
          إضافة صندوق جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cashboxes.map((cashbox) => (
          <Card key={cashbox.id} className={`hover:shadow-lg transition-shadow ${
            cashbox.is_main ? 'border-yellow-300 bg-yellow-50' : ''
          }`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center space-x-2 space-x-reverse">
                    <Wallet className="w-5 h-5" />
                    <span>{cashbox.name}</span>
                    {cashbox.is_main && (
                      <Crown className="w-4 h-4 text-yellow-600" />
                    )}
                  </CardTitle>
                  {cashbox.user && (
                    <CardDescription>
                      المسؤول: {cashbox.user.full_name}
                    </CardDescription>
                  )}
                </div>
                <div className="flex space-x-1 space-x-reverse">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">الرصيد الحالي</span>
                  <p className="font-bold text-xl text-green-600">
                    {cashbox.current_balance.toLocaleString()} ر.س
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">الرصيد الافتتاحي</span>
                  <p className="font-semibold">
                    {cashbox.initial_balance.toLocaleString()} ر.س
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">عدد المعاملات</span>
                  <p className="font-semibold">{cashbox.transactions_count}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">تاريخ الإنشاء</span>
                  <p className="font-semibold text-sm">
                    {new Date(cashbox.created_at).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2 space-x-reverse pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 ml-1" />
                  عرض المعاملات
                </Button>
                {!cashbox.is_main && (
                  <Button variant="outline" size="sm" className="flex-1">
                    <TrendingUp className="w-4 h-4 ml-1" />
                    تصفية للرئيسي
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const SettingsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <Building className="w-5 h-5" />
              <span>إعدادات الشركة</span>
            </CardTitle>
            <CardDescription>معلومات الشركة الأساسية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="company_name">اسم الشركة</Label>
              <Input
                id="company_name"
                value={systemSettings.company_name}
                onChange={(e) => setSystemSettings({
                  ...systemSettings,
                  company_name: e.target.value
                })}
              />
            </div>
            <div>
              <Label htmlFor="company_address">عنوان الشركة</Label>
              <Input
                id="company_address"
                value={systemSettings.company_address}
                onChange={(e) => setSystemSettings({
                  ...systemSettings,
                  company_address: e.target.value
                })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company_phone">رقم الهاتف</Label>
                <Input
                  id="company_phone"
                  value={systemSettings.company_phone}
                  onChange={(e) => setSystemSettings({
                    ...systemSettings,
                    company_phone: e.target.value
                  })}
                />
              </div>
              <div>
                <Label htmlFor="company_email">البريد الإلكتروني</Label>
                <Input
                  id="company_email"
                  value={systemSettings.company_email}
                  onChange={(e) => setSystemSettings({
                    ...systemSettings,
                    company_email: e.target.value
                  })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="tax_number">الرقم الضريبي</Label>
              <Input
                id="tax_number"
                value={systemSettings.tax_number}
                onChange={(e) => setSystemSettings({
                  ...systemSettings,
                  tax_number: e.target.value
                })}
              />
            </div>
            <Button className="w-full">
              حفظ إعدادات الشركة
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <Settings className="w-5 h-5" />
              <span>إعدادات النظام</span>
            </CardTitle>
            <CardDescription>إعدادات النظام العامة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currency">العملة</Label>
                <Input
                  id="currency"
                  value={systemSettings.currency}
                  onChange={(e) => setSystemSettings({
                    ...systemSettings,
                    currency: e.target.value
                  })}
                />
              </div>
              <div>
                <Label htmlFor="fiscal_year_start">بداية السنة المالية</Label>
                <Input
                  id="fiscal_year_start"
                  value={systemSettings.fiscal_year_start}
                  onChange={(e) => setSystemSettings({
                    ...systemSettings,
                    fiscal_year_start: e.target.value
                  })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="backup_frequency">تكرار النسخ الاحتياطي</Label>
              <select
                id="backup_frequency"
                value={systemSettings.backup_frequency}
                onChange={(e) => setSystemSettings({
                  ...systemSettings,
                  backup_frequency: e.target.value
                })}
                className="w-full p-2 border rounded-md"
              >
                <option value="daily">يومي</option>
                <option value="weekly">أسبوعي</option>
                <option value="monthly">شهري</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="auto_backup"
                checked={systemSettings.auto_backup}
                onCheckedChange={(checked) => setSystemSettings({
                  ...systemSettings,
                  auto_backup: checked
                })}
              />
              <Label htmlFor="auto_backup">تفعيل النسخ الاحتياطي التلقائي</Label>
            </div>
            <Button className="w-full">
              حفظ إعدادات النظام
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Backup and Restore */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 space-x-reverse">
            <Database className="w-5 h-5" />
            <span>النسخ الاحتياطي والاستعادة</span>
          </CardTitle>
          <CardDescription>إدارة النسخ الاحتياطية لقاعدة البيانات</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="flex items-center justify-center space-x-2 space-x-reverse">
              <Download className="w-4 h-4" />
              <span>إنشاء نسخة احتياطية</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2 space-x-reverse">
              <Upload className="w-4 h-4" />
              <span>استعادة من نسخة</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2 space-x-reverse">
              <Eye className="w-4 h-4" />
              <span>عرض النسخ المحفوظة</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">إدارة المستخدمين والصلاحيات</h2>
        <div className="flex items-center space-x-4 space-x-reverse">
          <Badge variant="outline" className="flex items-center space-x-1 space-x-reverse">
            <Users className="w-4 h-4" />
            <span>{users.length} مستخدم</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1 space-x-reverse">
            <Wallet className="w-4 h-4" />
            <span>{cashboxes.length} صندوق</span>
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">المستخدمين</TabsTrigger>
          <TabsTrigger value="cashboxes">الصناديق</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UsersTab />
        </TabsContent>

        <TabsContent value="cashboxes">
          <CashboxesTab />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>

      {/* User/Permissions Dialog */}
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {dialogType === 'user' 
                  ? (editingItem ? 'تعديل المستخدم' : 'إضافة مستخدم جديد')
                  : 'إدارة الصلاحيات'
                }
              </DialogTitle>
              <DialogDescription>
                {dialogType === 'user' 
                  ? 'أدخل بيانات المستخدم'
                  : `إدارة صلاحيات المستخدم: ${editingItem?.full_name}`
                }
              </DialogDescription>
            </DialogHeader>
            {dialogType === 'user' ? (
              <UserForm user={editingItem} onSave={() => setIsDialogOpen(false)} />
            ) : (
              <PermissionsForm user={editingItem} roles={roles} onSave={() => setIsDialogOpen(false)} />
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

const UserForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    full_name: user?.full_name || '',
    email: user?.email || '',
    role: user?.role || 'employee',
    password: '',
    confirm_password: '',
    is_active: user?.is_active ?? true,
    create_cashbox: false,
    initial_balance: 0
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Saving user:', formData)
    onSave()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="username">اسم المستخدم *</Label>
          <Input
            id="username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="full_name">الاسم الكامل *</Label>
          <Input
            id="full_name"
            value={formData.full_name}
            onChange={(e) => setFormData({...formData, full_name: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="role">الدور</Label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="w-full p-2 border rounded-md"
          >
            <option value="admin">مدير النظام</option>
            <option value="manager">مدير</option>
            <option value="cashier">أمين صندوق</option>
            <option value="employee">موظف</option>
          </select>
        </div>
      </div>

      {!user && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="password">كلمة المرور *</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required={!user}
            />
          </div>
          <div>
            <Label htmlFor="confirm_password">تأكيد كلمة المرور *</Label>
            <Input
              id="confirm_password"
              type="password"
              value={formData.confirm_password}
              onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
              required={!user}
            />
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2 space-x-reverse">
        <Checkbox
          id="is_active"
          checked={formData.is_active}
          onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
        />
        <Label htmlFor="is_active">المستخدم نشط</Label>
      </div>

      <div className="flex items-center space-x-2 space-x-reverse">
        <Checkbox
          id="create_cashbox"
          checked={formData.create_cashbox}
          onCheckedChange={(checked) => setFormData({...formData, create_cashbox: checked})}
        />
        <Label htmlFor="create_cashbox">إنشاء صندوق للمستخدم</Label>
      </div>

      {formData.create_cashbox && (
        <div>
          <Label htmlFor="initial_balance">الرصيد الافتتاحي للصندوق</Label>
          <Input
            id="initial_balance"
            type="number"
            step="0.01"
            value={formData.initial_balance}
            onChange={(e) => setFormData({...formData, initial_balance: parseFloat(e.target.value) || 0})}
          />
        </div>
      )}

      <div className="flex justify-end space-x-2 space-x-reverse pt-4">
        <Button type="button" variant="outline">
          إلغاء
        </Button>
        <Button type="submit">
          {user ? 'تحديث' : 'حفظ'} المستخدم
        </Button>
      </div>
    </form>
  )
}

const PermissionsForm = ({ user, roles, onSave }) => {
  const [permissions, setPermissions] = useState(user?.permissions || {})
  const [selectedRole, setSelectedRole] = useState(user?.role || 'employee')

  const permissionLabels = {
    inventory_management: 'إدارة المخازن والأصناف',
    sales_management: 'إدارة المبيعات',
    purchases_management: 'إدارة المشتريات',
    customers_suppliers: 'إدارة العملاء والموردين',
    accounting_reports: 'التقارير المحاسبية',
    users_management: 'إدارة المستخدمين',
    cashbox_management: 'إدارة الصناديق',
    system_settings: 'إعدادات النظام',
    backup_restore: 'النسخ الاحتياطي والاستعادة'
  }

  const handleRoleChange = (roleId) => {
    setSelectedRole(roleId)
    const role = roles.find(r => r.id === roleId)
    if (role) {
      setPermissions(role.permissions)
    }
  }

  const handlePermissionChange = (permission, checked) => {
    setPermissions({
      ...permissions,
      [permission]: checked
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Saving permissions:', { role: selectedRole, permissions })
    onSave()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="role">الدور الأساسي</Label>
        <select
          id="role"
          value={selectedRole}
          onChange={(e) => handleRoleChange(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name} - {role.description}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h4 className="font-semibold mb-4">الصلاحيات التفصيلية</h4>
        <div className="grid grid-cols-1 gap-3">
          {Object.entries(permissionLabels).map(([permission, label]) => (
            <div key={permission} className="flex items-center space-x-2 space-x-reverse p-3 border rounded-lg">
              <Checkbox
                id={permission}
                checked={permissions[permission] || false}
                onCheckedChange={(checked) => handlePermissionChange(permission, checked)}
              />
              <Label htmlFor={permission} className="flex-1 cursor-pointer">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2 space-x-reverse pt-4">
        <Button type="button" variant="outline">
          إلغاء
        </Button>
        <Button type="submit">
          حفظ الصلاحيات
        </Button>
      </div>
    </form>
  )
}

export default UsersManagement

